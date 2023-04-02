import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { urlLogs } from '../../endpoints';
import { logDTO } from '../log.model';

function FileUploadForm() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [fileInputValue, setFileInputTypeValue] = useState("");

  useEffect(() => {
    setFileInputTypeValue("")
  }, [message])

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newSelectedFiles = Array.from(event.target.files);
      setSelectedFiles([...selectedFiles, ...newSelectedFiles]);
    }
  };

  function onFormSubmit() {

    if (selectedFiles.length === 0) {
      setMessage('Vyberte nejméně jeden soubor');
      return;
    }
    setLoading(true);
    const formData = new FormData();
    selectedFiles.forEach(file => formData.append('file', file));

    axios.post(`${urlLogs}/upload`, formData, {

      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        setLoading(false);
        console.log(response);
        setMessage('Soubor byl úspěšně nahrán do DB');
        setTimeout(clearMessage, 3000);
      })
      .catch(() => {
        setLoading(false);
        setMessage(`Nahrání souboru selhalo`);
        setTimeout(clearMessage, 3000);
      });

    setSelectedFiles([]);
  };

  const removeFile = (fileName: string) => {
    const updatedFiles = selectedFiles.filter(file => file.name !== fileName);
    setSelectedFiles(updatedFiles);
  };




  const clearMessage = () => {
    setMessage('');
  };

  return (
    <div className='set-marker-container'>

      <form>
        <label htmlFor="file" className="upload-button" onClick={() => clearMessage}>
          Pridat nový zaznam .csv
          <input type="file" id="file" name="file" accept="text/csv" value={fileInputValue} onChange={onFileChange} multiple style={{ display: 'none' }} />
        </label>
        <button type="button" className='file-submit-btn' disabled={selectedFiles.length ? false : true} onClick={onFormSubmit}>Poslat do databaze</button>



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
        {/* {loading ? <img src="loading.gif" alt="Loading" /> : <p>{message}</p>} */}
        {loading ? <p>...nahravam...</p> : <p>{message}</p>}




      </form>

    </div>
  );
}

export default FileUploadForm;