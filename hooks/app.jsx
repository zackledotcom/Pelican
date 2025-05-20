import { useState, useEffect } from 'react';
import { MessageInput } from './components';
import '../styles/base.css';
import '../styles/chat.css';
import '../styles/index.css';

import FileUploader from './components/FileUploader';
import MemoryInspector from './components/MemoryInspector';
import TokenCounter from './components/TokenCounter';
import MarkdownRenderer from './components/MarkdownRenderer';
import ModelControls from './components/ModelControls';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [modelParams, setModelParams] = useState(() => {
    const saved = localStorage.getItem('model_params');
    return saved
      ? JSON.parse(saved)
      : {
          model: 'llama3',
          temperature: 0.7,
          top_p: 0.9,
        };
  });

  const sendChatMessage = async (messages, params = {}) => {
    const response = await window.electronAPI.sendMessage({
      messages,
      sessionId: currentSession || 'default',
      model: params.model,
      params,
    });

    if (response.error) {
      console.error(response.error);
      return;
    }

    setMessages((prev) => [...prev, { role: 'assistant', content: response.content }]);
  };

  const stopChatStream = async () => {
    await window.electronAPI.stopStream();
  };

  const handleSubmit = async (text) => {
    const userMessage = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMessage]);
    await sendChatMessage([...messages, userMessage], modelParams);
  };

  const regenerate = async () => {
    const lastUserMessage = [...messages].reverse().find((msg) => msg.role === 'user');
    if (lastUserMessage) {
      await sendChatMessage([...messages, lastUserMessage], modelParams);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('chat_sessions');
    if (saved) setSessions(JSON.parse(saved));
  }, []);

  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div className="sidebar" style={{ padding: '1rem' }}>
        <ModelControls params={modelParams} onChange={setModelParams} />
      </div>

      <div className="chat-area" style={{ flex: 1, overflow: 'auto', padding: '1rem' }}>
        <FileUploader onUploaded={(res) => console.log('File uploaded:', res)} />
        <MemoryInspector />
        <TokenCounter messages={messages} />

        <div className="message-list">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.role}`} style={{ marginBottom: '0.75rem' }}>
              <MarkdownRenderer content={msg.content} />
            </div>
          ))}
        </div>

        <MessageInput
          onSubmit={handleSubmit}
          onStop={stopChatStream}
          onRegenerate={regenerate}
        />
      </div>
    </div>
  );
}
