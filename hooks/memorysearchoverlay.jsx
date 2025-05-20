import { useEffect, useState } from 'react';

export default function MemorySearchOverlay({ visible, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const search = async () => {
    const res = await fetch('http://localhost:3000/api/memory/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    setResults(data.matches || []);
  };

  useEffect(() => {
    if (!visible) {
      setQuery('');
      setResults([]);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        background: 'white',
        border: '1px solid #ccc',
        borderRadius: '12px',
        padding: '1rem',
        zIndex: 9999,
        boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
      }}
    >
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && search()}
        placeholder="Search memory..."
        style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem' }}
      />
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {results.map((r, i) => (
          <li key={i} style={{ marginBottom: '0.75rem', background: '#eee', padding: '0.5rem', borderRadius: '8px' }}>
            {r}
          </li>
        ))}
      </ul>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
