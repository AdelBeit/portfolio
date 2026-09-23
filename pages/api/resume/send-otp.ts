export default function handler(req, res) {
   console.warn('clicked send otp');
   res.status(200).json({ ok: true });
}