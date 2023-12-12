import React from 'react';
import PedidoTable from '../../components/Pedido/PedidoTable';
import './page.css';
import prisma from '../../lib/prisma'; 
import Link from 'next/link';

export default async function PedidosPage() {
  const dadosBrutos = await prisma.pedidos.findMany({
    select: {
      id: true,
      cliente: true,
      data: true,
      totalvenda: true,
      situacao: true
    }
  });

  const dadosPedidos = dadosBrutos.map(pedido => ({
    ...pedido,
    cliente: pedido.cliente.nome.toUpperCase(),
    totalvenda: pedido.totalvenda.toString(),
    data: pedido.data ? new Date(pedido.data).toLocaleDateString('pt-BR') : ''
  }));

  return (
    <div>
      <div className="Back">
        <Link href="/">
          <p>voltar</p>
        </Link>
      </div>
      <div className="pedidos">
      <div className="pedido-titulo">
        <h1>PEDIDOS</h1>
      </div>
      <div className="pedidos-container">
        <PedidoTable pedidos={dadosPedidos} />
      </div>
    </div>
    </div>
  );
}
