import React from 'react';
import ProdutoTable from '../../components/Produto/ProdutoTable';
import './page.css';
import prisma from '../../lib/prisma'; 
import Link from 'next/link';

export default async function ProdutosPage() {
  const dadosBrutos= await prisma.produtos.findMany({
    select: {
      id: true,
      descricao: true,
      preco: true,
      marca: true,
      situacao: true
    }
  });

  const dadosProdutos = dadosBrutos.map(Produto => ({
    ...Produto,
    id: Produto.id.toString(),
    preco: Produto.preco.toString(),
    marca: Produto.marca ? Produto.marca.toUpperCase() : '',
    
  }));

  return (
    <div>
      <div className="Back">
        <Link href="/">
          <p>voltar</p>
        </Link>
      </div>
      <div className="produtos">
      <div className="produto-titulo">
        <h1>PRODUTOS</h1>
      </div>
      <div className="produtos-container">
        <ProdutoTable Produtos={dadosProdutos} />
      </div>
    </div>
    </div>
  );
}
