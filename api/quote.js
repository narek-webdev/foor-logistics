const nodemailer = require("nodemailer");
const isEmail = (value) =>
  typeof value === "string" &&
  value.length <= 254 &&
  /^[^\s<>@,;]+@[^\s<>@,;]+\.[^\s<>@,;]+$/.test(value);

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  const fail = (status, error) => res.status(status).json({ error });
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return fail(405, "Use POST to submit a quote.");
  }

  const { SMTP_USER, SMTP_APP_PASSWORD, QUOTE_TO, QUOTE_ORIGIN } = process.env;
  const recipients = (QUOTE_TO || "").split(",").map((address) => address.trim());
  if (
    !isEmail(SMTP_USER) ||
    !SMTP_APP_PASSWORD ||
    !recipients.every(isEmail) ||
    !QUOTE_ORIGIN
  ) {
    return fail(
      503,
      "Quote requests are temporarily unavailable. Please contact our team by email.",
    );
  }
  // Require the configured website origin; never accept a client-selected recipient.
  if (req.headers.origin !== QUOTE_ORIGIN)
    return fail(403, "Please submit your request from our website.");
  if (
    req.headers["content-type"]?.split(";")[0].trim() !== "application/json"
  ) {
    return fail(415, "Expected a JSON request.");
  }
  let data = req.body;
  if (typeof data === "string") {
    if (Buffer.byteLength(data) > 16000)
      return fail(413, "Request is too large.");
    try {
      data = JSON.parse(data);
    } catch {
      return fail(400, "Invalid request.");
    }
  }
  if (!data || typeof data !== "object" || Array.isArray(data))
    return fail(400, "Invalid request.");
  if (Buffer.byteLength(JSON.stringify(data)) > 16000)
    return fail(413, "Request is too large.");
  if (data.website) return fail(400, "Unable to submit this request.");
  const limits = {
    name: 100,
    email: 254,
    notes: 2000,
    service: 100,
  };
  for (const [field, limit] of Object.entries(limits)) {
    if (typeof data[field] !== "string" || data[field].length > limit)
      return fail(400, "Please check your quote details.");
  }
  const { name, email, notes, service } = Object.fromEntries(
    Object.keys(limits).map((key) => [key, data[key].trim()]),
  );
  const phone = typeof data.phone === "string" ? data.phone : "";
  if (!name || /[\r\n\x00]/.test(name + service) || !isEmail(email)) {
    return fail(400, "Enter your name and a valid email.");
  }
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: SMTP_USER, pass: SMTP_APP_PASSWORD.replace(/\s/g, "") },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
  });
  try {
    const sent = await transport.sendMail({
      from: { name: "FOOR Logistics", address: SMTP_USER },
      to: [...new Set(recipients)],
      replyTo: { name, address: email },
      subject: "New freight quote request",
      text: `FOOR LOGISTICS — FREIGHT QUOTE REQUEST\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\n${service ? `Service: ${service}\n` : ""}\nQuote info:\n${notes || "None provided"}\n`,
      disableFileAccess: true,
      disableUrlAccess: true,
    });

    if (!sent.accepted?.length) throw new Error("No accepted recipient");
    return res.status(200).json({ ok: true });
  } catch {
    // Do not log contact information or SMTP credentials.
    console.error("Quote email failed to send.");
    return fail(
      502,
      "We could not confirm your request was sent. Please try again or contact our team by email.",
    );
  } finally {
    transport.close();
  }
};
