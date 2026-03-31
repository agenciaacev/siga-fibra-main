export default function Footer() {
  return (
    <>
      <footer
        className="grid gap-7 px-10 py-10"
        style={{
          background: "#0d2137",
          color: "rgba(255,255,255,0.55)",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        }}
      >
        <div>
          <h4
            className="text-white text-sm font-semibold mb-3"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Sobre Nós
          </h4>
          {["Quem Somos", "Política de Privacidade", "Trabalhe Conosco", "Termos e Condições de Uso Disney"].map((item) => (
            <a
              key={item}
              href="#"
              className="block text-xs mb-2 no-underline transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.5)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#00c2c7")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
            >
              {item}
            </a>
          ))}
        </div>

        <div>
          <h4
            className="text-white text-sm font-semibold mb-3"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Nossas Soluções
          </h4>
          {["Para Você e sua Família", "Para sua Empresa", "Lan To Lan", "Link Dedicado"].map((item) => (
            <a
              key={item}
              href="#"
              className="block text-xs mb-2 no-underline transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.5)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#00c2c7")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
            >
              {item}
            </a>
          ))}
        </div>

        <div>
          <h4
            className="text-white text-sm font-semibold mb-3"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Baixe Nosso App
          </h4>
          {[{ label: "▶ Google Play", href: "#" }, { label: "🍎 App Store", href: "#" }].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block text-xs mb-2 no-underline transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.5)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#00c2c7")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div>
          <h4
            className="text-white text-sm font-semibold mb-3"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Suporte Técnico
          </h4>
          {["Autoatendimento via Whatsapp", "(85) 3198-9550", "suporte@sigafibra.com"].map((item) => (
            <a
              key={item}
              href="#"
              className="block text-xs mb-2 no-underline transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.5)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#00c2c7")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
            >
              {item}
            </a>
          ))}
        </div>

        <div>
          <h4
            className="text-white text-sm font-semibold mb-3"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Atendimento Comercial
          </h4>
          {["Autoatendimento via Whatsapp", "(85) 3198-9550"].map((item) => (
            <a
              key={item}
              href="#"
              className="block text-xs mb-2 no-underline transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.5)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#00c2c7")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
            >
              {item}
            </a>
          ))}
        </div>
      </footer>

      <div
        className="flex flex-col md:flex-row justify-between items-center gap-1 px-10 py-4 text-xs"
        style={{ background: "#091820", color: "rgba(255,255,255,0.35)" }}
      >
        <span>SIGA FIBRA LTDA — CNPJ: 16.577.060/0001-01 | Rua Gonçalves Ledo, 2846 — Fortaleza-CE</span>
        <span>©2022 SIGA FIBRA — Todos os direitos reservados.</span>
      </div>
    </>
  );
}