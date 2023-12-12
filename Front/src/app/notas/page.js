import React from 'react';
import NotaTable from '../../components/Nota/NotaTable';
import './page.css';
import prisma from '../../lib/prisma'; 
import Link from 'next/link';

export default async function notasPage() {
  const dadosBrutos = await prisma.notas_fiscais.findMany({
    select: {
      id: true,
      numero: true,
      cliente: true, 
      valornota: true,
      dataemissao: true
    }
  });

  const dadosnotas = dadosBrutos.map(nota => ({
    ...nota,
    dataemissao: new Date(nota.dataemissao).toLocaleDateString(),
    cliente: nota.cliente.nome.toUpperCase(),
    valornota: nota.valornota.toString(),
    numero: nota.numero.toString(),
    id: nota.id.toString()
  }));

  return (
    <div>
      <div className="Back">
        <Link href="/">
          <p>voltar</p>
        </Link>
      </div>
      <div className="notas">
      <div className="nota-titulo">
        <h1>NOTAS</h1>
      </div>
      <div className="notas-container">
        <NotaTable notas={dadosnotas} />
      </div>
    </div>
    </div>
  );
}
