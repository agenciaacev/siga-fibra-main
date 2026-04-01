import { useParams, useNavigate, Link } from "react-router-dom";
import { planos, PLATAFORMAS, formatarPreco, calcularTotal } from "../../data/planos";
import { usePlanosContext } from "../../contexts/PlanosContext";

export default function Plano() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { getExtras, adicionarExtra, removerExtra } = usePlanosContext();
  const extras = slug ? getExtras(slug) : [];

  const plano = planos.find((p) => p.slug === slug);

  if (!plano) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <h1 className="text-2xl font-bold" style={{ color: "#0d2137" }}>
          Plano não encontrado
        </h1>
        <button
          onClick={() => navigate("/")}
          className="text-white px-6 py-3 rounded-full font-medium"
          style={{ background: "linear-gradient(90deg, #00c2c7 0%, #3ecf8e 100%)" }}
        >
          Ver todos os planos
        </button>
      </div>
    );
  }

  const todasPlataformas = [...plano.plataformasInclusas, ...extras];
  const total = calcularTotal(plano, extras);
  const { inteiro, centavos } = formatarPreco(total);

  const plataformasDisponiveis = Object.keys(PLATAFORMAS).filter(
    (p) => !todasPlataformas.includes(p)
  );

  const planosSimilares = planos
    .filter((p) => p.tipo === plano.tipo && p.slug !== plano.slug)
    .slice(0, 3);

  const whatsappMsg = encodeURIComponent(
    `Olá! Tenho interesse no plano Siga Fibra de ${plano.velocidade}${plano.unidade}` +
    (extras.length > 0 ? ` com as plataformas: ${extras.join(", ")}.` : ".")
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-8" style={{ color: "#6b8299" }}>
        <Link
          to="/"
          className="no-underline transition-colors"
          style={{ color: "#6b8299" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#00c2c7")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#6b8299")}
        >
          Planos
        </Link>
        <span>/</span>
        <span style={{ color: "#0d2137" }}>{plano.velocidade}{plano.unidade}</span>
      </div>

      {/* Hero */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div
          className="rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #00c2c7 0%, #3ecf8e 100%)", minHeight: 280 }}
        >
          <div className="absolute rounded-full" style={{ top: -40, right: -40, width: 160, height: 160, background: "rgba(255,255,255,0.12)" }} />
          <div className="absolute rounded-full" style={{ bottom: -30, left: 50, width: 100, height: 100, background: "rgba(255,255,255,0.08)" }} />
          <div className="relative z-10">
            <div className="text-white leading-none" style={{ fontSize: 80, fontWeight: 800, letterSpacing: -3 }}>
              {plano.velocidade}
              <span style={{ fontSize: 32, fontWeight: 600, letterSpacing: 0 }}>{plano.unidade}</span>
            </div>
            <div className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.8)" }}>de velocidade simétrica</div>
          </div>
          <div className="relative z-10 self-end" style={{ fontSize: 20, fontWeight: 700, color: "rgba(255,255,255,0.7)", letterSpacing: 1, textTransform: "uppercase" }}>
            siga fibra
          </div>
        </div>

        <div className="rounded-2xl p-8 flex flex-col justify-between" style={{ background: "#fff", border: "1.5px solid #e2eaf1" }}>
          <div>
            <div className="text-xs mb-1" style={{ color: "#6b8299" }}>
              {extras.length > 0 ? "Total com extras" : "Mensalidade"}
            </div>
            <div className="flex items-end gap-1 mb-4">
              <span className="text-lg font-semibold mb-1.5" style={{ color: "#0d2137" }}>R$</span>
              <span className="leading-none" style={{ fontSize: 56, fontWeight: 800, color: "#0d2137", letterSpacing: -2 }}>{inteiro}</span>
              <span className="text-2xl font-bold mb-2" style={{ color: "#0d2137" }}>,{centavos}</span>
              <span className="text-sm mb-2 ml-1" style={{ color: "#6b8299" }}>/mês</span>
            </div>
            <div className="rounded-lg px-3 py-2 text-xs mb-4" style={{ background: "#e0faf8", color: "#00c2c7", lineHeight: 1.7 }}>
              {plano.plataformasInclusas.map((p) => <div key={p}>✓ {p}: incluso no plano</div>)}
              {extras.map((p) => <div key={p}>+ {p}: R$ {PLATAFORMAS[p].preco.toFixed(2)}/mês</div>)}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href={`https://wa.me/5585999999999?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center text-white font-semibold rounded-full py-3.5 text-sm no-underline flex items-center justify-center gap-2 transition-all duration-200"
              style={{ background: "linear-gradient(90deg, #00c2c7 0%, #3ecf8e 100%)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.9"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.128.558 4.127 1.533 5.858L.053 23.37a.5.5 0 0 0 .614.612l5.604-1.47A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.9 9.9 0 0 1-5.031-1.371l-.36-.214-3.733.979.997-3.645-.234-.375A9.9 9.9 0 0 1 2.1 12C2.1 6.534 6.534 2.1 12 2.1S21.9 6.534 21.9 12 17.466 21.9 12 21.9z" />
              </svg>
              Assinar pelo WhatsApp
            </a>
            <button
              onClick={() => navigate(-1)}
              className="w-full rounded-full py-3 text-sm font-medium transition-all duration-200"
              style={{ background: "transparent", border: "1.5px solid #e2eaf1", color: "#6b8299", cursor: "pointer" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#00c2c7"; (e.currentTarget as HTMLElement).style.color = "#00c2c7"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#e2eaf1"; (e.currentTarget as HTMLElement).style.color = "#6b8299"; }}
            >
              ← Voltar
            </button>
          </div>
        </div>
      </div>

      {/* Plataformas inclusas */}
      {plano.plataformasInclusas.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-5" style={{ color: "#0d2137" }}>Plataformas inclusas no plano</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {plano.plataformasInclusas.map((p) => {
              const info = PLATAFORMAS[p];
              return (
                <div key={p} className="rounded-xl p-4 flex items-center gap-3" style={{ background: "#fff", border: "1.5px solid #e2eaf1" }}>
                  <img
                    src={info.icon}
                    alt={p}
                    className="w-8 h-8 rounded flex-shrink-0 object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div>
                    <div className="text-sm font-semibold" style={{ color: "#0d2137" }}>{info.label}</div>
                    <div className="text-xs" style={{ color: "#3ecf8e" }}>incluso</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Plataformas adicionadas */}
      {extras.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-5" style={{ color: "#0d2137" }}>Plataformas adicionadas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {extras.map((p) => {
              const info = PLATAFORMAS[p];
              return (
                <div
                  key={p}
                  className="rounded-xl p-4 flex items-center gap-3 transition-all duration-200"
                  style={{ background: "#fff", border: "1.5px solid #00c2c7", cursor: "pointer" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#fff0f0"; (e.currentTarget as HTMLElement).style.borderColor = "#ffb3b3"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#fff"; (e.currentTarget as HTMLElement).style.borderColor = "#00c2c7"; }}
                  onClick={() => slug && removerExtra(slug, p)}
                  title="Clique para remover"
                >
                  <img
                    src={info.icon}
                    alt={p}
                    className="w-8 h-8 rounded flex-shrink-0 object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="flex-1">
                    <div className="text-sm font-semibold" style={{ color: "#0d2137" }}>{info.label}</div>
                    <div className="text-xs" style={{ color: "#6b8299" }}>+ R$ {info.preco.toFixed(2)}/mês</div>
                  </div>
                  <span className="text-red-400 font-bold text-sm">✕</span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Adicionar plataformas */}
      {plataformasDisponiveis.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-2" style={{ color: "#0d2137" }}>Adicione outras plataformas</h2>
          <p className="text-sm mb-5" style={{ color: "#6b8299" }}>Clique para adicionar ao seu plano.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {plataformasDisponiveis.map((nome) => {
              const info = PLATAFORMAS[nome];
              return (
                <div
                  key={nome}
                  className="rounded-xl p-4 flex items-center gap-3 transition-all duration-200"
                  style={{ background: "#fff", border: "1.5px solid #e2eaf1", cursor: "pointer" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#00c2c7"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,194,199,0.12)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#e2eaf1"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                  onClick={() => slug && adicionarExtra(slug, nome)}
                >
                  <img
                    src={info.icon}
                    alt={nome}
                    className="w-8 h-8 rounded flex-shrink-0 object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="flex-1">
                    <div className="text-sm font-semibold" style={{ color: "#0d2137" }}>{info.label}</div>
                    <div className="text-xs" style={{ color: "#6b8299" }}>+ R$ {info.preco.toFixed(2)}/mês</div>
                  </div>
                  <span className="text-lg font-bold" style={{ color: "#00c2c7" }}>+</span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Comparativo */}
      {planosSimilares.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-5" style={{ color: "#0d2137" }}>Compare com outros planos</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {planosSimilares.map((p) => {
              const { inteiro: i, centavos: c } = formatarPreco(p.precoBase);
              return (
                <div
                  key={p.slug}
                  className="rounded-xl p-5 transition-all duration-200 cursor-pointer"
                  style={{ background: "#fff", border: "1.5px solid #e2eaf1" }}
                  onClick={() => navigate(`/plano/${p.slug}`)}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#00c2c7"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#e2eaf1"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
                >
                  <div className="text-2xl font-black mb-1" style={{ color: "#0d2137", letterSpacing: -1 }}>
                    {p.velocidade}<span className="text-base font-semibold">{p.unidade}</span>
                  </div>
                  <div className="text-lg font-bold mb-3" style={{ color: "#0d2137" }}>
                    R$ {i},{c}<span className="text-xs font-normal ml-1" style={{ color: "#6b8299" }}>/mês</span>
                  </div>
                  {p.plataformasInclusas.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {p.plataformasInclusas.map((plat) => (
                        <span key={plat} className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#e0faf8", color: "#00c2c7" }}>{plat}</span>
                      ))}
                    </div>
                  )}
                  <span className="text-xs font-medium" style={{ color: "#00c2c7" }}>Ver detalhes →</span>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}