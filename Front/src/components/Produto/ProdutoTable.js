import React from 'react';
import ProdutoRow from './ProdutoRow';
import './ProdutoTable.css';

const ProdutosTable = ({ Produtos }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Descrição</th>
          <th>Preço</th>
          <th>Marca</th>
          <th>Situação</th>
        </tr>
      </thead>
      <tbody>
        {Produtos.map(Produto => (
          <ProdutoRow key={Produto.id} Produto={Produto} />
        ))}
      </tbody>
    </table>
  );
};

export default ProdutosTable;
