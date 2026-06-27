// Deploy this as a Cloudflare Worker at: api.thunderstudy.indevs.in
// Routes: api.thunderstudy.indevs.in/api/chat → thunderstudyai.vercel.app/api/chat

const VERCEL_API = 'https://thunderstudyai.vercel.app/api/chat';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default {
  async fetch(request) {
    // Handle preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }

    // Only allow POST to /api/chat
    const url = new URL(request.url);
    if (url.pathname !== '/api/chat' || request.method !== 'POST') {
      return new Response('Not found', { status: 404, headers: CORS });
    }

    try {
      // Forward to Vercel
      const vercelRes = await fetch(VERCEL_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: request.body,
      });

      const data = await vercelRes.json();

      return new Response(JSON.stringify(data), {
        status: vercelRes.status,
        headers: { ...CORS, 'Content-Type': 'application/json' },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Proxy error: ' + err.message }), {
        status: 500,
        headers: { ...CORS, 'Content-Type': 'application/json' },
      });
    }
  }
};
