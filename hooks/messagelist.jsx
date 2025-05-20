import MarkdownRenderer from './MarkdownRenderer';

export default function MessageList({ messages }) {
  return (
    <div
      className="chat-area"
      role="region"
      aria-live="polite"
      style={{
        flex: 1,
        overflowY: 'auto',
        paddingRight: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        paddingBottom: '1rem',
      }}
    >
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`message message-bubble ${msg.role}`}
          role="article"
          aria-roledescription="chat message"
          tabIndex={0}
          style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start' }}
        >
          <MarkdownRenderer content={msg.content} />
          <div className="message-meta">
            {new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
