import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { urlLogs } from '../endpoints';
import { ListDTO } from '../DTOs/listDTO';

interface LogTitleProps {
  csvFileId: string
}

export default function LogTitle(props: LogTitleProps) {
  const [title, setTitle] = useState('');
  // const [isFocused, setIsFocused] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<ListDTO | null>(null);
  const [onUpdate, setOnUpdate] = useState(true)
  //handle setting custom title

  useEffect(() => {
    const id = props.csvFileId;
    axios.get<ListDTO>(`${urlLogs}/import/${id}`)
      .then(response => {
        setFile(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [onUpdate]);

  useEffect(() => {
    setTitle(file ? file.fileTitle : '');
  }, [file]);

  // handle input change
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }

  const handlePutTitle = () => {
    const id = props.csvFileId;
    axios.put(`${urlLogs}/update/${id}`, { fileTitle: title })
      .then(response => {
        console.log(response.data);
        setOnUpdate(!onUpdate);
      })
      .catch(error => {
        console.error(error);
      });
  }


  return (
    <>
      <div className='d-flex'>
        <p className='log-p-title'>
          <input className='log-title'
            type="text"
            value={title}
            onChange={handleTitleChange}
            onBlur={handlePutTitle}
            ref={titleRef}
          />
        </p>
      </div>
    </>
  );
}