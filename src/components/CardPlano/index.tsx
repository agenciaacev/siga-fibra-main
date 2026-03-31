import { Link } from "react-router-dom";


export default function CardPlano({ plano }) {
  return (
    <Link
      to={`/plano/${plano.slug}`}
      style={{
        display: "block",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div>
        <h2>{plano.titulo}</h2>
        <p>{plano.preco}</p>
        <p>{plano.descricao}</p>
      </div>
    </Link>
  );
}