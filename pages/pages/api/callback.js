export default async function handler(req, res) {
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
      redirect_uri: 'https://nextjs-boilerplate-ebon-five-38.vercel.app/callback',
    }),
  });

  const data = await response.json();
  console.log('Access Token:', data.access_token);

  res.status(200).json(data); // Respond with the access token
}
