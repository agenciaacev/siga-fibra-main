import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CardPlano from "../../components/CardPlano";
import { planos } from "../../data/planos";

type Tab = "residencial" | "empresarial";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab") as Tab | null;
  const [tabAtiva, setTabAtiva] = useState<Tab>(tabParam === "empresarial" ? "empresarial" : "residencial");

  useEffect(() => {
    if (tabParam === "empresarial" || tabParam === "residencial") {
      setTabAtiva(tabParam);
    }
  }, [tabParam]);

  const mudarTab = (tab: Tab) => {
    setTabAtiva(tab);
    setSearchParams({ tab });
  };

  const planosFiltrados = planos.filter((p) => p.tipo === tabAtiva);

  return (
    <div>
      {/* Hero */}
      <section className="text-center px-5 pt-14 pb-8">
        <h1
          className="mb-3"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 36,
            fontWeight: 800,
            color: "#0d2137",
            letterSpacing: -1.5,
          }}
        >
          {tabAtiva === "residencial"
            ? "Planos para você e sua família"
            : "Planos para sua empresa"}
        </h1>
        <p className="text-base" style={{ color: "#6b8299" }}>
          {tabAtiva === "residencial"
            ? "Escolha o plano ideal e personalize com suas plataformas favoritas."
            : "Conectividade profissional para o seu negócio crescer."}
        </p>
      </section>

      {/* Tabs */}
      <div className="flex justify-center gap-2.5 px-5 mb-9">
        {(["residencial", "empresarial"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => mudarTab(tab)}
            className="px-7 py-2.5 rounded-full text-sm font-medium transition-all duration-200"
            style={{
              border: "1.5px solid",
              borderColor: tabAtiva === tab ? "#00c2c7" : "#e2eaf1",
              background: tabAtiva === tab ? "#00c2c7" : "#ffffff",
              color: tabAtiva === tab ? "#ffffff" : "#6b8299",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {tab === "residencial" ? "Para você e sua família" : "Para sua empresa"}
          </button>
        ))}
      </div>

      {/* Grid de planos */}
      <div
        className="grid gap-6 mx-auto px-8 pb-16"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          maxWidth: 1200,
        }}
      >
        {planosFiltrados.map((plano) => (
          <CardPlano key={plano.slug} plano={plano} />
        ))}
      </div>
    </div>
  );
}