import os
import requests
import psycopg2
from psycopg2 import sql
from dotenv import load_dotenv

load_dotenv()

#Função para extrair produtos da API do Bling.
def get_products(apikey):
    base_url = f'https://bling.com.br/Api/v2/produtos/json/'
    params = {'apikey': apikey}

    response = requests.get(base_url, params=params)

    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f'Erro ao buscar produtos: {response.status_code}')

def trata_dados(produto):
    # Trata strings vazias e datas '0000-00-00' como None
    for chave, valor in produto.items():
        if isinstance(valor, str) and not valor:
            produto[chave] = None
        elif chave in ['dataInclusao', 'dataAlteracao', 'dataValidade'] and valor == '0000-00-00':
            produto[chave] = None

    # Converte strings numéricas em números ou None
    campos_numericos = ['preco', 'precoCusto', 'pesoLiq', 'pesoBruto', 'estoqueMinimo', 'estoqueMaximo', 'itensPorCaixa', 'volumes']
    for campo in campos_numericos:
        try:
            produto[campo] = float(produto[campo]) if produto[campo] is not None else None
        except ValueError:
            produto[campo] = None

    return produto

def insert_product_data(product_data, db_connection_params):
    try:
        with psycopg2.connect(**db_connection_params) as conn:
            with conn.cursor() as cursor:
                insert_query = sql.SQL("""
                    INSERT INTO produtos (
                        id, codigo, descricao, tipo, situacao, unidade, preco, preco_custo, 
                        descricao_curta, descricao_complementar, data_inclusao, data_alteracao, 
                        marca, class_fiscal, cest, origem, id_grupo_produto, observacoes, garantia, 
                        peso_liq, peso_bruto, estoque_minimo, estoque_maximo, gtin, gtin_embalagem, 
                        largura_produto, altura_produto, profundidade_produto, unidade_medida, 
                        itens_por_caixa, volumes, localizacao, crossdocking, condicao, frete_gratis, 
                        producao, data_validade, sped_tipo_item, categoria_id, categoria_descricao, 
                        imagem_link, imagem_validade, imagem_tipo_armazenamento
                    ) VALUES (
                        %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, 
                        %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, 
                        %s, %s, %s, %s, %s, %s, %s, %s, %s
                    )
                """)

                for produto in product_data["retorno"]["produtos"]:
                    p = trata_dados(produto["produto"])
                    data = (
                        p["id"], p["codigo"], p["descricao"], p["tipo"], p["situacao"], p["unidade"], 
                        p["preco"], p["precoCusto"], p["descricaoCurta"], p["descricaoComplementar"], 
                        p["dataInclusao"], p["dataAlteracao"], p["marca"], p["class_fiscal"], 
                        p["cest"], p["origem"], p["idGrupoProduto"], p["observacoes"], p["garantia"], 
                        p["pesoLiq"], p["pesoBruto"], p["estoqueMinimo"], p["estoqueMaximo"], p["gtin"], 
                        p["gtinEmbalagem"], p["larguraProduto"], p["alturaProduto"], p["profundidadeProduto"], 
                        p["unidadeMedida"], p["itensPorCaixa"], p["volumes"], p["localizacao"], 
                        p["crossdocking"], p["condicao"], p["freteGratis"], p["producao"], 
                        p["dataValidade"], p["spedTipoItem"], p["categoria"]["id"], p["categoria"]["descricao"], 
                        p.get("imagem", {}).get("link"), p.get("imagem", {}).get("validade"), 
                        p.get("imagem", {}).get("tipoArmazenamento")
                    )
                    cursor.execute(insert_query, data)
    except Exception as e:
        print(f"Erro ao inserir dados: {e}")

# Coxeção com o banco de dados
db_connection_params = {
    "host": os.getenv("DB_HOST"),
    "database": os.getenv("DB_NAME"),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD")
}

api_key = os.getenv("API_KEY")

try:
    product_data = get_products(api_key)
    insert_product_data(product_data, db_connection_params)
    print("Dados inseridos com sucesso.")
except Exception as e:
    print(e)
