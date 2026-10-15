export interface Barber {
  id: string;
  name: string;
  role: string;
  initials: string;
  whatsapp?: string;
  email?: string;
  photo?: string;
  genero?: string;
  oficios?: string[];
  horario?: {
    openHour: number;
    openMinute: number;
  };
}

export interface ServiceExample {
  type: "photo" | "video";
  src: string;
  poster?: string;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  priceMax?: number;
  originalPrice?: number;
  duration: number; // in minutes
  description: string;
  grupo?: string;
  equipo?: string[];
  recommended?: boolean;
  featured?: boolean;
  includes?: string[];
  examples?: ServiceExample[];
}

export interface ServiceCategory {
  id: string;
  title: string;
  oficio?: string;
  grupoExclusivo?: string;
  services: Service[];
}

export interface ProductItem {
  name: string;
  brands: string[];
  photos: { src: string; alt: string }[];
}

export interface ProductCategory {
  id: string;
  title: string;
  description: string;
  items: ProductItem[];
}

export const BUSINESS = {
  name: "Quality Barber Shop",
  tagline: "Estilo, precisión y confianza en cada corte",
  phone: "3506819268",
  whatsapp: "+573234928607",
  email: "reservas@qualitybarbershop.com",
  siteUrl: "https://qualitybarbershop.cesagencia.co",
  city: "Dosquebradas, Risaralda",
  instagram: "@quality.barber.shop",
  instagramUrl: "https://instagram.com/quality.barber.shop",
  mapsUrl:
    "https://www.google.com/maps/place/Quality+Barber+Shop/@4.8236885,-75.6777567,17z/data=!3m1!4b1!4m6!3m5!1s0x8e3887cf7945bc7d:0x4d545d41baefa078!8m2!3d4.8236885!4d-75.6777567!16s%2Fg%2F11xgvxfxws",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=4.8236885,-75.6777567&z=16&output=embed",
  googleRating: 5.0,
  googleReviewCount: 48,
};

export const SCHEDULE = {
  openDays: [1, 2, 3, 4, 5, 6], // 1=Mon, 6=Sat
  openHour: 7,
  openMinute: 20,
  closeHour: 20,
  closeMinute: 0,
};

export const DAY_LABELS = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

