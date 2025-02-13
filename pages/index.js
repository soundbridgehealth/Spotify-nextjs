import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    const clientId = "aafe208f2e2e42c589d302798ed13c31";  // Replace with your actual Spotify Client ID
    const redirectUri = "https://spotify-nextjs-bay.vercel.app/callback";  // Updated with your live URL
    const scopes = ["user-read-playback-state", "playlist-modify-public", "user-read-private"].join('%20');
    const authEndpoint = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}`;

    setIsLoading(true);
    router.push(authEndpoint);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <h1>Welcome to Spotify Playlist Builder</h1>
      <button onClick={handleLogin} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
        {isLoading ? 'Redirecting to Spotify...' : 'Login with Spotify'}
      </button>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { code } = context.query;

  if (!code) {
    return { props: {} };
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
      redirect_uri: 'https://spotify-nextjs-bay.vercel.app/callback',  // Updated with your live URL
    }),
  });

  const data = await response.json();

  console.log('Access Token:', data.access_token);  // Replace this with actual token handling

  return { props: {} };
}

