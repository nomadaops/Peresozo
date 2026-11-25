import { Resend } from "resend";

export const dynamic = "force-dynamic";

const TO = "theperezosocompanycr@gmail.com";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

type Item = {
  name: string;
  size: string;
  qty: number;
  line: string;
};

type Body = {
  name: string;
  phone: string;
  address: string;
  items: Item[];
  total: string;
};

function validate(b: Body): string | null {
  if (!b.name?.trim() || b.name.trim().length < 2)
    return "Falta el nombre.";
  if (!b.phone?.trim() || b.phone.replace(/\D/g, "").length < 8)
    return "Teléfono inválido.";
  if (!b.address?.trim()) return "Falta la dirección.";
  if (!b.items?.length) return "No hay productos en el pedido.";
  return null;
}

function buildHtml(b: Body): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 12px;font-weight:600;color:#202916;vertical-align:top;white-space:nowrap">${label}</td><td style="padding:6px 12px;color:#333">${value}</td></tr>`;

  const itemRows = b.items
    .map(
      (it) =>
        `<tr>
          <td style="padding:6px 12px;color:#333">${it.name}</td>
          <td style="padding:6px 12px;color:#333;text-align:center">${it.size}</td>
          <td style="padding:6px 12px;color:#333;text-align:center">${it.qty}</td>
          <td style="padding:6px 12px;color:#333;text-align:right">${it.line}</td>
        </tr>`
    )
    .join("");

  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#202916;padding:20px 24px">
        <h1 style="margin:0;font-size:18px;color:#FCF2D9;letter-spacing:0.08em">PEREZOSO — Nuevo pedido</h1>
      </div>
      <div style="padding:20px 24px;background:#FAF5E8">
        <p style="margin:0 0 6px;font-size:13px;color:#F06A1D;font-weight:700;text-transform:uppercase;letter-spacing:0.12em">Pedido desde la web</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;margin-top:12px">
          ${row("Cliente", b.name)}
          ${row("Teléfono", b.phone)}
          ${row("Dirección", b.address)}
        </table>

        <table style="width:100%;border-collapse:collapse;font-size:14px;margin-top:18px">
          <thead>
            <tr style="border-bottom:2px solid #202916">
              <th style="padding:6px 12px;text-align:left;color:#202916;font-size:11px;text-transform:uppercase;letter-spacing:0.1em">Producto</th>
              <th style="padding:6px 12px;text-align:center;color:#202916;font-size:11px;text-transform:uppercase;letter-spacing:0.1em">Talla</th>
              <th style="padding:6px 12px;text-align:center;color:#202916;font-size:11px;text-transform:uppercase;letter-spacing:0.1em">Cant</th>
              <th style="padding:6px 12px;text-align:right;color:#202916;font-size:11px;text-transform:uppercase;letter-spacing:0.1em">Precio</th>
            </tr>
          </thead>
          <tbody>
            ${itemRows}
          </tbody>
          <tfoot>
            <tr style="border-top:2px solid #202916">
              <td colspan="3" style="padding:10px 12px;font-weight:700;color:#202916;text-align:right;text-transform:uppercase;letter-spacing:0.08em;font-size:13px">Total</td>
              <td style="padding:10px 12px;font-weight:700;color:#F06A1D;text-align:right;font-size:16px">${b.total}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div style="background:#202916;padding:14px 24px;text-align:center">
        <span style="font-size:11px;color:#FCF2D980;letter-spacing:0.14em;text-transform:uppercase">perezoso.cr · ni lentos ni perezosos</span>
      </div>
    </div>`;
}

export async function POST(request: Request) {
  try {
    const body: Body = await request.json();

    const err = validate(body);
    if (err) return Response.json({ error: err }, { status: 400 });

    const subject = `[Web] Nuevo pedido — ${body.name}`;

    await getResend().emails.send({
      from: "Perezoso Web <onboarding@resend.dev>",
      to: TO,
      subject,
      html: buildHtml(body),
    });

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "No se pudo enviar el pedido. Intentá de nuevo." },
      { status: 500 },
    );
  }
}
