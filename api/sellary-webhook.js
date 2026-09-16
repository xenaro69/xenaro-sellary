export default function handler(req, res) {
  if (req.method === "POST") {
    return res.status(200).json({
      success: true,
      message: "Sellary webhook received"
    });
  }

  return res.status(200).json({
    success: true,
    message: "Xenaro Sellary API is working"
  });
}
