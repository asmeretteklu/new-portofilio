import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const geminiProxyPlugin = (env) => ({
  name: 'gemini-proxy',
  configureServer(server) {
    server.middlewares.use('/api/gemini', (req, res) => {
      if (req.method !== 'POST') {
        res.statusCode = 405;
        res.end(JSON.stringify({ error: 'Method Not Allowed' }));
        return;
      }

      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });

      req.on('end', async () => {
        try {
          const bodyPayload = JSON.parse(body);
          const apiKey = env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY;
          
          if (!apiKey) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'API key not configured securely on server' }));
            return;
          }

          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(bodyPayload),
            }
          );

          res.statusCode = response.status;
          res.setHeader('Content-Type', 'application/json');
          
          const data = await response.text();
          res.end(data);
        } catch (error) {
          console.error('Local proxy error:', error);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
      });
    });
  }
});

const groqProxyPlugin = (env) => ({
  name: 'groq-proxy',
  configureServer(server) {
    server.middlewares.use('/api/groq', (req, res) => {
      if (req.method !== 'POST') {
        res.statusCode = 405;
        res.end(JSON.stringify({ error: 'Method Not Allowed' }));
        return;
      }

      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });

      req.on('end', async () => {
        try {
          const bodyPayload = JSON.parse(body);
          const apiKey = env.GROK_KEY || env.GROQ_API_KEY || env.VITE_GROK_KEY || env.VITE_GROQ_API_KEY;
          
          if (!apiKey) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'API key not configured securely on server' }));
            return;
          }

          const response = await fetch(
            'https://api.groq.com/openai/v1/chat/completions',
            {
              method: 'POST',
              headers: { 
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${apiKey}`
              },
              body: JSON.stringify(bodyPayload),
            }
          );

          res.statusCode = response.status;
          res.setHeader('Content-Type', 'application/json');
          
          const data = await response.text();
          res.end(data);
        } catch (error) {
          console.error('Local proxy error:', error);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
      });
    });
  }
});

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), geminiProxyPlugin(env), groqProxyPlugin(env)],
  };
})
