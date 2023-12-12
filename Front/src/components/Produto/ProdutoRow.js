import React from 'react';
import Link from 'next/link';
import './ProdutoRow.css';

const ProdutoRow = ({ Produto }) => {
  const { id, descricao, preco, marca, situacao } = Produto;
  return (
    <tr className="produto-row">
      <td>
        <Link href={`/produtos/${id}`}>
          <div className="produto-row-link">{id}</div>
        </Link>
      </td>
      <td>{descricao}</td>
      <td>{preco}R$</td>
      <td>{marca}</td>
      <td>{situacao}</td>
    </tr>
  );
};

export default ProdutoRow;
