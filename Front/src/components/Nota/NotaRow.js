import React from 'react';
import Link from 'next/link';
import './NotaRow.css';

const NotaRow = ({ Nota }) => {
  const { id, numero, cliente, valornota, dataemissao } = Nota;
  return (
    <tr className="nota-row">
      <td>
        <Link href={`/notas/${id}`}>
          <div className="nota-row-link">{id}</div>
        </Link>
      </td>
      <td>{numero}</td>
      <td>{cliente}</td>
      <td>{valornota}R$</td>
      <td>{dataemissao}</td>
    </tr>
  );
};

export default NotaRow;
