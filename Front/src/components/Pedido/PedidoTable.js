import React from 'react';
import PedidoRow from './PedidoRow';
import './PedidoTable.css';

const PedidosTable = ({ pedidos }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Cliente</th>
          <th>Data</th>
          <th>Total</th>
          <th>Situação</th>
        </tr>
      </thead>
      <tbody>
        {pedidos.map(pedido => (
          <PedidoRow key={pedido.numero} pedido={pedido} />
        ))}
      </tbody>
    </table>
  );
};

export default PedidosTable;
