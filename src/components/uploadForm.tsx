import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

function FileUploadForm() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [message, setMessage] = useState<string>('');

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newSelectedFiles = Array.from(event.target.files);
      setSelectedFiles([...selectedFiles, ...newSelectedFiles]);
      setMessage('')
    }
  };

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedFiles.length === 0) {
      setMessage('Vyberte nejméně jeden soubor');
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach(file => formData.append('files', file));

    axios.post('/api/upload', formData)
      .then((response) => {
        setMessage('Soubor byl úspěšně nahrán do databáze');
      })
      .catch((error) => {
        setMessage(`Nahrání souboru selhalo`);
      });
  };

  const removeFile = (fileName: string) => {
    const updatedFiles = selectedFiles.filter(file => file.name !== fileName);
    setSelectedFiles(updatedFiles);
  };

  return (
    <div className='set-marker-container'>
      <h3>Nahrát soubor</h3>
      <form onSubmit={onFormSubmit}>
        <label htmlFor="file" className="upload-button">
          Vybrat soubor .csv
          <input type="file" id="file" name="file" accept="text/csv" onChange={onFileChange} multiple style={{ display: 'none' }} />
        </label>
        <button type="submit" className='file-submit-btn '>Potvrdit</button><br />
        {selectedFiles.length > 0 && (
          <div>
            <br />
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.8rem' }}>
              {selectedFiles.map(file => (
                <li key={file.name}>
                  {file.name}
                  <button className='remove-button' onClick={() => removeFile(file.name)}>

                    <span style={{ color: 'red', marginLeft: '10px', cursor: 'pointer' }} onClick={() => removeFile(file.name)}>&#x2716;</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <br />
        {message}

      </form>

    </div>
  );
}

export default FileUploadForm;