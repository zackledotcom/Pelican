import { useEffect, useState } from 'react';

export default function NetworkStatus() {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const set = () => setOnline(navigator.onLine);
    window.addEventListener('online', set);
    window.addEventListener('offline', set);
    return () => {
      window.removeEventListener('online', set);
      window.removeEventListener('offline', set);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 8,
        right: 8,
        padding: '0.5rem 1rem',
        background: online ? '#00c851' : '#ff4444',
        color: 'white',
        borderRadius: '999px',
        fontSize: '0.75rem',
        fontWeight: '600',
        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
        zIndex: 1000,
      }}
    >
      {online ? 'Online' : 'Offline'}
    </div>
  );
}
