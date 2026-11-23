import { Resend } from "resend";

export const dynamic = "force-dynamic";

const TO = process.env.RESEND_TO || "theperezosocompanycr@gmail.com";
const FROM = process.env.RESEND_FROM || "Perezoso Web <onboarding@resend.dev>";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

type Body = {
  topic: string;
  nombre: string;
  email: string;
  tel: string;
  provincia: string;
  mensaje?: string;
  infoProducto?: string;
  edicion?: string;
  talla?: string;
  precio?: string;
  adelanto?: string;
  envio?: string;
  ubicacion?: string;
  otro?: string;
};

function validate(b: Body): string | null {
  if (!b.nombre?.trim()) return "Falta el nombre.";
  if (!b.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(b.email))
    return "Correo inválido.";
  if (!b.tel?.trim() || b.tel.replace(/\D/g, "").length < 8)
    return "Teléfono inválido.";
  if (!b.provincia) return "Falta la provincia.";
  return null;
}

function buildHtml(b: Body): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 12px;font-weight:600;color:#202916;vertical-align:top;white-space:nowrap">${label}</td><td style="padding:6px 12px;color:#333">${value}</td></tr>`;

  let rows = "";
  rows += row("Motivo", b.topic);
  rows += row("Nombre", b.nombre);
  rows += row("Correo", `<a href="mailto:${b.email}">${b.email}</a>`);
  rows += row("Teléfono", b.tel);
  rows += row("Provincia", b.provincia);

  if (b.topic === "Información sobre un producto" && b.infoProducto) {
    rows += row("Producto", b.infoProducto);
  }

  if (b.topic === "Quiero hacer un pedido") {
    if (b.edicion) rows += row("Producto", b.edicion);
    if (b.talla) rows += row("Talla", b.talla);
    if (b.precio) rows += row("Precio", b.precio);
    if (b.adelanto) rows += row("Adelanto 50%", b.adelanto);
    if (b.envio) rows += row("Envío", b.envio);
    if (b.ubicacion) rows += row("Ubicación", b.ubicacion);
  }

  if (b.otro) rows += row("Otra combinación", b.otro);
  if (b.mensaje) rows += row("Mensaje", b.mensaje.replace(/\n/g, "<br>"));

  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#202916;padding:20px 24px">
        <h1 style="margin:0;font-size:18px;color:#FCF2D9;letter-spacing:0.08em">PEREZOSO — Nuevo contacto</h1>
      </div>
      <div style="padding:20px 24px;background:#FAF5E8">
        <p style="margin:0 0 6px;font-size:13px;color:#F06A1D;font-weight:700;text-transform:uppercase;letter-spacing:0.12em">${b.topic}</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;margin-top:12px">
          ${rows}
        </table>
      </div>
      <div style="background:#202916;padding:14px 24px;text-align:center">
        <span style="font-size:11px;color:#FCF2D980;letter-spacing:0.14em;text-transform:uppercase">perezoso.cr · ni lentos ni perezosos</span>
      </div>
    </div>`;
}

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return Response.json(
        { error: "El servicio de correo no está configurado." },
        { status: 503 },
      );
    }

    const body: Body = await request.json();

    const err = validate(body);
    if (err) return Response.json({ error: err }, { status: 400 });

    const subjectMap: Record<string, string> = {
      "Consulta general": "Consulta general",
      "Quiero hacer un pedido": "Nuevo pedido",
      "Información sobre un producto": "Info de producto",
      Colaboraciones: "Colaboración",
      Otro: "Otro",
    };
    const subject = `[Web] ${subjectMap[body.topic] || body.topic} — ${body.nombre}`;

    await getResend().emails.send({
      from: FROM,
      to: TO,
      replyTo: body.email,
      subject,
      html: buildHtml(body),
    });

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "No se pudo enviar el mensaje. Intentá de nuevo." },
      { status: 500 },
    );
  }
}
