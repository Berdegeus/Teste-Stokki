import prisma from '../../../lib/prisma';
import './page.css';
import Link from 'next/link';

export default async function NotaFiscalDetalhes({ params }) {
    const notaFiscal = await prisma.notas_fiscais.findUnique({
        where: {
            id: Number(params.id),
        },
    });

    if (!notaFiscal) {
        return <div className="nota-not-found">Nota Fiscal não encontrada</div>;
    };

    console.log(notaFiscal);

    return (
    <div className="nota-detalhes">
        <div className="Back">
          <Link href="/notas">
              <p>voltar</p>
            </Link>
          </div>
        <h1>Detalhes da Nota Fiscal: {notaFiscal.id}</h1>

        <div className="nota-section">
          <p><strong>ID da Nota Fiscal:</strong> {notaFiscal.id_nota_fiscal}</p>
          <p><strong>Série:</strong> {notaFiscal.serie}</p>
          <p><strong>Número:</strong> {notaFiscal.numero}</p>
          <p><strong>Loja:</strong> {notaFiscal.loja}</p>
          <p><strong>Número do Pedido da Loja:</strong> {notaFiscal.numeropedidoloja}</p>
          <p><strong>Tipo:</strong> {notaFiscal.tipo}</p>
          <p><strong>Situação:</strong> {notaFiscal.situacao}</p>
          <p><strong>Contato:</strong> {notaFiscal.contato}</p>
          <p><strong>CNPJ:</strong> {notaFiscal.cnpj}</p>
          <p><strong>Vendedor:</strong> {notaFiscal.vendedor}</p>
          <p><strong>Data de Saída/Entrada:</strong> {new Date(notaFiscal.datasaidaentrada).toLocaleDateString()}</p>
          <p><strong>Data de Emissão:</strong> {new Date(notaFiscal.dataemissao).toLocaleDateString()}</p>
          <p><strong>Valor da Nota:</strong> R$ {notaFiscal.valornota.toFixed(2)}</p>
          <p><strong>Chave de Acesso:</strong> {notaFiscal.chaveacesso}</p>
          <p><strong>Link XML:</strong> <a href={notaFiscal.xml} target="_blank">Acessar XML</a></p>
          <p><strong>Link DANFE:</strong> <a href={notaFiscal.linkdanfe} target="_blank">Acessar DANFE</a></p>
          <p><strong>Link PDF:</strong> <a href={notaFiscal.linkpdf} target="_blank">Acessar PDF</a></p>
        </div>

        {notaFiscal.cliente && (
          <div className="nota-section">
            <h3>Informações do Cliente</h3>
          <p><strong>ID do Cliente:</strong> {notaFiscal.cliente.idContato}</p>
          <p><strong>Nome do Cliente:</strong> {notaFiscal.cliente.nome}</p>
          <p><strong>Email do Cliente:</strong> {notaFiscal.cliente.email}</p>
          <p><strong>Endereço do Cliente:</strong> {notaFiscal.cliente.endereco}, {notaFiscal.cliente.numero} - {notaFiscal.cliente.bairro}, {notaFiscal.cliente.cidade} - {notaFiscal.cliente.uf}</p>
          <p><strong>Telefone do Cliente:</strong> {notaFiscal.cliente.fone}</p>
        </div>
        )}

        {notaFiscal.transporte && (
          <div className="nota-section">
            <h3>Informações de Transporte</h3>
          <p><strong>Transportadora:</strong> {notaFiscal.transporte.transportadora}</p>
          <p><strong>CNPJ da Transportadora:</strong> {notaFiscal.transporte.cnpj}</p>
          <p><strong>Tipo de Frete:</strong> {notaFiscal.transporte.tipo_frete}</p>
          {notaFiscal.transporte.enderecoEntrega && (
            <p><strong>Endereço de Entrega:</strong> 
              {notaFiscal.transporte.enderecoEntrega.endereco}, 
              {notaFiscal.transporte.enderecoEntrega.numero} - 
              {notaFiscal.transporte.enderecoEntrega.bairro}, 
              {notaFiscal.transporte.enderecoEntrega.cidade} - 
              {notaFiscal.transporte.enderecoEntrega.uf}
            </p>
          )}
        </div>
        )}
    </div>
    );
}
