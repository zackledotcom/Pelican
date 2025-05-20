import { useEffect, useState } from 'react';

const COMMANDS = [
  { label: 'Clear Chat', action: 'clear' },
  { label: 'Reset Memory', action: 'reset-memory' },
  { label: 'Insert Prompt: "Summarize this document"', action: 'prompt-summary' },
];

export default function CommandPalette({ onCommand }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const down = (e) => {
      if (e.key === '/' && !open) {
        setOpen(true);
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', down);
    return () => window.removeEventListener('keydown', down);
  }, [open]);

  const results = COMMANDS.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  const execute = (action) => {
    setOpen(false);
    onCommand(action);
  };

  if (!open) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '20%',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '400px',
      background: 'white',
      border: '1px solid #ccc',
      borderRadius: '12px',
      padding: '1rem',
      zIndex: 9999,
      boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
    }}>
      <input
        autoFocus
        placeholder="Type a command..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: '100%',
          padding: '0.5rem',
          borderRadius: '8px',
          marginBottom: '0.75rem',
        }}
      />
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {results.map((cmd, idx) => (
          <li key={idx} onClick={() => execute(cmd.action)} style={{ padding: '0.5rem', cursor: 'pointer' }}>
            {cmd.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
