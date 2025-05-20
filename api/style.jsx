// server.js
import express from 'express';
import rateLimit from 'express-rate-limit';
import { Ollama } from 'ollama';

const app = express();
const ollama = new Ollama({ host: 'http://localhost:11434' });

// Safety logger (optional)
const logInteraction = (prompt, response) => {
  const logEntry = {
    timestamp: new Date(),
    prompt,
    response,
    ip: req.ip
  };
  fs.appendFileSync('safety.log', JSON.stringify(logEntry) + '\n');
};

// Uncensored chat endpoint
app.post('/api/chat', async (req, res) => {
  const { messages, mode } = req.body;
  
  const response = await ollama.chat({
    model: 'llama3-uncensored',
    messages: [{
      role: 'system',
      content: UNCENSORED_SYSTEM_PROMPT.replace('{mode}', mode)
    }, ...messages],
    options: {
      temperature: 0.8,
      num_ctx: 16384
    }
  });
  
  if (mode === 'developer') {
    response.message.content = addCodeWarnings(response.message.content);
  }
  
  logInteraction(messages, response);
  res.json(response);
});

function addCodeWarnings(code) {
  const dangerousPatterns = {
    'malware': 'WARNING: This code could be used to create malware',
    'exploit': 'SECURITY NOTICE: This demonstrates a system exploit',
    'bypass': 'LEGAL NOTE: This may circumvent security measures'
  };
  
  let warnedCode = code;
  Object.entries(dangerousPatterns).forEach(([pattern, warning]) => {
    if (code.includes(pattern)) {
      warnedCode = `/* ${warning} */\n${warnedCode}`;
    }
  });
  
  return warnedCode;
}

.upload-zone.dragging {
  background-color: #222;
  border-color: #00f;
}