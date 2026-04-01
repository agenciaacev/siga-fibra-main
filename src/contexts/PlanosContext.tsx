import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface PlanosContextType {
  extras: Record<string, string[]>; // slug -> array de extras
  adicionarExtra: (slug: string, plataforma: string) => void;
  removerExtra: (slug: string, plataforma: string) => void;
  getExtras: (slug: string) => string[];
}

const PlanosContext = createContext<PlanosContextType | undefined>(undefined);

export function PlanosProvider({ children }: { children: ReactNode }) {
  const [extras, setExtras] = useState<Record<string, string[]>>({});

  const adicionarExtra = (slug: string, plataforma: string) => {
    setExtras((prev) => {
      const platoformasDoPlano = prev[slug] || [];
      if (!platoformasDoPlano.includes(plataforma)) {
        return {
          ...prev,
          [slug]: [...platoformasDoPlano, plataforma],
        };
      }
      return prev;
    });
  };

  const removerExtra = (slug: string, plataforma: string) => {
    setExtras((prev) => {
      const platoformasDoPlano = prev[slug] || [];
      return {
        ...prev,
        [slug]: platoformasDoPlano.filter((p) => p !== plataforma),
      };
    });
  };

  const getExtras = (slug: string) => extras[slug] || [];

  return (
    <PlanosContext.Provider value={{ extras, adicionarExtra, removerExtra, getExtras }}>
      {children}
    </PlanosContext.Provider>
  );
}

export function usePlanosContext() {
  const context = useContext(PlanosContext);
  if (context === undefined) {
    throw new Error("usePlanosContext deve ser usado dentro de PlanosProvider");
  }
  return context;
}
