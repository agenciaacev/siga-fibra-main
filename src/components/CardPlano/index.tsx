import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plano, PLATAFORMAS, calcularTotal, formatarPreco } from "../../data/planos";

interface CardPlanoProps {
  plano: Plano;
}


export default function CardPlano({ plano }: CardPlanoProps) {
  const navigate = useNavigate();
  const [extras, setExtras] = useState<string[]>([]);
  const [pickerAberto, setPickerAberto] = useState(false);

  const todasPlataformas = [...plano.plataformasInclusas, ...extras];
  const total = calcularTotal(plano, extras);
  const { inteiro, centavos } = formatarPreco(total);

  const adicionarExtra = (nome: string) => {
    if (!extras.includes(nome)) setExtras([...extras, nome]);
    setPickerAberto(false);
  };

  const removerExtra = (nome: string) => {
    setExtras(extras.filter((p) => p !== nome));
  };

  const plataformasDisponiveis = Object.keys(PLATAFORMAS).filter(
    (p) => !todasPlataformas.includes(p)
  );

  return (
    <div
      className="bg-white rounded-2xl flex flex-col overflow-hidden transition-all duration-300 cursor-pointer group"
      style={{
        border: "1.5px solid #e2eaf1",
        boxShadow: "none",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px rgba(0,194,199,0.13)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLElement).style.borderColor = "#00c2c7";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.borderColor = "#e2eaf1";
      }}
    >
      {/* Topo com gradiente */}
      <div
        className="relative px-6 pt-7 pb-5 flex flex-col justify-between overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #00c2c7 0%, #3ecf8e 100%)",
          minHeight: "170px",
        }}
        onClick={() => navigate(`/plano/${plano.slug}`)}
      >
        {/* Círculos decorativos */}
        <div
          className="absolute rounded-full"
          style={{
            top: -30, right: -30,
            width: 120, height: 120,
            background: "rgba(255,255,255,0.12)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            bottom: -20, left: 40,
            width: 80, height: 80,
            background: "rgba(255,255,255,0.08)",
          }}
        />

        {/* Velocidade */}
        <div className="relative z-10">
          <div
            className="text-white leading-none"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 52,
              fontWeight: 800,
              letterSpacing: -2,
            }}
          >
            {plano.velocidade}
            <span style={{ fontSize: 20, fontWeight: 600, letterSpacing: 0 }}>
              {plano.unidade}
            </span>
          </div>
          <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.8)" }}>
            de velocidade
          </div>
        </div>

        {/* Logo */}
        <div
          className="self-end relative z-10"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16,
            fontWeight: 700,
            color: "rgba(255,255,255,0.7)",
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          siga
        </div>
      </div>

      {/* Corpo */}
      <div className="flex-1 flex flex-col gap-3 px-6 pt-5 pb-4">
        {/* Preço */}
        <div onClick={() => navigate(`/plano/${plano.slug}`)} style={{ cursor: "pointer" }}>
          <div className="text-xs mb-0.5" style={{ color: "#6b8299" }}>A partir de</div>
          <div className="flex items-end gap-1">
            <span className="text-base font-semibold" style={{ color: "#0d2137", marginBottom: 6 }}>R$</span>
            <span
              className="leading-none"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 38,
                fontWeight: 800,
                color: "#0d2137",
                letterSpacing: -1.5,
              }}
            >
              {inteiro}
            </span>
            <span className="text-lg font-bold mb-1" style={{ color: "#0d2137" }}>,{centavos}</span>
            <span className="text-xs mb-1.5" style={{ color: "#6b8299" }}>/mês</span>
          </div>

          {/* Breakdown */}
          <div
            className="text-xs rounded-lg px-2.5 py-1.5 mt-1"
            style={{
              color: "#00c2c7",
              background: "#e0faf8",
              lineHeight: 1.6,
            }}
          >
            {plano.plataformasInclusas.map((p) => (
              <div key={p}>{p}: incluso no plano</div>
            ))}
            {extras.map((p) => (
              <div key={p}>+ {p}: R$ {PLATAFORMAS[p].preco.toFixed(2)}</div>
            ))}
          </div>
        </div>

        {/* Plataformas */}
        <div onClick={(e) => e.stopPropagation()}>
          <div
            className="text-xs font-medium uppercase mb-2"
            style={{ color: "#6b8299", letterSpacing: 0.8 }}
          >
            Plataformas inclusas
          </div>
          <div className="flex flex-wrap gap-1.5">
            {plano.plataformasInclusas.map((p) => (
              <div
                key={p}
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium"
                style={{
                  background: "#f4f8fb",
                  border: "1px solid #e2eaf1",
                  color: "#1a2e40",
                }}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: PLATAFORMAS[p]?.cor }}
                />
                {p}
              </div>
            ))}
            {extras.map((p) => (
              <div
                key={p}
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium relative group/tag"
                style={{
                  background: "#f4f8fb",
                  border: "1px solid #e2eaf1",
                  color: "#1a2e40",
                  paddingRight: 26,
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#fff0f0";
                  (e.currentTarget as HTMLElement).style.borderColor = "#ffb3b3";
                  (e.currentTarget as HTMLElement).style.color = "#c0392b";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#f4f8fb";
                  (e.currentTarget as HTMLElement).style.borderColor = "#e2eaf1";
                  (e.currentTarget as HTMLElement).style.color = "#1a2e40";
                }}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: PLATAFORMAS[p]?.cor }}
                />
                {p}
                <button
                  onClick={() => removerExtra(p)}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 text-red-500 font-bold text-xs leading-none"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Adicionar plataforma */}
          <div className="mt-2.5">
            <button
              onClick={() => setPickerAberto(!pickerAberto)}
              className="w-full flex items-center gap-2 text-xs rounded-xl px-3.5 py-2.5 transition-all duration-200"
              style={{
                background: "#f4f8fb",
                border: "1.5px dashed #e2eaf1",
                color: "#6b8299",
                fontFamily: "'DM Sans', sans-serif",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#00c2c7";
                (e.currentTarget as HTMLElement).style.color = "#00c2c7";
                (e.currentTarget as HTMLElement).style.background = "#e0faf8";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#e2eaf1";
                (e.currentTarget as HTMLElement).style.color = "#6b8299";
                (e.currentTarget as HTMLElement).style.background = "#f4f8fb";
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Adicionar plataforma
            </button>

            {pickerAberto && plataformasDisponiveis.length > 0 && (
              <div
                className="mt-2 rounded-xl p-2.5"
                style={{
                  background: "#fff",
                  border: "1.5px solid #e2eaf1",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              >
                <div
                  className="text-xs font-medium uppercase mb-2"
                  style={{ color: "#6b8299", letterSpacing: 0.8 }}
                >
                  Escolha uma plataforma
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {plataformasDisponiveis.map((p) => (
                    <button
                      key={p}
                      onClick={() => adicionarExtra(p)}
                      className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-150"
                      style={{
                        background: "#f4f8fb",
                        border: "1.5px solid #e2eaf1",
                        color: "#1a2e40",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "#00c2c7";
                        (e.currentTarget as HTMLElement).style.background = "#e0faf8";
                        (e.currentTarget as HTMLElement).style.color = "#00c2c7";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "#e2eaf1";
                        (e.currentTarget as HTMLElement).style.background = "#f4f8fb";
                        (e.currentTarget as HTMLElement).style.color = "#1a2e40";
                      }}
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: PLATAFORMAS[p].cor }}
                      />
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Separador + CTA */}
      <div style={{ borderTop: "1px solid #e2eaf1" }} />
      <div className="px-6 py-5">
        <button
          onClick={() => navigate(`/plano/${plano.slug}`)}
          className="w-full text-white text-sm font-semibold rounded-full py-3 transition-all duration-200"
          style={{
            background: "linear-gradient(90deg, #00c2c7 0%, #3ecf8e 100%)",
            border: "none",
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: 0.3,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = "0.9";
            (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = "1";
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          }}
        >
          Assinar agora
        </button>
      </div>
    </div>
  );
}