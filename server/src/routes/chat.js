const express = require('express');
const router = express.Router();
const { Groq } = require('groq-sdk');
require('dotenv').config();

const groq = new Groq({ apiKey: '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' });

router.post('/', async (req, res) => {
  const { prompt, sessionId, messages } = req.body;
  const irrelevantKeywords = ['weather', 'news', 'joke', 'recipe', 'movie', 'game', 'time', 'date'];
  const isIrrelevant = irrelevantKeywords.some((kw) => prompt.toLowerCase().includes(kw));

  if (isIrrelevant) {
    return res.status(400).json({ reply: 'Sorry, I’m here to help with APIhub questions only. Try asking about APIs or authentication!' });
  }

  try {
    const contextMessages = messages.map((msg) => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text,
    }));
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: `
            You are an APIhub support bot. Provide accurate, concise answers about APIhub's APIs, authentication, rate limits, error codes, pricing, and support. Use the following knowledge base to ground your responses:
            - Authentication: API keys (Bearer <key>) or OAuth 2.0 via /oauth/token.
            - Rate Limits: Free tier (100 req/hour, 1,000 req/day), Premium ($29/month, 10,000 req/hour).
            - Error Codes: 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 429 (Too Many Requests), 500 (Server Error).
            - APIs: Finance, weather, e-commerce; e.g., GET /v1/payments/transactions.
            - Data: JSON (default), XML (optional).
            - Support: Email support@apihub.com or create a ticket.
            Reject off-topic questions (e.g., weather, news) with: "Sorry, I’m here to help with APIhub questions only."
            Keep responses under 150 words and avoid speculative answers.
          `,
        },
        ...contextMessages,
        { role: 'user', content: prompt },
      ],
      max_tokens: 200,
      temperature: 0.7,
    });
    const reply = completion.choices[0].message.content.trim();
    if (reply.toLowerCase().includes('i don’t know') || reply.toLowerCase().includes('sorry')) {
      return res.status(400).json({ reply: 'Sorry, I didn’t understand. Can you clarify your APIhub question?' });
    }
    res.json({ reply });
  } catch (err) {
    console.error('Groq API error:', err);
    res.status(500).json({ error: 'Failed to process request' });
  }
});

module.exports = router;