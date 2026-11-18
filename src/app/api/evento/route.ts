import { Resend } from "resend";

export const dynamic = "force-dynamic";

const TO = "theperezosocompanycr@gmail.com";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

type Body = {
  type: string;
  company: string;
  contact: string;
  email: string;
  phone: string;
  date?: string;
  people?: string;
  notes?: string;
};

function validate(b: Body): string | null {
  if (!b.type) return "Falta el tipo de evento.";
  if (!b.company?.trim() || b.company.trim().length < 2)
    return "Falta la empresa.";
  if (!b.contact?.trim() || b.contact.trim().length < 3)
    return "Falta la persona de contacto.";
  if (!b.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email.trim()))
    return "Correo inválido.";
  if (!b.phone?.trim() || b.phone.replace(/\D/g, "").length < 8)
    return "Teléfono inválido.";
  return null;
}

function buildHtml(b: Body): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 12px;font-weight:600;color:#202916;vertical-align:top;white-space:nowrap">${label}</td><td style="padding:6px 12px;color:#333">${value}</td></tr>`;

  let rows = "";
  rows += row("Tipo de evento", b.type);
  rows += row("Empresa", b.company);
  rows += row("Contacto", b.contact);
  rows += row("Correo", `<a href="mailto:${b.email}">${b.email}</a>`);
  rows += row("Teléfono", b.phone);
  rows += row("Fecha", b.date || "Por definir");
  rows += row("Personas", b.people || "—");
  if (b.notes) rows += row("Detalles", b.notes.replace(/\n/g, "<br>"));

  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#202916;padding:20px 24px">
        <h1 style="margin:0;font-size:18px;color:#FCF2D9;letter-spacing:0.08em">PEREZOSO — Evento privado</h1>
      </div>
      <div style="padding:20px 24px;background:#FAF5E8">
        <p style="margin:0 0 6px;font-size:13px;color:#F06A1D;font-weight:700;text-transform:uppercase;letter-spacing:0.12em">${b.type}</p>
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
    const body: Body = await request.json();

    const err = validate(body);
    if (err) return Response.json({ error: err }, { status: 400 });

    const subject = `[Web] Evento ${body.type} — ${body.company}`;

    await getResend().emails.send({
      from: "Perezoso Web <onboarding@resend.dev>",
      to: TO,
      replyTo: body.email,
      subject,
      html: buildHtml(body),
    });

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "No se pudo enviar la solicitud. Intentá de nuevo." },
      { status: 500 },
    );
  }
}
