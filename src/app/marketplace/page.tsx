"use client";

import { MarketplaceProvider, useMarket } from "@/components/marketplace/marketplace-provider";
import { MarketNav } from "@/components/marketplace/nav";
import { MarketHeroIntro } from "@/components/marketplace/hero-intro";
import { MarketControls } from "@/components/marketplace/controls";
import { MarketProductGrid } from "@/components/marketplace/product-grid";
import { MarketShippingNote } from "@/components/marketplace/shipping-note";
import { MarketProductDetail } from "@/components/marketplace/product-detail";
import { MarketFooter } from "@/components/marketplace/footer";
import { MarketCartDrawer } from "@/components/marketplace/cart-drawer";
import { MarketOrderFormModal } from "@/components/marketplace/order-form-modal";
import { MarketToast } from "@/components/marketplace/toast";
import { InkMobileMenu } from "@/components/shared/ink-mobile-menu";

function MarketplaceView() {
  const { view, menu, closeMenu, waPlain } = useMarket();

  return (
    <div className="relative min-h-screen overflow-x-clip bg-cream text-ink">
      <MarketNav />

      {view === "grid" ? (
        <main id="top">
          <MarketHeroIntro />
          <MarketControls />
          <MarketProductGrid />
          <MarketShippingNote />
        </main>
      ) : (
        <MarketProductDetail />
      )}

      <MarketFooter />

      <InkMobileMenu open={menu} onClose={closeMenu} active="Marketplace" waPlain={waPlain} />
      <MarketCartDrawer />
      <MarketOrderFormModal />
      <MarketToast />
    </div>
  );
}

export default function MarketplacePage() {
  return (
    <MarketplaceProvider>
      <MarketplaceView />
    </MarketplaceProvider>
  );
}
