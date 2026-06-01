export type CarStatus = "available" | "sold" | "reserved";

export type SaleCar = {
  id: string;
  name: string;
  version: string;
  year: number;
  price: string;
  /** Parcela estimada — apenas vitrine, não é oferta financeira */
  installmentFrom?: string;
  mileage: string;
  transmission: string;
  fuel: string;
  color: string;
  image: string;
  status: CarStatus;
  listingCode: string;
  description: string;
  highlights: string[];
};

/** Metadados da vitrine — tom de concessionária que parou de atualizar o estoque */
export const SHOWROOM_META = {
  address: "Av. Nações Unidas, 12.345 — Santo Amaro, São Paulo/SP",
  lastUpdated: "março de 2025",
  financingNote:
    "Valores e parcelas são estimativas de vitrine. Sujeito à análise de crédito e disponibilidade.",
} as const;

export const INVENTORY: SaleCar[] = [
  {
    id: "chevrolet-onix",
    name: "Chevrolet Onix",
    version: "1.0 Turbo Flex LT",
    year: 2022,
    price: "R$ 72.900",
    installmentFrom: "R$ 1.489/mês",
    mileage: "34.200 km",
    transmission: "Automático",
    fuel: "Flex",
    color: "Branco Summit",
    image: "/showroom/chevrolet-onix.jpg",
    status: "available",
    listingCode: "VSN-2401",
    description:
      "Onix LT com baixa quilometragem para a categoria. Único dono, manual e chave reserva. Ideal para uso urbano com consumo equilibrado e manutenção acessível na rede Chevrolet.",
    highlights: [
      "MyLink com espelhamento",
      "Controle de estabilidade",
      "Ar-condicionado digital",
      "IPVA 2025 pago",
    ],
  },
  {
    id: "volkswagen-gol",
    name: "Volkswagen Gol",
    version: "1.6 MSI Total Flex",
    year: 2019,
    price: "R$ 48.500",
    installmentFrom: "R$ 989/mês",
    mileage: "67.800 km",
    transmission: "Manual",
    fuel: "Flex",
    color: "Prata Sirius",
    image: "/showroom/volkswagen-gol.jpg",
    status: "available",
    listingCode: "VSN-2388",
    description:
      "Gol 1.6 com histórico de revisões na concessionária. Carro honesto, sem leilão ou sinistro. Bom para quem quer custo baixo de aquisição e peças fáceis de encontrar.",
    highlights: [
      "Direção elétrica",
      "Vidros e travas elétricas",
      "Airbags frontais",
      "Pneus com boa vida útil",
    ],
  },
  {
    id: "hyundai-hb20",
    name: "Hyundai HB20",
    version: "1.0 Sense Plus",
    year: 2023,
    price: "R$ 78.400",
    installmentFrom: "R$ 1.599/mês",
    mileage: "18.900 km",
    transmission: "Manual",
    fuel: "Flex",
    color: "Cinza Sand",
    image: "/showroom/hyundai-hb20.jpg",
    status: "available",
    listingCode: "VSN-2412",
    description:
      "HB20 praticamente zero km de rodagem. Garantia de fábrica ainda vigente. Acabamento atual da linha Sense com central touchscreen e boa posição de dirigir.",
    highlights: [
      "Garantia Hyundai",
      "Central multimídia 8\"",
      "Câmera de ré",
      "Sensor de estacionamento traseiro",
    ],
  },
  {
    id: "toyota-corolla",
    name: "Toyota Corolla",
    version: "2.0 Flex XEi",
    year: 2021,
    price: "R$ 128.900",
    installmentFrom: "R$ 2.629/mês",
    mileage: "42.100 km",
    transmission: "Automático CVT",
    fuel: "Flex",
    color: "Preto Attitude",
    image: "/showroom/toyota-corolla.jpg",
    status: "available",
    listingCode: "VSN-2395",
    description:
      "Corolla XEi com reputação de confiabilidade Toyota. Interior conservado, motor 2.0 silencioso em estrada. Excelente para quem roda muito e não quer surpresa na oficina.",
    highlights: [
      "Piloto automático adaptativo",
      "Bancos em couro sintético",
      "Rodas aro 16",
      "Revisões em concessionária",
    ],
  },
  {
    id: "honda-civic",
    name: "Honda Civic",
    version: "2.0 Flex EX",
    year: 2020,
    price: "R$ 119.500",
    installmentFrom: "R$ 2.439/mês",
    mileage: "51.300 km",
    transmission: "Automático CVT",
    fuel: "Flex",
    color: "Azul Cosmic",
    image: "/showroom/honda-civic.jpg",
    status: "reserved",
    listingCode: "VSN-2379",
    description:
      "Civic EX com pacote completo da versão. Reserva sinalizada — ainda aceitamos lista de espera. Direção precisa e porta-malas generoso para viagens.",
    highlights: [
      "Honda Sensing",
      "Teto solar",
      "Bancos elétricos",
      "Chave presencial",
    ],
  },
  {
    id: "fiat-strada",
    name: "Fiat Strada",
    version: "1.3 Firefly Flex Freedom",
    year: 2023,
    price: "R$ 89.900",
    installmentFrom: "R$ 1.839/mês",
    mileage: "29.600 km",
    transmission: "Manual",
    fuel: "Flex",
    color: "Vermelho Montecarlo",
    image: "/showroom/fiat-strada.jpg",
    status: "available",
    listingCode: "VSN-2408",
    description:
      "Strada Freedom cabine dupla, a mais vendida do Brasil por um motivo. Caçamba ampla, altura útil e visual robusto. Perfeita para obra leve ou fim de semana.",
    highlights: [
      "Caçamba com protetor",
      "Friso lateral",
      "Ar-condicionado",
      "Engate preparado",
    ],
  },
  {
    id: "toyota-hilux",
    name: "Toyota Hilux",
    version: "2.8 Diesel SRX 4x4",
    year: 2022,
    price: "R$ 249.000",
    installmentFrom: "R$ 5.089/mês",
    mileage: "38.700 km",
    transmission: "Automático",
    fuel: "Diesel",
    color: "Cinza Graphite",
    image: "/showroom/toyota-hilux.jpg",
    status: "available",
    listingCode: "VSN-2391",
    description:
      "Hilux topo de linha com tração 4x4 e motor 2.8. Referência em revenda no Brasil. Revisada, sem off-road extremo, pronta para estrada ou cidade com presença.",
    highlights: [
      "Pacote SRX completo",
      "Central multimídia",
      "Controle de descida",
      "Barra de proteção",
    ],
  },
  {
    id: "jeep-compass",
    name: "Jeep Compass",
    version: "1.3 T270 Turbo Flex Longitude",
    year: 2023,
    price: "R$ 165.000",
    installmentFrom: "R$ 3.369/mês",
    mileage: "22.400 km",
    transmission: "Automático",
    fuel: "Flex",
    color: "Branco Banchisa",
    image: "/showroom/jeep-compass.jpg",
    status: "available",
    listingCode: "VSN-2415",
    description:
      "Compass Longitude com motor turbo T270. SUV médio com bom espaço interno e visual Jeep. Pouco rodado, documentação em dia.",
    highlights: [
      "Uconnect 8.4\"",
      "Rodas aro 18",
      "Faróis em LED",
      "Seletor de terrenos",
    ],
  },
  {
    id: "volkswagen-polo",
    name: "Volkswagen Polo",
    version: "1.0 TSI Flex",
    year: 2022,
    price: "R$ 82.500",
    installmentFrom: "R$ 1.689/mês",
    mileage: "31.000 km",
    transmission: "Automático",
    fuel: "Flex",
    color: "Cinza Platinum",
    image: "/showroom/volkswagen-polo.jpg",
    status: "available",
    listingCode: "VSN-2403",
    description:
      "Polo TSI automático — hatch premium compacto com dirigibilidade europeia. Ótimo para quem quer mais que um popular sem ir para SUV.",
    highlights: [
      "Motor turbo 128 cv",
      "Controle de cruzeiro",
      "Volante multifuncional",
      "ISOFIX traseiro",
    ],
  },
  {
    id: "chevrolet-tracker",
    name: "Chevrolet Tracker",
    version: "1.0 Turbo Flex Premier",
    year: 2022,
    price: "R$ 98.700",
    installmentFrom: "R$ 2.019/mês",
    mileage: "36.500 km",
    transmission: "Automático",
    fuel: "Flex",
    color: "Azul Seeker",
    image: "/showroom/chevrolet-tracker.jpg",
    status: "available",
    listingCode: "VSN-2398",
    description:
      "Tracker Premier com pacote visual e tecnologia Chevrolet. SUV compacto muito procurado em São Paulo por altura e visibilidade no trânsito.",
    highlights: [
      "OnStar ativo",
      "Carregador wireless",
      "Rodas aro 17",
      "6 airbags",
    ],
  },
  {
    id: "hyundai-creta",
    name: "Hyundai Creta",
    version: "1.6 Pulse Plus",
    year: 2021,
    price: "R$ 104.900",
    mileage: "44.800 km",
    transmission: "Automático",
    fuel: "Flex",
    color: "Branco Atlas",
    image: "/showroom/hyundai-creta.jpg",
    status: "sold",
    listingCode: "VSN-2362",
    description:
      "Unidade vendida em fevereiro/2025. Mantida no catálogo como referência do padrão VISION — SUV compacto com ótimo custo-benefício.",
    highlights: [
      "Vendido",
      "Teto solar panorâmico",
      "Bancos em couro",
      "Central 10.25\"",
    ],
  },
  {
    id: "renault-kwid",
    name: "Renault Kwid",
    version: "1.0 Zen",
    year: 2020,
    price: "R$ 39.900",
    mileage: "58.200 km",
    transmission: "Manual",
    fuel: "Flex",
    color: "Laranja Atacama",
    image: "/showroom/renault-kwid.jpg",
    status: "sold",
    listingCode: "VSN-2355",
    description:
      "Kwid Zen vendido — entrada mais acessível da loja. Histórico preservado para consulta de clientes que buscam faixa de preço similar.",
    highlights: [
      "Vendido",
      "Consumo urbano baixo",
      "Multimídia Media Nav",
      "2 airbags",
    ],
  },
];

export const SHOWROOM_STATS = {
  availableCount: INVENTORY.filter((c) => c.status === "available").length,
  totalCount: INVENTORY.length,
};

export function getSaleCarById(id: string): SaleCar | undefined {
  return INVENTORY.find((car) => car.id === id);
}

export function getAllSaleCarIds(): string[] {
  return INVENTORY.map((car) => car.id);
}

export function getStatusLabel(status: CarStatus): string {
  switch (status) {
    case "sold":
      return "Vendido";
    case "reserved":
      return "Reservado";
    default:
      return "Disponível";
  }
}
