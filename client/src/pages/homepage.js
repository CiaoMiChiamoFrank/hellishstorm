import React, { useState } from 'react';

const HomePage = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Salva il file selezionato
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected)); // anteprima locale
    }
  };

  // Invia al backend
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      setLoading(true);
      setError(null);
      const res = await fetch('http://localhost:5000/api/upload/image', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setUploadedUrl(data.url);
      } else {
        throw new Error(data.error || 'Upload fallito');
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '2rem' }}>
      <h2>Carica un'immagine su Cloudinary</h2>

      <form onSubmit={handleUpload}>
        <input type="file" accept="image/*" onChange={handleFileChange} required />
        <br /><br />
        <button type="submit" disabled={loading}>
          {loading ? 'Caricamento...' : 'Carica'}
        </button>
      </form>

      {previewUrl && (
        <div style={{ marginTop: '1rem' }}>
          <h4>Anteprima:</h4>
          <img src={previewUrl} alt="preview" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
        </div>
      )}

      {uploadedUrl && (
        <div style={{ marginTop: '1rem' }}>
          <h4>URL pubblico Cloudinary:</h4>
          <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">{uploadedUrl}</a>
          <div style={{ marginTop: '0.5rem' }}>
            <img src={uploadedUrl} alt="Uploaded" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
          </div>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>❌ {error}</p>}
    </div>
  );
};

export default HomePage;
