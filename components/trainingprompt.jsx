export default function TrainingPrompt({ prompt, onChange }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', marginBottom: '0.25rem' }}>System Prompt</label>
      <textarea
        value={prompt}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        style={{
          width: '100%',
          resize: 'vertical',
          padding: '0.5rem',
          fontFamily: 'monospace',
          background: '#111',
          color: '#ccc',
          border: '1px solid #444',
          borderRadius: '4px',
        }}
      />
    </div>
  );
}
