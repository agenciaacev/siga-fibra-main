import CardPlano from "../../components/CardPlano";
import { planos } from "../../data/planos";

export default function Home() {
  return (
    <div>
      {planos.map((plano) => (
        <CardPlano key={plano.slug} plano={plano} />
      ))}
    </div>
  );
}