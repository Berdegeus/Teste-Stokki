import os
import requests
import psycopg2
from psycopg2 import sql
from dotenv import load_dotenv
import json

load_dotenv()

#Função para extrair pedidos da API do Bling.
def get_pedidos(apikey):
    base_url = f'https://bling.com.br/Api/v2/pedidos/json/'
    params = {'apikey': apikey}

    response = requests.get(base_url, params=params)

    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f'Erro ao buscar pedidos: {response.status_code}')

#Função para tratar os dados do pedido.
def trata_dados_pedido(pedido):
    campos_numericos = ['desconto', 'valorfrete', 'outrasdespesas', 'totalprodutos', 'totalvenda']
    for campo in campos_numericos:
        try:
            pedido[campo] = float(pedido[campo].replace(',', '.')) if pedido[campo] else None
        except ValueError:
            pedido[campo] = None

    for campo in ['data', 'dataSaida']:
        if pedido.get(campo) == '0000-00-00':
            pedido[campo] = None

    # Trata campos JSON/JSONB
    campos_json = ['cliente', 'transporte', 'itens', 'parcelas']
    for campo in campos_json:
        pedido[campo] = json.dumps(pedido.get(campo, {}))

    return pedido

#Função para inserir dados de pedidos no banco de dados PostgreSQL.
def insert_pedido_data(pedido_data, db_connection_params):
    try:
        with psycopg2.connect(**db_connection_params) as conn:
            with conn.cursor() as cursor:
                insert_query = sql.SQL("""
                    INSERT INTO pedidos (
                        desconto, observacoes, observacaointerna, data, numero,
                        numeroPedidoLoja, vendedor, valorfrete, outrasdespesas, totalprodutos,
                        totalvenda, situacao, dataSaida, loja, tipoIntegracao, cliente,
                        transporte, itens, parcelas
                    ) VALUES (
                        %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
                    )
                """)

                for pedido in pedido_data["retorno"]["pedidos"]:
                    p = trata_dados_pedido(pedido["pedido"])
                    data = (
                        p["desconto"], p["observacoes"], p["observacaointerna"], p["data"], p["numero"],
                        p["numeroPedidoLoja"], p["vendedor"], p["valorfrete"], p["outrasdespesas"], p["totalprodutos"],
                        p["totalvenda"], p["situacao"], p["dataSaida"], p["loja"], p["tipoIntegracao"], p["cliente"],
                        p["transporte"], p["itens"], p["parcelas"]
                    )
                    cursor.execute(insert_query, data)
    except Exception as e:
        print(f"Erro ao inserir dados: {e}")

#Parâmetros de conexão com o banco de dados.
db_connection_params = {
    "host": os.getenv("DB_HOST"),
    "database": os.getenv("DB_NAME"),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD")
}

api_key = os.getenv("API_KEY")

try:
    pedido_data = get_pedidos(api_key)
    insert_pedido_data(pedido_data, db_connection_params)
    print("Dados dos pedidos inseridos com sucesso.")
except Exception as e:
    print(e)
