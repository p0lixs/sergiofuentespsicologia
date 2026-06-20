type ContactRequest = {
  method?: string;
  body?: unknown;
  headers: Record<string, string | string[] | undefined>;
};

type ContactResponse = {
  status: (code: number) => ContactResponse;
  json: (body: unknown) => void;
};

type ContactPayload = {
  name?: unknown;
  surname?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  website?: unknown;
};

const DESTINATION_EMAIL = "hola@sergiofuentespsicologia.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clean = (value: unknown, maxLength: number) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

export default async function handler(
  request: ContactRequest,
  response: ContactResponse,
) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Método no permitido." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL ??
    "Sergio Fuentes Psicología <solicitudes@sergiofuentespsicologia.com>";

  if (!apiKey) {
    console.error("RESEND_API_KEY no está configurada.");
    return response.status(500).json({
      error: "El servicio de correo no está configurado.",
    });
  }

  const payload = (request.body ?? {}) as ContactPayload;

  // Campo trampa invisible para reducir envíos automatizados.
  if (clean(payload.website, 200)) {
    return response.status(200).json({ ok: true });
  }

  const name = clean(payload.name, 80);
  const surname = clean(payload.surname, 120);
  const email = clean(payload.email, 254).toLowerCase();
  const phone = clean(payload.phone, 40);
  const message = clean(payload.message, 3000);

  if (!name || !surname || !phone || !message || !EMAIL_PATTERN.test(email)) {
    return response.status(400).json({
      error: "Revisa los campos obligatorios del formulario.",
    });
  }

  const fullName = `${name} ${surname}`;
  const subject = `${fullName} - Solicitud sesión online`;
  const text = [
    "Nueva solicitud de sesión online",
    "",
    `Nombre: ${fullName}`,
    `Email: ${email}`,
    `Teléfono: ${phone}`,
    "",
    "Mensaje:",
    message,
  ].join("\n");

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [DESTINATION_EMAIL],
      reply_to: email,
      subject,
      text,
      html: `
        <div style="font-family:Arial,sans-serif;color:#443451;line-height:1.6">
          <h2>Nueva solicitud de sesión online</h2>
          <p><strong>Nombre:</strong> ${escapeHtml(fullName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Teléfono:</strong> ${escapeHtml(phone)}</p>
          <p><strong>Mensaje:</strong></p>
          <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
        </div>
      `,
    }),
  });

  if (!resendResponse.ok) {
    const details = await resendResponse.text();
    console.error("Error enviando correo con Resend:", details);
    return response.status(502).json({
      error: "No se ha podido enviar la solicitud. Inténtalo de nuevo.",
    });
  }

  return response.status(200).json({ ok: true });
}
