import { useState, useRef, useEffect } from 'react';

export default function MessageInput({ onSubmit, onStop, onRegenerate }) {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) handleSubmit();
    }
  };

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setInput('');
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  return (
    <div
      className="glass-panel"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        marginTop: '1rem',
      }}
    >
      <textarea
        ref={textareaRef}
        className="input-textarea"
        value={input}
        placeholder="Type a message…"
        rows={1}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
        <button onClick={handleSubmit}>Send</button>
        <button onClick={onStop}>Stop</button>
        <button onClick={onRegenerate}>Retry</button>
      </div>
    </div>
  );
}