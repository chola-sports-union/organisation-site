export default async function handler(req: any, res: any) {
  const { code } = req.query;

  if (!code) {
    res.status(400).send("Missing authorization code.");
    return;
  }

  const clientId = process.env.ZOHO_CLIENT_ID;
  const clientSecret = process.env.ZOHO_CLIENT_SECRET;
  const redirectUri = process.env.ZOHO_REDIRECT_URI;
  const accountsUrl = process.env.ZOHO_ACCOUNTS_URL || "https://accounts.zoho.in";

  const params = new URLSearchParams({
    client_id: clientId || "",
    client_secret: clientSecret || "",
    redirect_uri: redirectUri || "",
    grant_type: "authorization_code",
    code: code as string,
  });

  try {
    const response = await fetch(`${accountsUrl}/oauth/v2/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      res.status(500).json({ error: "Token exchange failed", details: data });
      return;
    }

    res.setHeader("Content-Type", "text/html");
    res.status(200).send(`
      <html>
        <body style="font-family: sans-serif; padding: 2rem; background: #0A0E27; color: white;">
          <h2>OAuth Setup Complete</h2>
          <p>Add this refresh token to your Vercel environment variables as <code>ZOHO_REFRESH_TOKEN</code>:</p>
          <pre style="background: #12172E; padding: 1rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); overflow-x: auto; word-break: break-all;">
${data.refresh_token}
          </pre>
          <p>Access Token (expires in 1 hour):</p>
          <pre style="background: #12172E; padding: 1rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); overflow-x: auto; word-break: break-all;">
${data.access_token}
          </pre>
        </body>
      </html>
    `);
  } catch (err: any) {
    res.status(500).json({ error: "Token exchange failed", details: err.message });
  }
}
