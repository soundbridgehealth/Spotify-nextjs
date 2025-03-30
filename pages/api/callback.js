export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { code } = req.query;

  if (!code) {
    res.status(400).json({ error: "No authorization code provided" });
    return;
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic YWFmZTIwOGYyZTJlNDJjNTg5ZDMwMjc5OGVkMTNjMzE6ZGFmZTkzZDc4MmI3NGI1OTg2YjU4ZDM3ZmVmYzNhZTc=`,
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: 'https://spotify-nextjs-bay.vercel.app/api/callback',
    }),
  });

  const data = await response.json();

  res.status(200).json(data);
}
