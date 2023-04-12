import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { urlLogs } from '../../endpoints';
// import { logDTO } from '../../DTOs/log.model';

interface FileUploadFormProps {
  isNewUpload: (isNewUpload: boolean) => void;
}

export default function FileUploadForm(props: FileUploadFormProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); //selected files from fs
  const [message, setMessage] = useState<string>(''); //error msg
  const [loading, setLoading] = useState(false); //loading state
  const [fileInputValue, setFileInputTypeValue] = useState("");
  const [isNewUpload, setIsNewUpload] = useState(true);

  useEffect(() => {
    setFileInputTypeValue("")
  }, [message])

  //vybrane soubory pripravene k nahrani do db
  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newSelectedFiles = Array.from(event.target.files);
      setSelectedFiles([...selectedFiles, ...newSelectedFiles]);
    }
  };

  async function onFormSubmit() {
    if (selectedFiles.length === 0) {
      setMessage('Vyberte nejméně jeden soubor');
      return;
    }

    try {
      setLoading(true);

      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axios.post(`${urlLogs}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      setLoading(false);
      setMessage('Soubory byly úspěšně nahrány do DB');
      setTimeout(clearMessage, 3000);
      setSelectedFiles([]);             //clear selected files arr
      await props.isNewUpload(!isNewUpload);
    } catch (error) {
      setLoading(false);
      setMessage(`Nahrání souborů selhalo`);
      setTimeout(clearMessage, 3000);
    }
  };

  //deleting selected files from fs before sending to DB - remove btn
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
        {selectedFiles.length === 0 && (
          <label htmlFor="file" className="plus-button" onClick={() => clearMessage}>
            Přidat nový
            <input type="file" id="file" name="file" accept="text/csv" value={fileInputValue} onChange={onFileChange} multiple style={{ display: 'none' }} />
          </label>
        )}
        {selectedFiles.length > 0 && (
          <button type="button" className='file-submit-btn' onClick={onFormSubmit}>
            Přidat
          </button>
        )}

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
        {loading ? <p>...nahrávám...</p> : <p>{message}</p>}
      </form>

    </div>
  );
}