export const BARBERS: Barber[] = [
  {
    id: "cualquiera",
    name: "Cualquiera disponible",
    role: "Te asignamos el mejor turno",
    initials: "QB",
    oficios: ["barberia", "unas-hombre", "unas-mujer", "unas-extensiones"],
  },
  {
    id: "david-montes",
    name: "David Montes",
    role: "Barbero",
    initials: "DM",
    whatsapp: "+573234928607",
    email: "Quality.barber2000@gmail.com",
    photo: "/barber-david-montes.jpg",
    oficios: ["barberia"],
  },
  {
    id: "andres-felipe",
    name: "Andrés Felipe",
    role: "Barbero",
    initials: "AF",
    whatsapp: "+573243256567",
    email: "andresfelipemontesvera17@gmail.com",
    photo: "/barber-andres-felipe.jpg",
    horario: { openHour: 8, openMinute: 0 },
    oficios: ["barberia"],
  },
  {
    id: "yenny-castaneda",
    name: "Yenny Castañeda",
    role: "Manicurista",
    initials: "YC",
    whatsapp: "+573137309370",
    email: "castanedalondonoyenny@gmail.com",
    photo: "/barber-yenny-castaneda.jpg",
    genero: "f",
    oficios: ["unas-hombre", "unas-mujer"],
  },
  {
    id: "luisa-gomez",
    name: "Luisa María Gómez",
    role: "Manicurista",
    initials: "LG",
    whatsapp: "+573158198175",
    email: "lugomez037@gmail.com",
    photo: "/barber-luisa-gomez.jpg",
    genero: "f",
    oficios: ["unas-hombre", "unas-mujer", "unas-extensiones"],
  },
];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "unas-hombre",
    title: "Uñas · Hombre",
    oficio: "unas-hombre",
    services: [
      {
        id: "manicure-tradicional",
        name: "Manicure tradicional",
        price: 12000,
        duration: 40,
        description:
          "Corte y limpieza de uñas, cutícula, pulido, exfoliación y esmaltado. Ideal cada 7 o 10 días.",
        grupo: "manos",
      },
      {
        id: "manicure-polichada",
        name: "Manicure con polichada",
        price: 15000,
        duration: 45,
        description:
          "Manicure tradicional con brillo pulido a mano, sin esmalte.",
        grupo: "manos",
      },
      {
        id: "pedicure-tradicional",
        name: "Pedicure tradicional",
        price: 18000,
        duration: 50,
        description:
          "Corte, limpieza y cuidado completo de las uñas de los pies.",
        equipo: ["luisa-gomez"],
        grupo: "pies",
      },
      {
        id: "manicure-semipermanente",
        name: "Semipermanente manos",
        price: 25000,
        duration: 60,
        description:
          "Manicure completo con esmaltado semipermanente para una mayor durabilidad.",
        examples: [
          { type: "photo", src: "/example-manicure-semipermanente.jpg" },
        ],
        grupo: "manos",
      },
      {
        id: "semipermanente-pies",
        name: "Semipermanente pies",
        price: 28000,
        duration: 60,
        description: "Pedicure completo con esmaltado semipermanente.",
        equipo: ["luisa-gomez"],
        grupo: "pies",
      },
    ],
  },
  {
    id: "unas-mujer",
    title: "Uñas · Mujer",
    oficio: "unas-mujer",
    services: [
      {
        id: "unas-mujer-manos",
        name: "Manos · un solo tono o sin decorado",
        price: 12000,
        duration: 60,
        description:
          "Manicure tradicional con esmaltado en un solo tono, o sin esmalte.",
        equipo: ["luisa-gomez", "yenny-castaneda"],
        grupo: "manos",
      },
      {
        id: "unas-mujer-manos-decorado",
        name: "Manos · con decorado",
        price: 18000,
        duration: 90,
        description: "Manicure tradicional con decoración a mano.",
        equipo: ["luisa-gomez"],
        grupo: "manos",
      },
      {
        id: "unas-mujer-pies",
        name: "Pies · un solo tono o sin decorado",
        price: 18000,
        duration: 60,
        description:
          "Pedicure tradicional con esmaltado en un solo tono, o sin esmalte.",
        grupo: "pies",
      },
      {
        id: "unas-mujer-manos-semi",
        name: "Semipermanente manos · un solo tono o sin decorado",
        price: 25000,
        duration: 70,
        description: "Esmaltado semipermanente en manos, en un solo tono.",
        equipo: ["luisa-gomez", "yenny-castaneda"],
        grupo: "manos",
      },
      {
        id: "unas-mujer-manos-semi-decorado",
        name: "Semipermanente manos · con decorado",
        price: 35000,
        duration: 90,
        description: "Esmaltado semipermanente en manos, con decoración a mano.",
        equipo: ["luisa-gomez"],
        grupo: "manos",
      },
      {
        id: "unas-mujer-pies-semi",
        name: "Semipermanente pies · un solo tono o sin decorado",
        price: 30000,
        duration: 70,
        description: "Esmaltado semipermanente en pies, en un solo tono.",
        grupo: "pies",
      },
      {
        id: "unas-mujer-pies-semi-decorado",
        name: "Semipermanente pies · con decorado",
        price: 35000,
        duration: 90,
        description: "Esmaltado semipermanente en pies, con decoración a mano.",
        equipo: ["luisa-gomez"],
        grupo: "pies",
      },
    ],
  },
  {
    id: "unas-extensiones",
    title: "Extensiones y sistemas",
    oficio: "unas-extensiones",
    services: [
      {
        id: "soft-gel",
        name: "Soft Gel",
        price: 70000,
        duration: 150,
        description:
          "Extensiones con tips de gel blando, livianas y de acabado natural.",
        grupo: "manos",
      },
      {
        id: "builder-gel",
        name: "Builder Gel",
        price: 85000,
        duration: 150,
        description:
          "Extensiones construidas en gel, para más largo y resistencia.",
        grupo: "manos",
      },
      {
        id: "builder-gel-tip",
        name: "Builder Gel con Tip",
        price: 80000,
        duration: 150,
        description: "Extensiones en Builder Gel montadas sobre tip.",
        grupo: "manos",
      },
      {
        id: "recubrimiento-builder-gel",
        name: "Recubrimiento en Builder Gel",
        price: 45000,
        duration: 120,
        description:
          "Refuerzo en gel sobre la uña natural, sin extender el largo.",
        grupo: "manos",
      },
    ],
  },
  {
    id: "cortes",
    title: "Cortes de cabello",
    grupoExclusivo: "corte",
    services: [
      {
        id: "corte-clasico",
        name: "Corte",
        price: 20000,
        duration: 40,
        description: "Nuestro corte de toda la vida, limpio y prolijo.",
        examples: [
          { type: "photo", src: "/example-corte-1.jpg" },
          {
            type: "photo",
            src: "/example-corte-2.jpg",
          },
          { type: "photo", src: "/example-corte-3.jpg" },
        ],
      },
      {
        id: "corte-basico",
        name: "Corte sencillo",
        price: 15000,
        priceMax: 18000,
        duration: 25,
        description:
          "Corte de cabello ajustado a tu estilo, con maquinilla y tijera.",
        examples: [
          {
            type: "photo",
            src: "/example-corte-sencillo-video-poster.jpg",
          },
        ],
      },
      {
        id: "corte-lavado",
        name: "Corte con Lavado",
        price: 25000,
        duration: 45,
        description: "Corte de cabello más lavado con shampoo antes de empezar.",
        recommended: true,
        examples: [
          {
            type: "photo",
            src: "/example-corte-lavado-video-poster.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "barba-combos",
    title: "Barba y combos",
    grupoExclusivo: "corte",
    services: [
      {
        id: "corte-barba",
        name: "Corte + Barba",
        price: 23000,
        duration: 45,
        description:
          "Corte de cabello y arreglo completo de barba en una sola cita.",
        examples: [
          { type: "photo", src: "/example-corte-barba-foto.jpg" },
          { type: "photo", src: "/example-corte-barba-perfil.jpg" },
        ],
      },
      {
        id: "corte-barba-lavado",
        name: "Corte + Barba con Lavado",
        price: 28000,
        duration: 50,
        description:
          "Corte, barba y lavado con shampoo, todo en un solo turno.",
        recommended: true,
        examples: [{ type: "photo", src: "/example-corte-barba-lavado.jpg" }],
      },
    ],
  },
  {
    id: "marcaciones",
    title: "Marcaciones",
    grupoExclusivo: "marcacion",
    services: [
      {
        id: "marcacion-sombra",
        name: "Marcación con sombra leve (sin barba)",
        price: 7000,
        duration: 15,
        description:
          "Marcación de contornos con un degradado suave, sin tocar la barba.",
      },
      {
        id: "marcacion-sombra-barba",
        name: "Marcación con sombra leve + barba",
        price: 10000,
        duration: 20,
        description: "Marcación con sombra suave más arreglo de barba.",
        examples: [
          { type: "photo", src: "/example-marcacion-sombra-barba.jpg" },
        ],
      },
    ],
  },
  {
    id: "premium",
    title: "Servicios premium",
    grupoExclusivo: "corte",
    services: [
      {
        id: "premium-corte",
        name: "Corte Premium",
        price: 40000,
        originalPrice: 60000,
        duration: 50,
        featured: true,
        description:
          "La experiencia completa: corte, mascarilla, lavado, masaje y snack incluido.",
        includes: [
          "Corte de cabello",
          "Mascarilla de puntos negros",
          "Lavado con shampoo y acondicionador",
          "Masaje capilar",
          "Peinado con cera a preferencia",
          "Aplicación de serum hidratante facial",
          "Masaje en hombros",
          "Snack",
        ],
      },
      {
        id: "premium-corte-barba",
        name: "Corte Premium + Barba",
        price: 45000,
        originalPrice: 65000,
        duration: 55,
        featured: true,
        description:
          "La experiencia completa con arreglo de barba incluido.",
        includes: [
          "Corte de cabello",
          "Arreglo y cera para barba",
          "Mascarilla de puntos negros",
          "Lavado con shampoo y acondicionador",
          "Masaje capilar",
          "Peinado con cera a preferencia",
          "Aplicación de serum hidratante facial",
          "Masaje en hombros",
          "Snack",
        ],
      },
    ],
  },
  {
    id: "adicionales",
    title: "Servicios adicionales",
    services: [
      {
        id: "perfilado-cejas",
        name: "Perfilado de cejas",
        price: 3000,
        duration: 10,
        description: "Definición y limpieza de cejas.",
      },
      {
        id: "cera-nariz",
        name: "Cera en la nariz",
        price: 8000,
        duration: 10,
        description: "Depilación con cera de vellos de la nariz.",
        examples: [
          { type: "photo", src: "/example-cera-nariz-video-poster.jpg" },
        ],
      },
      {
        id: "mascarilla-puntos-negros",
        name: "Mascarilla puntos negros",
        price: 5000,
        duration: 15,
        description: "Mascarilla facial para limpiar puntos negros.",
        examples: [{ type: "photo", src: "/example-mascarilla.jpg" }],
      },
    ],
  },
];

export const ALL_SERVICES: Service[] = SERVICE_CATEGORIES.flatMap(
  (c) => c.services
);

export function getServiceById(id: string): Service | null {
  return ALL_SERVICES.find((s) => s.id === id) ?? null;
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: "cabello",
    title: "Cuidado del cabello",
    description: "Para mantener el corte en casa entre visita y visita.",
    items: [
      {
        name: "Shampoo",
        brands: ["Nativo's"],
        photos: [
          {
            src: "/product-shampoo-nativos.jpg",
            alt: "Shampoo Fortalecedor Nativo's",
          },
        ],
      },
      {
        name: "Cera",
        brands: ["Nativo's", "TecnoStylo"],
        photos: [
          {
            src: "/product-cera-nativos-verde.jpg",
            alt: "Cera Vibrante Nativo's",
          },
          {
            src: "/product-cera-nativos-gold.jpg",
            alt: "Cera Capilar Nativo's Gold",
          },
          {
            src: "/product-cera-nativos-platinum.jpg",
            alt: "Cera Capilar Nativo's Platinum",
          },
          {
            src: "/product-cera-nativos-reds.jpg",
            alt: "Cera Vibrante Nativo's Red's",
          },
          {
            src: "/product-cera-tecnostylo-cbd.jpg",
            alt: "Cera Vibrante CBD TecnoStylo",
          },
          {
            src: "/product-cera-tecnostylo-gold.jpg",
            alt: "Cera Capilar Cremosa Gold TecnoStylo",
          },
          {
            src: "/product-cera-tecnostylo-yellow.jpg",
            alt: "Fuxion Vibrante Yellow TecnoStylo",
          },
          {
            src: "/product-cera-tecnostylo-orange.jpg",
            alt: "Fuxion Vibrante Orange TecnoStylo",
          },
          {
            src: "/product-cera-tecnostylo-coco.jpg",
            alt: "Cera Capilar Cremosa Coco TecnoStylo",
          },
          {
            src: "/product-cera-tecnostylo-blue.jpg",
            alt: "Fuxion Vibrante Blue TecnoStylo",
          },
          {
            src: "/product-pomada-tecnostylo.jpg",
            alt: "Pomada Mate TecnoStylo",
          },
        ],
      },
    ],
  },
  {
    id: "barba",
    title: "Cuidado de la barba",
    description: "Para una barba prolija todos los días.",
    items: [
      {
        name: "Pomada",
        brands: ["Nativo's"],
        photos: [
          {
            src: "/product-pomada-nativos.jpg",
            alt: "Pomada Vibrante para la Barba Nativo's",
          },
        ],
      },
      {
        name: "Cepillo para barba",
        brands: [],
        photos: [
          {
            src: "/product-cepillo-barba.jpg",
            alt: "Cepillo para Barba",
          },
        ],
      },
      {
        name: "Minoxidil",
        brands: ["Kirkland"],
        photos: [
          {
            src: "/product-minoxidil-derma-roller.jpg",
            alt: "Minoxidil Kirkland y Derma Roller",
          },
        ],
      },
      {
        name: "Derma Roller",
        brands: [],
        photos: [
          {
            src: "/product-minoxidil-derma-roller.jpg",
            alt: "Minoxidil Kirkland y Derma Roller",
          },
        ],
      },
    ],
  },
  {
    id: "lociones",
    title: "Lociones",
    description: "Esencias inspiradas en las fragancias más reconocidas.",
    items: [
      {
        name: "Esencias y perfumes",
        brands: [
          "Lacoste",
          "Paco Rabanne",
          "Louis Vuitton",
          "Carolina Herrera",
          "Giorgio Armani",
          "Montale Paris",
          "Chanel",
          "Al Haramain",
          "Orientica",
        ],
        photos: [
          {
            src: "/product-lociones-quality.jpg",
            alt: "Fragancias disponibles en la barbería",
          },
        ],
      },
    ],
  },
];

export const CONDICIONES = [
  "Si necesita cancelar o reprogramar su cita, comuníquese directamente con quien lo va a atender.",
  "Si no puede asistir, agradecemos cancelar con al menos 2 horas de anticipación.",
  "Si no asiste a su cita y no la cancela con el tiempo establecido, se aplicará un cargo por inasistencia de $5.000.",
  "Se otorgará un tiempo de espera de 15 minutos. Transcurrido este tiempo, la cita podrá ser cancelada o reasignada a otro cliente.",
  "Si llega después de la hora acordada, el servicio podrá ajustarse al tiempo disponible para no afectar las citas posteriores.",
  "Al agendar una cita, el cliente acepta estas condiciones.",
];

export const SERVICE_NOTE =
  "Todos los cortes incluyen, a opción del cliente: perfilado de cejas, corte de pelitos largos de cejas, eliminación de vellos en orejas y peinado.";

// Helpers
export function formatCOP(val: number): string {
  return val.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });
}

