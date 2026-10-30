"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSite } from "@/components/site-provider";

export function AdminLoginModal() {
  const { adminOpen, closeAdminLogin } = useSite();
  const router = useRouter();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  if (!adminOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-5">
      <div onClick={closeAdminLogin} className="absolute inset-0 bg-[#0a0d06]/90 [animation:fade_.2s_ease_both]" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/admin");
        }}
        role="dialog"
        aria-label="Acceso administrador"
        className="relative w-[min(380px,100%)] bg-cream px-[30px] py-[34px] text-forest [animation:riseIn_.25s_ease_both]"
      >
        <button
          type="button"
          onClick={closeAdminLogin}
          aria-label="Cerrar"
          className="absolute top-3.5 right-4 text-[24px] leading-none text-forest/60"
        >
          ×
        </button>
        <div className="mb-2 text-[10px] font-semibold tracking-[.24em] text-orange uppercase">
          Panel administrativo
        </div>
        <h2 className="mb-[22px] font-display text-[34px] leading-none">Iniciar sesión</h2>
        <label className="mb-1.5 block text-[10px] font-bold tracking-[.16em] uppercase">Usuario</label>
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="admin"
          className="mb-3.5 w-full border border-forest/14 bg-white px-3.5 py-3.5 text-[13px] font-medium text-forest"
        />
        <label className="mb-1.5 block text-[10px] font-bold tracking-[.16em] uppercase">Contraseña</label>
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="••••••••"
          className="mb-5 w-full border border-forest/14 bg-white px-3.5 py-3.5 text-[13px] font-medium text-forest"
        />
        <button
          type="submit"
          className="w-full bg-forest py-[15px] text-[11px] font-extrabold tracking-[.2em] text-cream uppercase transition-colors hover:bg-orange hover:text-forest"
        >
          Entrar
        </button>
        <p className="mt-3 text-center text-[10.5px] text-forest/60">
          Mockup — cualquier usuario y contraseña ingresa.
        </p>
      </form>
    </div>
  );
}
