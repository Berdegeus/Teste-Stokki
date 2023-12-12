import React from 'react';
import Link from 'next/link';
import './PedidoRow.css';

const PedidoRow = ({ pedido }) => {
  const { id, cliente, data, totalvenda, situacao } = pedido;
  return (
    <tr className="pedido-row">
      <td>
        <Link href={`/pedidos/${id}`}>
          <div className="pedido-row-link">{id}</div>
        </Link>
      </td>
      <td>{cliente}</td>
      <td>{data}</td>
      <td>{totalvenda}R$</td>
      <td>{situacao}</td>
    </tr>
  );
};

export default PedidoRow;