export function formatServicePrice(service: Service, quantity: number = 1): string {
  if (service.priceMax) {
    return `${formatCOP(service.price * quantity)} – ${formatCOP(
      service.priceMax * quantity
    )}`;
  }
  return formatCOP(service.price * quantity);
}

export function oficioDelServicio(serviceId: string): string {
  const cat = SERVICE_CATEGORIES.find((c) =>
    c.services.some((s) => s.id === serviceId)
  );
  return cat?.oficio ?? "barberia";
}

export function barberosParaServicio(serviceId: string): Barber[] {
  const s = getServiceById(serviceId);
  const barbers = BARBERS.filter((b) => b.id !== "cualquiera");
  if (s?.equipo) {
    return barbers.filter((b) => s.equipo!.includes(b.id));
  }
  const oficio = oficioDelServicio(serviceId);
  return barbers.filter((b) => (b.oficios ?? ["barberia"]).includes(oficio));
}

export function equipoParaServicios(serviceIds: string[]): Barber[] {
  if (serviceIds.length === 0) return [];
  const primaryBarbers = barberosParaServicio(serviceIds[0]);
  return primaryBarbers.filter((b) =>
    serviceIds.every((id) =>
      barberosParaServicio(id).some((match) => match.id === b.id)
    )
  );
}

export function resumenServicios(serviceIds: string[], quantity: number = 1) {
  const servicios = serviceIds
    .map(getServiceById)
    .filter((s): s is Service => s !== null);
  const duracion = servicios.reduce((acc, s) => acc + s.duration, 0) * quantity;
  const precioMin = servicios.reduce((acc, s) => acc + s.price, 0) * quantity;
  const precioMax =
    servicios.reduce((acc, s) => acc + (s.priceMax ?? s.price), 0) * quantity;
  const hayRango = precioMin !== precioMax;
  const etiqueta = hayRango
    ? `${formatCOP(precioMin)} – ${formatCOP(precioMax)}`
    : formatCOP(precioMin);

  return {
    servicios,
    nombre: servicios.map((s) => s.name).join(" + "),
    duracion,
    precioMin,
    precioMax,
    hayRango,
    etiqueta,
  };
}
