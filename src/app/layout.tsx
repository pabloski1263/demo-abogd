import type { Metadata } from "next";
import "./globals.css";
import { getContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const content = await getContent();
    return {
      title: `${content.site.name} | ${content.site.subtitle}`,
      description: content.hero.subtitle || "Asesoría legal de excelencia.",
      icons: content.site.favicon ? { icon: content.site.favicon } : { icon: "/favicon.ico" },
    };
  } catch {
    return {
      title: "ABG Abogados | Estudio Jurídico",
      description: "Asesoría legal de excelencia.",
      icons: { icon: "/favicon.ico" },
    };
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="min-h-screen bg-navy-900 text-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
