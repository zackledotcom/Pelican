// server.js
import express from 'express';
import { Ollama } from 'ollama';
import fs from 'fs';
import path from 'path';
import { ChromaClient } from 'chromadb';

const app = express();
const ollama = new Ollama({ host: 'http://localhost:11434' });
const chroma = new ChromaClient();

// Memory management
class ContextManager {
  constructor() {
    this.sessions = new Map();
    this.MAX_TOKENS = 4096;
  }

  async getContext(sessionId, prompt) {
    const session = this.sessions.get(sessionId) || {
      messages: [],
      tokens: 0
    };

    // Add semantic search from vector DB
    const relevantMemories = await chroma.query({
      collection: 'conversation_memories',
      queryText: prompt,
      nResults: 3
    });

    // Compress old messages if needed
    if (session.tokens > this.MAX_TOKENS * 0.7) {
      await this.compressContext(session);
    }

    return {
      ...session,
      relevantMemories
    };
  }

  async compressContext(session) {
    // Summarize older messages
    const summary = await ollama.chat({
      model: 'llama3',
      messages: [
        {
          role: 'system',
          content: 'Summarize this conversation history keeping key details:'
        },
        ...session.messages.slice(0, -5)
      ]
    });

    session.messages = [
      { role: 'system', content: `Context summary: ${summary}` },
      ...session.messages.slice(-5)
    ];
    session.tokens = await this.countTokens(session.messages);
  }
}

// File processing
app.post('/api/upload', async (req, res) => {
  const file = req.files.file;
  const content = file.data.toString();
  
  // Store in vector DB
  await chroma.addDocuments({
    collection: 'uploaded_files',
    documents: [content],
    metadatas: [{ filename: file.name }]
  });

  res.json({ status: 'processed' });
});

// Streaming endpoint
app.post('/api/chat', async (req, res) => {
  const { messages, sessionId, model, params } = req.body;
  
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const stream = await ollama.chat({
    model: model || 'llama3',
    messages,
    options: params,
    stream: true
  });

  for await (const chunk of stream) {
    res.write(`data: ${JSON.stringify(chunk)}\n\n`);
  }

  res.end();
});