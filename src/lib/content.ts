import { getSupabaseAdmin } from "./supabase";

const TABLE = "site_content";

export interface HeroCard {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface SiteContent {
  site: { name: string; subtitle: string; logo: string; favicon: string; legal_name: string };
  hero: {
    title: string;
    subtitle: string;
    cta_primary: { text: string; link: string };
    cta_secondary: { text: string; link: string };
    background_image: string;
    cards: HeroCard[];
  };
  services: {
    title: string;
    subtitle: string;
    items: ServiceItem[];
  };
  about: {
    title: string;
    description: string;
    mission: string;
    vision: string;
    image: string;
    values: { title: string; description: string }[];
  };
  stats: {
    items: { value: number; suffix: string; label: string }[];
  };
  team: {
    title: string;
    subtitle: string;
    members: TeamMember[];
  };
  testimonials: {
    title: string;
    items: { text: string; author: string; company: string }[];
  };
  contact: {
    title: string;
    subtitle: string;
    address: string;
    phone: string;
    email: string;
    hours: string;
    whatsapp: string;
    map_lat: number;
    map_lng: number;
  };
  clients: {
    title: string;
    logos: { name: string; logo: string }[];
  };
  footer: {
    description: string;
    social: { linkedin: string; twitter: string };
  };
  admin: {
    email: string;
    password: string;
    token?: string;
  };
  chat: {
    api_key: string;
    model: string;
    enabled: boolean;
    greeting: string;
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
}

const defaultContent: SiteContent = {
  site: { name: "ABG Abogados", subtitle: "ABG Estudio Jurídico", logo: "", favicon: "", legal_name: "ABG Abogados" },
  hero: {
    title: "Excelencia Jurídica,<br/>Compromiso Absoluto",
    subtitle: "Más de 25 años asesorando a empresas y particulares con integridad, precisión y dedicación inquebrantable.",
    cta_primary: { text: "Solicitar Asesoría", link: "#contacto" },
    cta_secondary: { text: "Conócenos", link: "#nosotros" },
    background_image: "/images/hero-bg.jpg",
    cards: [],
  },
  services: { title: "Áreas de Práctica", subtitle: "", items: [] },
  about: { title: "Sobre Nosotros", description: "", mission: "", vision: "", image: "", values: [] },
  stats: { items: [] },
  team: { title: "Nuestro Equipo", subtitle: "", members: [] },
  testimonials: { title: "Lo Que Dicen Nuestros Clientes", items: [] },
  contact: { title: "Contáctenos", subtitle: "", address: "", phone: "", email: "", hours: "", whatsapp: "", map_lat: 0, map_lng: 0 },
  clients: { title: "Confían en Nosotros", logos: [] },
  footer: { description: "", social: { linkedin: "", twitter: "" } },
  admin: { email: "admin@abgabogados.cl", password: "admin" },
  chat: { api_key: "", model: "gemini-2.5-flash-lite", enabled: true, greeting: "" },
};

export async function getContent(): Promise<SiteContent> {
  try {
    const { data, error } = await getSupabaseAdmin()
      .from(TABLE)
      .select("data")
      .eq("id", 1)
      .single();

    if (error || !data) {
      console.warn("Supabase fetch failed, using defaults:", error?.message);
      return defaultContent;
    }

    return data.data as SiteContent;
  } catch (err) {
    console.warn("Supabase fetch error, using defaults:", err);
    return defaultContent;
  }
}

export async function saveContent(content: SiteContent): Promise<void> {
  // Preserve auth token if incoming content doesn't have one
  if (!content.admin.token) {
    const existing = await getContent();
    if (existing.admin.token) {
      content.admin.token = existing.admin.token;
    }
  }

  const { error } = await getSupabaseAdmin()
    .from(TABLE)
    .upsert({ id: 1, data: content, updated_at: new Date().toISOString() });

  if (error) {
    throw new Error(`Error saving content: ${error.message}`);
  }
}
