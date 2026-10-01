export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { license_key } = req.body;
    const PRODUCT_ID = "brZIX-a4zsevaP5C49lO5A==";

    if (!license_key) {
      return res.status(400).json({ success: false, message: 'Kunci lesen diperlukan.' });
    }

    const response = await fetch("https://api.gumroad.com/v2/licenses/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        product_id: PRODUCT_ID,
        license_key: license_key.trim(),
        increment_uses_count: "false"
      }),
    });

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error("Gumroad API Error:", error);
    return res.status(500).json({ success: false, message: 'Ralat pelayan Vercel.' });
  }
}
