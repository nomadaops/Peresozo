"use client";

import { useState } from "react";
import { useMarket } from "./marketplace-provider";

export function MarketOrderFormModal() {
  const { orderFormOpen, orderSent, closeOrderForm, submitOrder, subtotalLabel } = useMarket();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  if (!orderFormOpen) return null;

  const handleClose = () => {
    closeOrderForm();
    setName("");
    setEmail("");
    setAddress("");
    setPhone("");
    setSubmitError("");
  };

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-5">
      <div onClick={handleClose} className="absolute inset-0 bg-[#0a0d06]/90 [animation:fade_.2s_ease_both]" />
      <div
        role="dialog"
        aria-label="Hacer pedido"
        className="relative max-h-[88vh] w-[min(420px,100%)] overflow-y-auto bg-cream px-[30px] py-[34px] text-ink [animation:riseIn_.25s_ease_both]"
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Cerrar"
          className="absolute top-3.5 right-4 text-[24px] leading-none text-ink/60"
        >
          ×
        </button>

        {orderSent ? (
          <div className="px-0 pt-3.5 pb-1.5 text-center">
            <div className="mb-1.5 font-display text-[20px] tracking-[.02em] text-orange">✓ PEDIDO ENVIADO</div>
            <h2 className="mb-3.5 font-display text-[30px] leading-[1.05]">
              Gracias por realizar el pedido, pronto nos pondremos en contacto contigo.
            </h2>
            <button
              type="button"
              onClick={handleClose}
              className="mt-2.5 w-full bg-ink py-[15px] text-[11px] font-extrabold tracking-[.2em] text-cream uppercase"
            >
              Listo
            </button>
          </div>
        ) : (
          <>
            <div className="mb-2 text-[10px] font-semibold tracking-[.24em] text-orange uppercase">
              Confirmar datos
            </div>
            <h2 className="mb-5 font-display text-[32px] leading-none">Hacer pedido</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setSubmitting(true);
                setSubmitError("");
                const sent = await submitOrder(name, email, address, phone);
                setSubmitting(false);
                if (!sent) setSubmitError("No se pudo enviar el pedido por correo. Intentá de nuevo.");
              }}
            >
              <label className="mb-1.5 block text-[10px] font-bold tracking-[.16em] uppercase">
                Nombre completo *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre y apellido"
                className="mb-3.5 w-full border border-ink/14 bg-white px-3.5 py-3.5 text-[13px] font-medium text-ink"
              />
              <label className="mb-1.5 block text-[10px] font-bold tracking-[.16em] uppercase">
                Correo electrónico *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
                className="mb-3.5 w-full border border-ink/14 bg-white px-3.5 py-3.5 text-[13px] font-medium text-ink"
              />
              <label className="mb-1.5 block text-[10px] font-bold tracking-[.16em] uppercase">Dirección *</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Provincia, cantón, dirección exacta"
                className="mb-3.5 w-full border border-ink/14 bg-white px-3.5 py-3.5 text-[13px] font-medium text-ink"
              />
              <label className="mb-1.5 block text-[10px] font-bold tracking-[.16em] uppercase">Teléfono *</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="8888-8888"
                className="mb-5 w-full border border-ink/14 bg-white px-3.5 py-3.5 text-[13px] font-medium text-ink"
              />
              <div className="mb-4 flex justify-between text-[10.5px] font-semibold tracking-[.16em] text-ink/60 uppercase">
                <span>Subtotal</span>
                <span className="text-[13px] font-bold text-ink">{subtotalLabel}</span>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-ink py-[15px] text-[11px] font-extrabold tracking-[.2em] text-cream uppercase"
              >
                {submitting ? "Enviando..." : "Confirmar pedido"}
              </button>
              {submitError && (
                <p className="mt-3 text-center text-[12px] text-red-700">{submitError}</p>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}
