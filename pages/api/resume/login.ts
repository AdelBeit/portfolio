const HARDCODED_OTP = "123456";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { code, remember } = req.body ?? {};

  if (code !== HARDCODED_OTP) {
    return res.status(401).json({ ok: false });
  }

  const isProd = process.env.NODE_ENV === "production";
  const maxAge = remember ? 60 * 60 * 24 * 365 : undefined; // 1 year if remembered, session cookie otherwise
  const cookie = [
    "resume_session=1",
    "HttpOnly",
    "Path=/",
    "SameSite=Lax",
    isProd ? "Secure" : null,
    maxAge ? `Max-Age=${maxAge}` : null,
  ]
    .filter(Boolean)
    .join("; ");

  res.setHeader("Set-Cookie", cookie);
  return res.status(200).json({ ok: true });
}
