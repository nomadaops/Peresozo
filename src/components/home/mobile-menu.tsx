"use client";

import { InkMobileMenu } from "@/components/shared/ink-mobile-menu";
import { useSite } from "@/components/site-provider";

export function MobileMenu() {
  const { menu, toggleMenu, waPlain } = useSite();
  return <InkMobileMenu open={menu} onClose={toggleMenu} active="" waPlain={waPlain} tone="forest" />;
}
