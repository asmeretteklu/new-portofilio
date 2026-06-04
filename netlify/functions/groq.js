import fetch from 'node-fetch';

const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour window
const MAX_REQUESTS_PER_WINDOW = 3;            // matches frontend 3-question cap

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

  // Clean up old entries passively
  if (rateLimitMap.size > 1000) {
      for (const [ip, data] of rateLimitMap.entries()) {
          if (now - data.timestamp > RATE_LIMIT_WINDOW_MS) {
              rateLimitMap.delete(ip);
          }
      }
  }

  try {
    const bodyPayload = JSON.parse(event.body);
  console.log('Groq proxy received payload:', JSON.stringify(bodyPayload).slice(0, 200));
    
    // Use the non-prefixed key in production, fallback to prefixed for local if needed
    const apiKey = process.env.GROK_KEY || process.env.GROQ_API_KEY || process.env.VITE_GROK_KEY || process.env.VITE_GROQ_API_KEY;
  console.log('Groq proxy using API key:', apiKey ? '***' + apiKey.slice(-4) : 'undefined');
    
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'API key not configured securely on server' }),
      };
    }

    const response = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(bodyPayload),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Groq API Error:', errorText);
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
    console.error('Groq proxy error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
