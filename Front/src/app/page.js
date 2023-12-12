import { Card } from '../components/Card';
import './page.css';

export default function Home() {
  return (
    <div className="card-group">
      <Card title="PEDIDOS" href="pedidos"/>
      <Card title="PRODUTOS" href="produtos" />
      <Card title="NOTAS" href="notas"/>
    </div>
  );
}