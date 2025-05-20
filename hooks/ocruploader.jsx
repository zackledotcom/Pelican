import { useState, useRef } from 'react';
import { createWorker } from 'tesseract.js';

export default function OCRUploader({ onExtracted }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef();
  const [status, setStatus] = useState('');

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith('image/')) return;
    await extractText(file);
  };

  const handleBrowse = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) return;
    await extractText(file);
  };

  const extractText = async (file) => {
    setStatus('Scanning image...');
    const worker = await createWorker('eng');
    const {
      data: { text },
    } = await worker.recognize(file);
    await worker.terminate();
    setStatus('');
    if (onExtracted) onExtracted(text);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`upload-zone ${dragging ? 'dragging' : ''}`}
    >
      <p>
        Drag an image here or{' '}
        <span
          style={{ color: '#007aff', cursor: 'pointer' }}
          onClick={() => inputRef.current.click()}
        >
          browse
        </span>
      </p>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleBrowse}
      />
      {status && <div style={{ marginTop: '0.5rem', color: '#007aff' }}>{status}</div>}
    </div>
  );
}
