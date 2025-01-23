import { useState } from 'react';

export default function FileDrop() {
  const [droppedFile, setDroppedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevent default to allow dropping
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevent default behavior
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setDroppedFile(e.dataTransfer.files[0]); // Get the first file
      e.dataTransfer.clearData(); // Clear drag data
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        border: '2px dashed gray',
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center',
        backgroundColor: isDragging ? '#f0f8ff' : '#ffffff',
        transition: 'background-color 0.3s',
      }}
    >
      <p>{isDragging ? 'Drop the file here...' : 'Drag and drop a file here, or click to select one.'}</p>
      <input
        type="file"
        style={{ display: 'none' }}
        id="fileInput"
        onChange={(e) => setDroppedFile(e.target.files![0])}
      />
      <label
        htmlFor="fileInput"
        style={{
          cursor: 'pointer',
          color: 'blue',
          textDecoration: 'underline',
        }}
      >
        Choose a file
      </label>

      {droppedFile && (
        <div style={{ marginTop: '20px' }}>
          <h4>File Details:</h4>
          <p>Name: {droppedFile.name}</p>
          <p>Type: {droppedFile.type}</p>
          <p>Size: {(droppedFile.size / 1024).toFixed(2)} KB</p>
        </div>
      )}
    </div>
  );
}
