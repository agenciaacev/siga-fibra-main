export type Plataforma = {
  nome: string;
  cor: string;
  label: string;
  preco: number;
};

export type Plano = {
  slug: string;
  velocidade: number;
  unidade: "MB" | "GB";
  precoBase: number;
  tipo: "residencial" | "empresarial";
  plataformasInclusas: string[];
  destaque?: boolean;
};

export const PLATAFORMAS: Record<string, Plataforma> = {
  Max:        { nome: "Max",       cor: "#6441a5", label: "Max (HBO)",    preco: 8.90  },
  Globoplay:  { nome: "Globoplay", cor: "#ff5f00", label: "Globoplay",    preco: 7.50  },
  Ubook:      { nome: "Ubook",     cor: "#f4a100", label: "Ubook",        preco: 3.90  },
  Watch:      { nome: "Watch",     cor: "#00b4d8", label: "Claro Watch",  preco: 4.50  },
  "Disney+":  { nome: "Disney+",   cor: "#0d3b8e", label: "Disney+",      preco: 11.90 },
  Netflix:    { nome: "Netflix",   cor: "#e50914", label: "Netflix",      preco: 14.90 },
  Prime:      { nome: "Prime",     cor: "#00a8e0", label: "Prime Video",  preco: 6.90  },
  "Apple TV+":{ nome: "Apple TV+", cor: "#555555", label: "Apple TV+",   preco: 5.90  },
};

export const planos: Plano[] = [
  // RESIDENCIAL
  {
    slug: "residencial-500mb-basico",
    velocidade: 500,
    unidade: "MB",
    precoBase: 94.90,
    tipo: "residencial",
    plataformasInclusas: ["Ubook", "Watch"],
  },
  {
    slug: "residencial-600mb-max",
    velocidade: 600,
    unidade: "MB",
    precoBase: 104.90,
    tipo: "residencial",
    plataformasInclusas: ["Ubook", "Max"],
  },
  {
    slug: "residencial-600mb-globo",
    velocidade: 600,
    unidade: "MB",
    precoBase: 104.90,
    tipo: "residencial",
    plataformasInclusas: ["Ubook", "Globoplay"],
  },
  {
    slug: "residencial-700mb-max",
    velocidade: 700,
    unidade: "MB",
    precoBase: 114.90,
    tipo: "residencial",
    plataformasInclusas: ["Ubook", "Max"],
    destaque: true,
  },
  {
    slug: "residencial-700mb-globo",
    velocidade: 700,
    unidade: "MB",
    precoBase: 114.90,
    tipo: "residencial",
    plataformasInclusas: ["Ubook", "Globoplay"],
  },
  {
    slug: "residencial-800mb-max",
    velocidade: 800,
    unidade: "MB",
    precoBase: 139.90,
    tipo: "residencial",
    plataformasInclusas: ["Ubook", "Max"],
  },
  {
    slug: "residencial-800mb-globo",
    velocidade: 800,
    unidade: "MB",
    precoBase: 139.90,
    tipo: "residencial",
    plataformasInclusas: ["Ubook", "Globoplay"],
  },
  {
    slug: "residencial-1gb-max",
    velocidade: 1,
    unidade: "GB",
    precoBase: 159.90,
    tipo: "residencial",
    plataformasInclusas: ["Ubook", "Max"],
  },
  {
    slug: "residencial-1gb-globo",
    velocidade: 1,
    unidade: "GB",
    precoBase: 159.90,
    tipo: "residencial",
    plataformasInclusas: ["Ubook", "Globoplay"],
  },

  // EMPRESARIAL
  {
    slug: "empresarial-500mb",
    velocidade: 500,
    unidade: "MB",
    precoBase: 129.90,
    tipo: "empresarial",
    plataformasInclusas: [],
  },
  {
    slug: "empresarial-700mb",
    velocidade: 700,
    unidade: "MB",
    precoBase: 179.90,
    tipo: "empresarial",
    plataformasInclusas: [],
    destaque: true,
  },
  {
    slug: "empresarial-1gb",
    velocidade: 1,
    unidade: "GB",
    precoBase: 229.90,
    tipo: "empresarial",
    plataformasInclusas: [],
  },
];

export function formatarPreco(valor: number): { inteiro: string; centavos: string } {
  const [int, dec] = valor.toFixed(2).split(".");
  return { inteiro: int, centavos: dec };
}

export function calcularTotal(plano: Plano, extras: string[]): number {
  const extraTotal = extras
    .filter((p) => !plano.plataformasInclusas.includes(p))
    .reduce((acc, p) => acc + (PLATAFORMAS[p]?.preco ?? 0), 0);
  return plano.precoBase + extraTotal;
}