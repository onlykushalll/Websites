import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '10mb' }));

  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
  }

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Generate personalized birthday wishes & letter
  app.post('/api/ai/generate-wishes', async (req, res) => {
    if (!ai) {
      return res.status(503).json({ error: 'API Key not configured' });
    }
    try {
      const {
        recipientName = 'Bestie',
        senderName = 'Your Best Friend',
        relationship = 'Best Friend',
        vibe = 'cute',
        insideJokes = '',
      } = req.body;

      const prompt = `Write a personalized birthday keepsake pack for ${recipientName} from ${senderName} (${relationship}).
Vibe: ${vibe} (cute, heartfelt, touching).
Inside jokes / context: ${insideJokes || 'cherished friend, late-night laughs, always supportive'}.

Please generate:
1. 5 Birthday Flip Cards (each having frontTitle, frontSubtitle, and backText heartfelt wish message).
2. A full heartfelt birthday letter (letterGreeting, letterBody, letterSignoff).`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              letterGreeting: {
                type: Type.STRING,
                description: 'Greeting line like "Dear Birthdayyy girlllll,"',
              },
              letterBody: {
                type: Type.STRING,
                description: '3-4 paragraphs of emotional, heartwarming, touching birthday wishes.',
              },
              letterSignoff: {
                type: Type.STRING,
                description: 'Closing line like "With all my love & infinite hugs,\\nYour Bestie 💌"',
              },
              wishes: {
                type: Type.ARRAY,
                description: 'Array of 5 birthday flip card contents',
                items: {
                  type: Type.OBJECT,
                  properties: {
                    frontTitle: {
                      type: Type.STRING,
                      description: 'Cute, playful front title',
                    },
                    frontSubtitle: {
                      type: Type.STRING,
                      description: 'Short subtitle or prompt on front face',
                    },
                    backText: {
                      type: Type.STRING,
                      description: 'Touching, warm wish paragraph on back face',
                    },
                  },
                  required: ['frontTitle', 'frontSubtitle', 'backText'],
                },
              },
            },
            required: ['letterGreeting', 'letterBody', 'letterSignoff', 'wishes'],
          },
        },
      });

      const text = response.text || '{}';
      const parsed = JSON.parse(text);
      res.json(parsed);
    } catch (error: any) {
      console.error('Error generating wishes:', error);
      res.status(500).json({
        error: error.message || 'Failed to generate wishes',
      });
    }
  });

  // Analyze photo and generate memory caption
  app.post('/api/ai/analyze-photo', async (req, res) => {
    if (!ai) {
      return res.status(503).json({ error: 'API Key not configured' });
    }
    try {
      const { imageBase64, mimeType = 'image/jpeg', recipientName = 'Bestie' } = req.body;
      if (!imageBase64) {
        return res.status(400).json({ error: 'imageBase64 is required' });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: {
          parts: [
            {
              inlineData: {
                mimeType,
                data: imageBase64,
              },
            },
            {
              text: `Generate a short (1 sentence), heartwarming and cute polaroid caption for this photo of ${recipientName}. Include 1-2 emojis. Return plain text caption only.`,
            },
          ],
        },
      });

      res.json({ caption: response.text?.trim() || 'A beautiful memory together ✨' });
    } catch (error: any) {
      console.error('Error analyzing photo:', error);
      res.status(500).json({ error: error.message || 'Failed to analyze photo' });
    }
  });

  // Vite middleware for development / static serving for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Birthday Surprise server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
