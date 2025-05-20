export default function ModelControls({ params, onChange }) {
  const handleModelChange = (e) => {
    const updated = { ...params, model: e.target.value };
    onChange(updated);
    localStorage.setItem('model_params', JSON.stringify(updated));
  };

  const handleTempChange = (e) => {
    const updated = { ...params, temperature: parseFloat(e.target.value) };
    onChange(updated);
    localStorage.setItem('model_params', JSON.stringify(updated));
  };

  const handleTopPChange = (e) => {
    const updated = { ...params, top_p: parseFloat(e.target.value) };
    onChange(updated);
    localStorage.setItem('model_params', JSON.stringify(updated));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label>
        Model:
        <select value={params.model} onChange={handleModelChange}>
          <option value="llama3">LLaMA 3</option>
          <option value="mistral">Mistral</option>
          <option value="codellama">Code LLaMA</option>
          <option value="gemma">Gemma</option>
        </select>
      </label>

      <label>
        Temperature: {params.temperature}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={params.temperature}
          onChange={handleTempChange}
        />
      </label>

      <label>
        Top-p: {params.top_p}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={params.top_p}
          onChange={handleTopPChange}
        />
      </label>
    </div>
  );
}
