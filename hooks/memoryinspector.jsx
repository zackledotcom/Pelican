import { useEffect, useState } from 'react';

export default function MemoryInspector() {
  const [memories, setMemories] = useState([]);
  const [error, setError] = useState(null);

  const fetchMemories = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/memory');
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

  const voteMemory = async (id, delta) => {
    await fetch('http://localhost:3001/api/memory/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, delta })
    });
    fetchMemories();
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
            {m.meta?.score !== undefined && (
              <div style={{ marginTop: '0.25rem' }}>
                <button onClick={() => voteMemory(m.meta?.id || m.id, 1)} style={{ marginRight: '0.5rem' }}>👍</button>
                <button onClick={() => voteMemory(m.meta?.id || m.id, -1)}>👎</button>
                <span style={{ marginLeft: '0.5rem', color: '#ccc' }}>Score: {m.meta?.score ?? 0}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
