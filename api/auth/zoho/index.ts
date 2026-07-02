export default function handler(req: any, res: any) {
  const clientId = process.env.ZOHO_CLIENT_ID!;
  const redirectUri = process.env.ZOHO_REDIRECT_URI!;

  const scope = [
    "ZohoCRM.modules.ALL",
    "ZohoCRM.settings.ALL",
    "ZohoCRM.users.ALL",
  ].join(",");

  const authUrl =
    `https://accounts.zoho.in/oauth/v2/auth` +
    `?response_type=code` +
    `&client_id=${encodeURIComponent(clientId)}` +
    `&scope=${encodeURIComponent(scope)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&access_type=offline` +
    `&prompt=consent`;

  res.writeHead(302, {
    Location: authUrl,
  });
  res.end();
}
