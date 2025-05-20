import { useState, useRef } from 'react';

export default function FileUploader({ onUploaded }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef();

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await res.json();
    if (onUploaded) onUploaded(result);
  };

  const handleBrowse = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await res.json();
    if (onUploaded) onUploaded(result);
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
      style={{
        border: '2px dashed #888',
        padding: '1rem',
        textAlign: 'center',
        borderRadius: '6px',
        marginBottom: '1rem',
      }}
    >
      <p>Drag & drop a file here, or <span style={{ color: '#00f', cursor: 'pointer' }} onClick={() => inputRef.current.click()}>browse</span></p>
      <input
        ref={inputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleBrowse}
      />
    </div>
  );
}
