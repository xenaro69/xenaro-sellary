import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({
      success: true,
      message: "Xenaro Sellary webhook is running"
    });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const secret = process.env.SELLARY_WEBHOOK_SECRET;
  const signature = req.headers["x-sellary-signature"];

  if (!secret || !signature) {
    return res.status(401).json({ error: "Missing signature" });
  }

  // Re-create the payload Sellary signed
  const payload =
    typeof req.body === "string"
      ? req.body
      : JSON.stringify(req.body);

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  const valid =
    signature.length === expectedSignature.length &&
    crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );

  if (!valid) {
    return res.status(401).json({ error: "Invalid signature" });
  }

  // Temporary: log the payload so we can learn Sellary's exact structure
  console.log("SELLARY VERIFIED WEBHOOK:", req.body);

  return res.status(200).json({
    success: true,
    message: "Verified Sellary webhook received"
  });
}
