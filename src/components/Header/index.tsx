import { Link } from "react-router-dom";

export default function Header() {
  // const location = useLocation();

  return (
    <header className="bg-white border-b border-gray-200 px-6 md:px-10 flex items-center justify-between h-16 sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="flex items-end gap-0.5 no-underline">
        <span
          className="font-black text-2xl tracking-tight"
          style={{ fontFamily: "'DM Sans', sans-serif", color: "#0d2137" }}
        >
          siga
          <span style={{ color: "#00c2c7" }}>.</span>
        </span>
        <span
          className="text-xs font-normal mb-0.5"
          style={{ color: "#6b8299" }}
        >
          fibra
        </span>
      </Link>

      {/* Nav */}
      <nav className="hidden md:flex items-center gap-7">
        <a
          href="#"
          className="text-sm no-underline transition-colors duration-200"
          style={{ color: "#6b8299" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#00c2c7")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#6b8299")}
        >
          Fortaleza-CE 📍
        </a>
        <Link
          to="/?tab=residencial"
          className="text-sm no-underline transition-colors duration-200"
          style={{ color: "#6b8299" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#00c2c7")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#6b8299")}
        >
          Para você e sua família
        </Link>
        <Link
          to="/?tab=empresarial"
          className="text-sm no-underline transition-colors duration-200"
          style={{ color: "#6b8299" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#00c2c7")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#6b8299")}
        >
          Para sua empresa
        </Link>
      </nav>

      {/* Botão WhatsApp */}
      <a
        href="https://wa.me/5585999999999"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-white text-sm font-medium rounded-full px-5 py-2 transition-all duration-200 no-underline"
        style={{ background: "#3ecf8e" }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "#1fa96e";
          (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "#3ecf8e";
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.128.558 4.127 1.533 5.858L.053 23.37a.5.5 0 0 0 .614.612l5.604-1.47A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.9 9.9 0 0 1-5.031-1.371l-.36-.214-3.733.979.997-3.645-.234-.375A9.9 9.9 0 0 1 2.1 12C2.1 6.534 6.534 2.1 12 2.1S21.9 6.534 21.9 12 17.466 21.9 12 21.9z" />
        </svg>
        <span className="hidden sm:inline">Assine pelo Whatsapp</span>
        <span className="sm:hidden">WhatsApp</span>
      </a>
    </header>
  );
}