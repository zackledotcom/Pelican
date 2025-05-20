export default function SessionManager({ messages, onLoad }) {
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(messages, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `session-${Date.now()}.json`;
    a.click();
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(reader.result);
        if (Array.isArray(imported)) onLoad(imported);
      } catch {}
    };
    reader.readAsText(file);
  };

  return (
    <div className="glass-panel" style={{ marginBottom: '1rem' }}>
      <button onClick={handleExport}>Export</button>
      <input
        type="file"
        accept="application/json"
        onChange={handleImport}
        style={{ marginLeft: '1rem' }}
      />
    </div>
  );
}
