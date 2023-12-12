import os
import requests
import psycopg2
from psycopg2 import sql
from dotenv import load_dotenv
import json

load_dotenv()

# Função para extrair notas fiscais da API do Bling.
def get_notas_fiscais(apikey):
    base_url = f'https://bling.com.br/Api/v2/notasfiscais/json/'
    params = {'apikey': apikey}

    response = requests.get(base_url, params=params)

    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f'Erro ao buscar notas fiscais: {response.status_code}')

#Função para tratar os dados da nota fiscal.
def trata_dados_nota_fiscal(nota_fiscal):
    # Tratamento de campos numéricos e conversão de campos JSON/JSONB
    try:
        nota_fiscal["valorNota"] = float(nota_fiscal["valorNota"]) if nota_fiscal["valorNota"] else None
    except ValueError:
        nota_fiscal["valorNota"] = None

    campos_json = ['cliente', 'transporte', 'codigosRastreamento', 'cfops']
    for campo in campos_json:
        nota_fiscal[campo] = json.dumps(nota_fiscal.get(campo, {}))

    return nota_fiscal

#Função para inserir dados de notas fiscais no banco de dados.
def insert_nota_fiscal_data(nota_fiscal_data, db_connection_params):
    try:
        with psycopg2.connect(**db_connection_params) as conn:
            with conn.cursor() as cursor:
                insert_query = sql.SQL("""
                    INSERT INTO notas_fiscais (
                        id_nota_fiscal, serie, numero, loja, numeroPedidoLoja, tipo, situacao, 
                        contato, cnpj, vendedor, dataSaidaEntrada, dataEmissao, valorNota, 
                        chaveAcesso, xml, linkDanfe, linkPDF, codigosRastreamento, cfops, 
                        unidadeNegocio, cliente, transporte
                    ) VALUES (
                        %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, 
                        %s, %s, %s, %s, %s, %s
                    )
                """)

                for nota in nota_fiscal_data["retorno"]["notasfiscais"]:
                    nf = trata_dados_nota_fiscal(nota["notafiscal"])
                    data = (
                        nf["id"], nf["serie"], nf["numero"], nf["loja"], nf["numeroPedidoLoja"], nf["tipo"], 
                        nf["situacao"], nf["contato"], nf["cnpj"], nf["vendedor"], nf["dataSaidaEntrada"], 
                        nf["dataEmissao"], nf["valorNota"], nf["chaveAcesso"], nf["xml"], nf["linkDanfe"], 
                        nf["linkPDF"], nf["codigosRastreamento"], nf["cfops"], nf["unidadeNegocio"], 
                        nf["cliente"], nf["transporte"]
                    )
                    cursor.execute(insert_query, data)
    except Exception as e:
        print(f"Erro ao inserir dados: {e}")

# Parâmetros de conexão com o banco de dados
db_connection_params = {
    "host": os.getenv("DB_HOST"),
    "database": os.getenv("DB_NAME"),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD")
}

api_key = os.getenv("API_KEY")

try:
    nota_fiscal_data = get_notas_fiscais(api_key)
    insert_nota_fiscal_data(nota_fiscal_data, db_connection_params)
    print("Dados das notas fiscais inseridos com sucesso.")
except Exception as e:
    print(e)
