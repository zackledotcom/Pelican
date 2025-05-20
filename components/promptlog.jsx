export default function PromptLog({ messages }) {
  return (
    <div
      className="glass-panel"
      style={{
        maxHeight: '150px',
        overflowY: 'auto',
        fontSize: '0.8rem',
        marginBottom: '1rem',
      }}
    >
      <strong>Prompt History:</strong>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {messages
          .filter((m) => m.role === 'user')
          .map((m, i) => (
            <li key={i} style={{ margin: '0.5rem 0' }}>
              {m.content}
            </li>
          ))}
      </ul>
    </div>
  );
}
