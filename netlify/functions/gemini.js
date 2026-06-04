import fetch from 'node-fetch';

const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

export const handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  // Simple In-Memory Rate Limiting
  const clientIp = event.headers['x-forwarded-for'] || event.headers['client-ip'] || 'unknown';
  const now = Date.now();

  if (rateLimitMap.has(clientIp)) {
    const data = rateLimitMap.get(clientIp);
    if (now - data.timestamp < RATE_LIMIT_WINDOW_MS) {
      if (data.count >= MAX_REQUESTS_PER_WINDOW) {
        return {
          statusCode: 429,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ error: 'Too many requests. Please wait a moment before trying again.' }),
        };
      }
      data.count++;
    } else {
      rateLimitMap.set(clientIp, { timestamp: now, count: 1 });
    }
  } else {
    rateLimitMap.set(clientIp, { timestamp: now, count: 1 });
  }

  // Clean up old entries passively to prevent memory leaks over long-lived instances
  if (rateLimitMap.size > 1000) {
      for (const [ip, data] of rateLimitMap.entries()) {
          if (now - data.timestamp > RATE_LIMIT_WINDOW_MS) {
              rateLimitMap.delete(ip);
          }
      }
  }

  try {
    const bodyPayload = JSON.parse(event.body);
    
    // We get the key from the server environment (preferring the non-VITE prefixed one)
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'API key not configured securely on server' }),
      };
    }

    // Proxy the request to Google API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google API Error:', errorText);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `API Error: ${response.status}` }),
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Gemini proxy error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
