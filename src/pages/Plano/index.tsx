import { useParams } from "react-router-dom";
import { planos } from "../../data/planos";

export default function Plano() {
  const { slug } = useParams();

  const plano = planos.find((p) => p.slug === slug);

  if (!plano) {
    return <h1>Plano não encontrado</h1>;
  }

  return (
    <div>
      <h1>{plano.titulo}</h1>
      <p>{plano.preco}</p>
      <p>{plano.descricao}</p>
    </div>
  );
}