import React from 'react';
import prisma from '../../../lib/prisma';
import './page.css';
import Link from 'next/link';

const formatDecimal = (value) => {
  return value ? value.toFixed(2).toString() : 'N/A';
};


export default async function ProdutoDetalhes({ params }) {
    const produto = await prisma.produtos.findUnique({
        where: {
            id: Number(params.id),
        },
    });

    if (!produto) {
        return <div className="produto-not-found">Produto não encontrado</div>;
    };


    return (
        <div className="produto-detalhes">
            <div className="Back">
                <Link href="/produtos">
                    <p>Voltar</p>
                </Link>
            </div>
            <h1>Detalhes do Produto: {params.id}</h1>

            {/* Informações Gerais do Produto */}
            <div className="produto-section">
                <p><strong>Código:</strong> {produto.codigo}</p>
                <p><strong>Descrição:</strong> {produto.descricao}</p>
                <p><strong>Tipo:</strong> {produto.tipo}</p>
                <p><strong>Situação:</strong> {produto.situacao}</p>
                <p><strong>Unidade:</strong> {produto.unidade}</p>
                <p><strong>Preço:</strong> R$ {formatDecimal(produto.preco)}</p>
                <p><strong>Preço de Custo:</strong> R$ {formatDecimal(produto.preco_custo)}</p>
            </div>

            {/* Descrições e Datas */}
            <div className="produto-section">
                <p><strong>Descrição Curta:</strong> {produto.descricao_curta}</p>
                <p><strong>Descrição Complementar:</strong> {produto.descricao_complementar}</p>
                <p><strong>Data de Inclusão:</strong> {produto.data_inclusao?.toLocaleDateString()}</p>
                <p><strong>Data de Alteração:</strong> {produto.data_alteracao?.toLocaleDateString()}</p>
            </div>

            {/* Informações Adicionais */}
            <div className="produto-section">
                <p><strong>Marca:</strong> {produto.marca}</p>
                <p><strong>Classificação Fiscal:</strong> {produto.class_fiscal}</p>
                <p><strong>CEST:</strong> {produto.cest}</p>
                <p><strong>Origem:</strong> {produto.origem}</p>
                <p><strong>ID do Grupo de Produto:</strong> {produto.id_grupo_produto}</p>
            </div>

            {/* Detalhes Físicos e Logísticos */}
            <div className="produto-section">
            <p><strong>Peso Líquido:</strong> {formatDecimal(produto.peso_liq)}</p>
                <p><strong>Peso Bruto:</strong> {formatDecimal(produto.peso_bruto)}</p>
                <p><strong>Estoque Mínimo:</strong> {formatDecimal(produto.estoque_minimo)}</p>
                <p><strong>Estoque Máximo:</strong> {formatDecimal(produto.estoque_maximo)}</p>
                <p><strong>GTIN:</strong> {produto.gtin}</p>
                <p><strong>GTIN da Embalagem:</strong> {produto.gtin_embalagem}</p>
                <p><strong>Dimensões (LxAxP):</strong> {formatDecimal(produto.largura_produto)} x {formatDecimal(produto.altura_produto)} x {formatDecimal(produto.profundidade_produto)}</p>
                <p><strong>Unidade de Medida:</strong> {produto.unidade_medida}</p>
                <p><strong>Itens por Caixa:</strong> {produto.itens_por_caixa}</p>
                <p><strong>Volumes:</strong> {produto.volumes}</p>
                <p><strong>Localização:</strong> {produto.localizacao}</p>
                <p><strong>Crossdocking:</strong> {produto.crossdocking}</p>
            </div>

            {/* Informações de Venda e Categoria */}
            <div className="produto-section">
                <p><strong>Condição:</strong> {produto.condicao}</p>
                <p><strong>Frete Grátis:</strong> {produto.frete_gratis}</p>
                <p><strong>Produção:</strong> {produto.producao}</p>
                <p><strong>Data de Validade:</strong> {produto.data_validade?.toLocaleDateString()}</p>
                <p><strong>Tipo de Item no SPED:</strong> {produto.sped_tipo_item}</p>
                <p><strong>ID da Categoria:</strong> {produto.categoria_id}</p>
                <p><strong>Descrição da Categoria:</strong> {produto.categoria_descricao}</p>
            </div>

            {/* Informações de Imagem */}
            <div className="produto-section">
                <p><strong>Link da Imagem:</strong> {produto.imagem_link}</p>
                <p><strong>Validade da Imagem:</strong> {produto.imagem_validade?.toLocaleDateString()}</p>
                <p><strong>Tipo de Armazenamento da Imagem:</strong> {produto.imagem_tipo_armazenamento}</p>
            </div>
        </div>
    );
}
