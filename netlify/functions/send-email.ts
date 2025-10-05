import { Resend } from "resend";

export const handler = async (event: { httpMethod: string; body: string | null }) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Body is required" }),
    };
  }

  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Missing RESEND_API_KEY environment variable" }),
      };
    }

    const resend = new Resend(apiKey);

    const { name, email, message } = JSON.parse(event.body);

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing fields" }),
      };
    }

    const response = await resend.emails.send({
      from: "Portafolio <onboarding@resend.dev>",
      to: "garancibiacl@gmail.com",
      reply_to: email,
      subject: `Nuevo mensaje de ${name}`,
      text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    };
  } catch (error) {
    console.error("Resend error", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to send email",
        details: error instanceof Error ? error.message : String(error),
      }),
    };
  }
};
