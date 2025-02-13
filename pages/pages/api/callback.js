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
      Authorization: `Basic YWFmZTIwOGYyZTJlNDJjNTg5ZDMwMjc5OGVkMTNjMzE6ZGFmZTkzZDc4MmI3NGI1OTg2YjU4ZDM3ZmVmYzNhZTc=`,  // Replace with updated Base64-encoded Client ID and Secret
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: 'https://spotify-nextjs-bay.vercel.app/callback',  // Your live URL
    }),
  });

  const data = await response.json();

  console.log('Access Token:', data.access_token);  // Temporary for debugging purposes

  res.status(200).json(data);  // Respond with the access token
}
