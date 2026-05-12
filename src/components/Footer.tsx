interface FooterProps {
  description: string;
  phone: string;
  email: string;
  address: string;
  social: { linkedin: string; twitter: string };
  siteName: string;
  siteSubtitle: string;
  logo: string;
  legalName: string;
}

export default function Footer({ description, phone, email, address, siteName, siteSubtitle, logo, legalName }: FooterProps) {
  const initials = siteName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <footer className="bg-navy-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 mb-10 sm:mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              {logo ? (
                <img src={logo} alt={siteName} className="w-10 h-10 object-contain rounded" />
              ) : (
                <div className="w-10 h-10 bg-gold-500 rounded flex items-center justify-center">
                  <span className="text-navy-900 font-serif font-bold">{initials}</span>
                </div>
              )}
              <div>
                <p className="text-sm font-serif font-semibold text-white">{siteName}</p>
                <p className="text-[8px] text-gold-500 tracking-[3px] uppercase">{siteSubtitle}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {[
                { label: "Servicios", href: "#servicios" },
                { label: "Nosotros", href: "#nosotros" },
                { label: "Equipo", href: "#equipo" },
                { label: "Contacto", href: "#contacto" },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-gray-500 hover:text-gold-500 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-balance">{address}</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gold-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                {phone}
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gold-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                {email}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600 text-center sm:text-left">
            &copy; {new Date().getFullYear()} {legalName}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
