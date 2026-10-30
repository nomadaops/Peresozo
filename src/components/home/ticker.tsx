export function Ticker() {
  const text = "Estilo ✦ Comodidad ✦ Determinación ✦ Estilo ✦ Comodidad ✦ Determinación ✦ Estilo ✦ Comodidad ✦ Determinación ✦";
  return (
    <div className="overflow-hidden bg-orange py-[11px] whitespace-nowrap text-forest">
      <div className="inline-flex animate-[tick_30s_linear_infinite] gap-[34px] text-[12px] font-extrabold tracking-[.26em] uppercase">
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
}
