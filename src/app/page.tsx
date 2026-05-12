import { getContent } from "@/lib/content";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import StatsSection from "@/components/StatsSection";
import AboutSection from "@/components/AboutSection";
import TeamSection from "@/components/TeamSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const content = await getContent();

  return (
    <>
      <Navbar siteName={content.site.name} siteSubtitle={content.site.subtitle} logo={content.site.logo} whatsapp={content.contact.whatsapp} />
      <HeroSection
        title={content.hero.title}
        subtitle={content.hero.subtitle}
        ctaPrimary={content.hero.cta_primary}
        ctaSecondary={content.hero.cta_secondary}
        backgroundImage={content.hero.background_image}
        cards={content.hero.cards}
      />
      <ServicesSection
        title={content.services.title}
        subtitle={content.services.subtitle}
        items={content.services.items}
      />
      <StatsSection items={content.stats.items} />
      <AboutSection
        title={content.about.title}
        description={content.about.description}
        mission={content.about.mission}
        vision={content.about.vision}
        image={content.about.image}
        values={content.about.values}
      />
      <TeamSection
        title={content.team.title}
        subtitle={content.team.subtitle}
        members={content.team.members}
      />
      <TestimonialsSection
        title={content.testimonials.title}
        items={content.testimonials.items}
      />
      <ContactSection
        title={content.contact.title}
        subtitle={content.contact.subtitle}
        address={content.contact.address}
        phone={content.contact.phone}
        email={content.contact.email}
        hours={content.contact.hours}
      />
      <Footer
        description={content.footer.description}
        phone={content.contact.phone}
        email={content.contact.email}
        address={content.contact.address}
        social={content.footer.social}
        siteName={content.site.name}
        siteSubtitle={content.site.subtitle}
        logo={content.site.logo}
        legalName={content.site.legal_name}
      />
      <ChatWidget />
    </>
  );
}
