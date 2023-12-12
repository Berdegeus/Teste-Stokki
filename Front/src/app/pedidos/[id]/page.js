import prisma from '../../../lib/prisma';
import './page.css';
import Link from 'next/link';

export default async function PedidoDetalhes({ params }) {
    const pedido = await prisma.pedidos.findUnique({
        where: {
            id: Number(params.id),
        },
    });


    if (!pedido) {
        return <div className="pedido-not-found">Pedido não encontrado</div>;
    };

    return (
    <div className="pedido-detalhes">
        <div className="Back">
          <Link href="/pedidos">
              <p>voltar</p>
            </Link>
          </div>
        <h1>Detalhes do Pedido: {pedido.id}</h1>         
      <div className="pedido-section">
              <p><strong>Data do Pedido:</strong> {new Date(pedido.data).toLocaleDateString()}</p>
              <p><strong>Número do Pedido:</strong> {pedido.numero}</p>
              <p><strong>Desconto:</strong> {pedido.desconto}</p>
              <p><strong>Observações:</strong> {pedido.observacoes}</p>
              <p><strong>Observação Interna:</strong> {pedido.observacaointerna}</p>
              <p><strong>Valor do Frete:</strong> R$ {pedido.valorfrete.toFixed(2)}</p>
              <p><strong>Outras Despesas:</strong> R$ {pedido.outrasdespesas.toFixed(2)}</p>
              <p><strong>Total de Produtos:</strong> R$ {pedido.totalprodutos.toFixed(2)}</p>
              <p><strong>Valor Total:</strong> R$ {pedido.totalvenda.toFixed(2)}</p>
              <p><strong>Situação:</strong> {pedido.situacao}</p>
              <p><strong>Data de Saída:</strong> {new Date(pedido.datasaida).toLocaleDateString()}</p>
              <p><strong>Número do Pedido da Loja:</strong> {pedido.numeropedidoloja}</p>
              <p><strong>Tipo de Integração:</strong> {pedido.tipointegracao}</p>
            </div>
      <div className="pedido-section">
          <h3>Informações do Cliente</h3>
          <p><strong>ID do Cliente:</strong> {pedido.cliente.id}</p>
          <p><strong>Nome do Cliente:</strong> {pedido.cliente.nome}</p>
          <p><strong>Email do Cliente:</strong> {pedido.cliente.email}</p>
          <p><strong>Endereço do Cliente:</strong> {pedido.cliente.endereco}, {pedido.cliente.numero} - {pedido.cliente.bairro}, {pedido.cliente.cidade} - {pedido.cliente.uf}</p>
          <p><strong>Telefone do Cliente:</strong> {pedido.cliente.fone}</p>
          <p><strong>Celular do Cliente:</strong> {pedido.cliente.celular}</p>
        </div>
      <div className="pedido-section">
          <h3>Informações de Transporte</h3>
          <p><strong>Peso Bruto:</strong> {pedido.transporte.peso_bruto}</p>
          <p><strong>Tipo de Frete:</strong> {pedido.transporte.tipo_frete}</p>
          <p><strong>Quantidade de Volumes:</strong> {pedido.transporte.qtde_volumes}</p>
          <p><strong>Endereço de Entrega:</strong> {pedido.transporte.enderecoEntrega.endereco}, {pedido.transporte.enderecoEntrega.numero} - {pedido.transporte.enderecoEntrega.bairro}, {pedido.transporte.enderecoEntrega.cidade} - {pedido.transporte.enderecoEntrega.uf}</p>
        </div>
      <div className="pedido-section">
          <h3>Itens do Pedido</h3>
          <div className="pedido-itens">
              {pedido.itens.map((item, index) => (
                  <div key={index} className="item">
                      <p><strong>Descrição:</strong> {item.item.descricao}</p>
                      <p><strong>Quantidade:</strong> {Number(item.item.quantidade).toFixed()}</p>
                      <p><strong>Valor Unitário:</strong> R$ {parseFloat(item.item.valorunidade).toFixed(2)}</p>
                  </div>
              ))}
          </div>
        </div>
      <div className="pedido-section">
          <h3>Parcelas</h3>
          <div className="pedido-parcelas">
              {pedido.parcelas.map((parcela, index) => (
                  <div key={index} className="parcela">
                      <p><strong>Valor da Parcela:</strong> R$ {parcela.parcela.valor}</p>
                      <p><strong>Data de Vencimento:</strong> {new Date(parcela.parcela.dataVencimento).toLocaleDateString()}</p>
                      <p><strong>Forma de Pagamento:</strong> {parcela.parcela.forma_pagamento.descricao}</p>
                      <p><strong>Observações:</strong> {parcela.parcela.obs}</p>
                  </div>
              ))}
          </div>
        </div>
      </div>
    );
}
