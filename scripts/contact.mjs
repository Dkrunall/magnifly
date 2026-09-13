import nodemailer from "nodemailer";
import { z } from "zod";
const schema = z.object({
  name: z.string().trim().min(2).max(100), email: z.email().max(254),
  company: z.string().trim().min(2).max(150), website: z.string().max(500).optional(),
  services: z.array(z.string().max(80)).min(1).max(8), budget: z.string().min(1).max(100),
  timeline: z.string().min(1).max(100), description: z.string().trim().min(20).max(5000),
});
const attempts = new Map();
export function createContactHandler({ env = process.env, sendMail } = {}) {
  return async (req, res) => {
    const reply = (code, message) => { res.writeHead(code, { "Content-Type": "application/json", "Cache-Control": "no-store" }); res.end(JSON.stringify({ message })); };
    if (req.method !== "POST") return reply(405, "Use POST.");
    if (req.headers.origin && req.headers.origin !== (env.CONTACT_ORIGIN || `http://${req.headers.host}`)) return reply(403, "This origin is not allowed.");
    if (!req.headers["content-type"]?.startsWith("application/json")) return reply(415, "Use JSON.");
    const now = Date.now();
    for (const [key, value] of attempts) if (now - value.time > 600000) attempts.delete(key);
    const ip = req.socket.remoteAddress || "unknown";
    const count = attempts.get(ip) || { time: now, count: 0 };
    if (count.count >= 5) return reply(429, "Please wait ten minutes before trying again.");
    count.count++; attempts.set(ip, count);
    let body = "";
    try {
      for await (const chunk of req) { body += chunk; if (Buffer.byteLength(body) > 20000) return reply(413, "Your inquiry is too large."); }
      const data = schema.safeParse(JSON.parse(body));
      if (!data.success) return reply(400, "Please check the required fields.");
      if (!sendMail && ![env.SMTP_HOST, env.SMTP_USER, env.SMTP_PASS, env.CONTACT_FROM, env.CONTACT_TO].every(Boolean)) return reply(503, "Email delivery is not configured yet. Your inquiry has not been sent.");
      const value = data.data;
      const transport = sendMail ? null : nodemailer.createTransport({ host: env.SMTP_HOST, port: Number(env.SMTP_PORT || 587), secure: env.SMTP_PORT === "465", auth: { user: env.SMTP_USER, pass: env.SMTP_PASS }, connectionTimeout: 10000, socketTimeout: 15000 });
      const message = { from: env.CONTACT_FROM, to: env.CONTACT_TO, replyTo: value.email, subject: "New MAGNIFLY MEDIA project inquiry", text: Object.entries(value).map(([key, item]) => `${key}: ${Array.isArray(item) ? item.join(", ") : item}`).join("\n\n") };
      const result = await (sendMail ? sendMail(message) : transport.sendMail(message));
      if (!result.accepted?.length) return reply(502, "The mail server did not accept your inquiry. Please try again.");
      return reply(200, "Your inquiry was accepted by our mail server.");
    } catch (error) {
      return reply(error instanceof SyntaxError ? 400 : 502, "Unable to send your inquiry. Your brief is still here; please try again.");
    }
  };
}
