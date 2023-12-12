import React from 'react';
import NotaRow from './NotaRow';
import './NotaTable.css';

const NotasTable = ({ notas }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Número</th>
          <th>Nome do cliente</th>
          <th>Valor</th>
          <th>Data da emissão</th>
        </tr>
      </thead>
      <tbody>
        {notas.map(nota => (
          <NotaRow key={nota.id} Nota={nota} />
        ))}
      </tbody>
    </table>
  );
};

export default NotasTable;
