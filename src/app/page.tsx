import { SiteProvider } from "@/components/site-provider";
import { Nav } from "@/components/home/nav";
import { Hero } from "@/components/home/hero";
import { Statement } from "@/components/home/statement";
import { Categories } from "@/components/home/categories";
import { Apartado } from "@/components/home/apartado";
import { Editorial } from "@/components/home/editorial";
import { Values } from "@/components/home/values";
import { Ticker } from "@/components/home/ticker";
import { Faq } from "@/components/home/faq";
import { Philosophy } from "@/components/home/philosophy";
import { GlitchBand } from "@/components/home/glitch-band";
import { Gallery } from "@/components/home/gallery";
import { CtaMarketplace } from "@/components/home/cta-marketplace";
import { Footer } from "@/components/home/footer";
import { MobileMenu } from "@/components/home/mobile-menu";
import { CartDrawer } from "@/components/home/cart-drawer";
import { OrderFormModal } from "@/components/home/order-form-modal";
import { AdminLoginModal } from "@/components/home/admin-login-modal";
import { Lightbox } from "@/components/home/lightbox";

export default function HomePage() {
  return (
    <SiteProvider>
      <div className="relative overflow-x-hidden bg-forest text-cream">
        <Nav />
        <Hero />
        <Statement />
        <Categories />
        <Apartado />
        <Editorial />
        <Values />
        <Ticker />
        <Faq />
        <Philosophy />
        <GlitchBand />
        <Gallery />
        <CtaMarketplace />
        <Footer />

        <MobileMenu />
        <CartDrawer />
        <OrderFormModal />
        <AdminLoginModal />
        <Lightbox />
      </div>
    </SiteProvider>
  );
}
