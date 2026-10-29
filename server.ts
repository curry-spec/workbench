import express from 'express';
import path from 'path';
import {GoogleGenAI} from '@google/genai';
import dotenv from 'dotenv';
import {fileURLToPath} from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Intelligent Transcription & Summary Endpoint
app.post('/api/workbench/analyze', async (req, res) => {
  try {
    const {transcript} = req.body;
    if (!transcript) {
      return res.status(400).json({error: 'Transcript is required'});
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `请分析以下通话记录并提供：
1. 简洁的摘要。
2. 客户意图。
3. 推荐的下一步操作或产品建议。

请使用中文回复。

通话记录：${transcript}`,
            },
          ],
        },
      ],
      config: {
        responseMimeType: 'application/json',
      },
    });

    res.json(JSON.parse(response.text || '{}'));
  } catch (error) {
    console.error('Error analyzing transcript:', error);
    res.status(500).json({error: 'Failed to analyze transcript'});
  }
});

// Serve static assets from the public directory
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
} else {
  // In development, Vite handles the frontend
  const {createServer: createViteServer} = await import('vite');
  const vite = await createViteServer({
    server: {middlewareMode: true},
    appType: 'spa',
  });
  app.use(vite.middlewares);
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
