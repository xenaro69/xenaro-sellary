// Xenaro Sellary Webhook
export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    console.log("SELLARY WEBHOOK RECEIVED");
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);

    return res.status(200).json({
        success: true,
        message: "Webhook received"
    });
}
