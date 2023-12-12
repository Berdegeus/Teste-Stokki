import Link from 'next/link';
import './Card.css';

export const Card = ({ title, href }) => {
  return (
    <Link href={href}>
      <div className="card">
        <div className="card-title">{title}</div>
      </div>
    </Link>
  );
};
