// Secure Netlify serverless function for Luna AI
// This hides the API key from the frontend.

export const handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  // Use standard GEMINI_API_KEY from environment (not prefixed with VITE_)
  // so it doesn't get bundled into frontend code.
  const API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

  if (!API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'API key not configured on server' })
    };
  }

  try {
    const body = JSON.parse(event.body);
    const messages = body.messages || [];
    const systemPrompt = body.systemPrompt || '';

    // Direct API call to Gemini from the backend
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
        contents: messages
      })
    });

    const data = await res.json();

    if (data.error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: data.error.message || 'API Error' })
      };
    }

    const aiText = data.candidates[0].content.parts[0].text;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: aiText })
    };
    
  } catch (err) {
    console.error('Luna AI Function Error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process request', details: err.message })
    };
  }
};
