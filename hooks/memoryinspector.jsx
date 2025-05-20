import { useEffect, useState } from 'react';

export default function MemoryInspector() {
  const [memories, setMemories] = useState([]);
  const [error, setError] = useState(null);

  const fetchMemories = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/memory');
      const data = await res.json();
      if (Array.isArray(data)) {
        setMemories(data);
      } else {
        setError('Invalid memory format');
      }
    } catch (err) {
      setError('Failed to load memory');
    }
  };

  useEffect(() => {
    fetchMemories();
  }, []);

  return (
    <div style={{ padding: '1rem', border: '1px solid #444', marginBottom: '1rem' }}>
      <h3>Vector Memory</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {memories.map((m, i) => (
          <li key={i} style={{ marginBottom: '0.75rem', background: '#111', padding: '0.5rem', borderRadius: '4px' }}>
            <strong>{m.meta?.filename || 'Unnamed file'}:</strong>
            <div style={{ whiteSpace: 'pre-wrap', marginTop: '0.25rem' }}>{m.content}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
