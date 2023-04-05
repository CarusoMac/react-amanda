import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { urlLogs } from '../../endpoints';
import { logDTO } from '../../DTOs/log.model';

interface FileUploadFormProps {
  isNewUpload: (isNewUpload: boolean) => void;
}

export default function FileUploadForm(props: FileUploadFormProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState(false);
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

    const formData = new FormData();
    selectedFiles.forEach(file => formData.append('file', file));

    try {
      const response = await axios.post(`${urlLogs}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setLoading(false);
      console.log(response);
      setMessage('Soubor byl úspěšně nahrán do DB');
      setTimeout(clearMessage, 3000);
      setSelectedFiles([]); //vybrane soubory z fs pripravene k nahrani do db - jsou nahrane -- nuluje se
      await props.isNewUpload(!isNewUpload);
      console.log("uploadform: nastaveni zmeny na is new upload");
    } catch (error) {
      setLoading(false);
      setMessage(`Nahrání souboru selhalo`);
      setTimeout(clearMessage, 3000);
    }
  };

  //mazani vybranych souboru z fs pred odeslanim do DB
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

