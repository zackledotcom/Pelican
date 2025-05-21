
const express = require('express');
const cors = require('cors');
const { ChromaClient } = require('chromadb');
const { encode } = require('gpt-tokenizer');
const ollama = require('ollama');
const path = require('path');

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Initialize Chroma client
const chroma = new ChromaClient();

// Helper functions
function deduplicateMemories(memories) {
  const seen = new Set();
  return memories.filter(mem => {
    const content = mem.content.trim();
    if (seen.has(content) || content.length < 10) return false;
    seen.add(content);
    return true;
  });
}

function summarizeMemories(memories, tokenLimit) {
  let totalTokens = 0;
  const result = [];
  
  for (const memory of memories) {
    const tokens = encode(memory.content).length;
    if (totalTokens + tokens <= tokenLimit) {
      result.push(memory);
      totalTokens += tokens;
    } else {
      break;
    }
  }
  
  return result;
}

// API endpoints
app.post('/api/query', async (req, res) => {
  try {
    const { userPrompt } = req.body;
    if (!userPrompt) {
      return res.status(400).json({ error: 'User prompt is required' });
    }
    
    // Query vector database
    const results = await chroma.query({
      collection: 'uploaded_files',
      queryText: userPrompt,
      nResults: 10
    });
    
    // Process memories
    let memories = (results || [])
      .map(mem => ({
        meta: mem.metadata || {},
        content: mem.document || mem.content || '',
        pinned: mem.metadata?.pinned || false,
        score: mem.metadata?.score || 0
      }))
      .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || (b.score - a.score));
    
    memories = deduplicateMemories(memories);
    
    // Handle token limits
    const totalTokens = memories.reduce((sum, m) => sum + encode(m.content).length, 0);
    let formattedMemories;
    
    if (memories.length > 5 || totalTokens > 4000) {
      // Summarize with LLM
      const summary = await ollama.chat({
        model: 'llama3',
        messages: [
          { role: 'system', content: 'Summarize the following context for use in a chat:' },
          { role: 'user', content: memories.map(m => m.content).join('\n\n') }
        ]
      });
      formattedMemories = [{ role: 'system', content: `Context summary: ${summary.message.content}` }];
    } else {
      memories = summarizeMemories(memories, 4000);
      formattedMemories = memories.map(mem => ({
        role: 'system',
        content: `Context from "${mem.meta?.filename || 'memory'}"${mem.pinned ? ' (pinned)' : ''}${mem.meta?.timestamp ? ` (uploaded ${new Date(mem.meta.timestamp).toLocaleDateString()})` : ''}: ${mem.content}`
      }));
    }
    
    res.json({ memories: formattedMemories });
  } catch (error) {
    console.error('Error processing query:', error);
    res.status(500).json({ error: 'Failed to process query', details: error.message });
  }
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Valid messages array is required' });
    }
    
    const response = await ollama.chat({
      model: 'llama3',
      messages
    });
    
    res.json({ response });
  } catch (error) {
    console.error('Error in chat:', error);
    res.status(500).json({ error: 'Failed to get chat response', details: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle process communication for Electron
process.on('message', (message) => {
  console.log('Received message from main process:', message);
  // Handle messages from main process
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

module.exports = app;

const cors = require('cors');
const { ChromaClient } = require('chromadb');
const { encode } = require('gpt-tokenizer');
const ollama = require('ollama');
const path = require('path');

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Initialize Chroma client
const chroma = new ChromaClient();

// Helper functions
function deduplicateMemories(memories) {
  const seen = new Set();
  return memories.filter(mem => {
    const content = mem.content.trim();
    if (seen.has(content) || content.length < 10) return false;
    seen.add(content);
    return true;
  });
}

function summarizeMemories(memories, tokenLimit) {
  let totalTokens = 0;
  const result = [];
  
  for (const memory of memories) {
    const tokens = encode(memory.content).length;
    if (totalTokens + tokens <= tokenLimit) {
      result.push(memory);
      totalTokens += tokens;
    } else {
      break;
    }
  }
  
  return result;
}

// API endpoints
app.post('/api/query', async (req, res) => {
  try {
    const { userPrompt } = req.body;
    if (!userPrompt) {
      return res.status(400).json({ error: 'User prompt is required' });
    }
    
    // Query vector database
    const results = await chroma.query({
      collection: 'uploaded_files',
      queryText: userPrompt,
      nResults: 10
    });
    
    // Process memories
    let memories = (results || [])
      .map(mem => ({
        meta: mem.metadata || {},
        content: mem.document || mem.content || '',
        pinned: mem.metadata?.pinned || false,
        score: mem.metadata?.score || 0
      }))
      .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || (b.score - a.score));
    
    memories = deduplicateMemories(memories);
    
    // Handle token limits
    const totalTokens = memories.reduce((sum, m) => sum + encode(m.content).length, 0);
    let formattedMemories;
    
    if (memories.length > 5 || totalTokens > 4000) {
      // Summarize with LLM
      const summary = await ollama.chat({
        model: 'llama3',
        messages: [
          { role: 'system', content: 'Summarize the following context for use in a chat:' },
          { role: 'user', content: memories.map(m => m.content).join('\n\n') }
        ]
      });
      formattedMemories = [{ role: 'system', content: `Context summary: ${summary.message.content}` }];
    } else {
      memories = summarizeMemories(memories, 4000);
      formattedMemories = memories.map(mem => ({
        role: 'system',
        content: `Context from "${mem.meta?.filename || 'memory'}"${mem.pinned ? ' (pinned)' : ''}${mem.meta?.timestamp ? ` (uploaded ${new Date(mem.meta.timestamp).toLocaleDateString()})` : ''}: ${mem.content}`
      }));
    }
    
    res.json({ memories: formattedMemories });
  } catch (error) {
    console.error('Error processing query:', error);
    res.status(500).json({ error: 'Failed to process query', details: error.message });
  }
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Valid messages array is required' });
    }
    
    const response = await ollama.chat({
      model: 'llama3',
      messages
    });
    
    res.json({ response });
  } catch (error) {
    console.error('Error in chat:', error);
    res.status(500).json({ error: 'Failed to get chat response', details: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle process communication for Electron
process.on('message', (message) => {
  console.log('Received message from main process:', message);
  // Handle messages from main process
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

module.exports = app;
