import { useEffect, useState } from 'react';

export default function TokenDebugger({ latestChunk }) {
  const [log, setLog] = useState([]);

  useEffect(() => {
    if (latestChunk) {
      setLog((prev) => [...prev, latestChunk]);
    }
  }, [latestChunk]);

  return (
    <div style={{
      fontFamily: 'monospace',
      fontSize: '0.8rem',
      background: '#000',
      color: '#0f0',
      padding: '1rem',
      marginTop: '1rem',
      maxHeight: '150px',
      overflowY: 'auto',
      borderRadius: '8px',
    }}>
      <strong>Token Stream:</strong>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{log.join('')}</pre>
    </div>
  );
}
