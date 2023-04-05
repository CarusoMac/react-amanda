import React, { useEffect, useState } from 'react';
import LogInfo from './logInfo';
import { logDTO } from '../DTOs/log.model';
import axios, { AxiosResponse } from 'axios';
import { urlLogs } from '../endpoints';
import ModalForm from './forms/modalForm';
import { LogInfoDTO } from '../DTOs/logInfoDTO';


interface DataListContainerProps {
  currentTime: number;
  markerLocation: [number, number];
  onDataListChange: (newDataList: LogInfoDTO[][]) => void
}

export default function DataListContainer(props: DataListContainerProps) {
  const [logsToDisplay, setLogsToDisplay] = useState<string[]>([]);
  const [LogDeleteId, setLogDeleteId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [listDb, setListDb] = useState<logDTO[]>([]);
  const [dataList, setDataList] = useState<LogInfoDTO[][]>([]);

  // getting checked box , selected logs from DB
  useEffect(() => {
    Promise.all(logsToDisplay.map(file => axios.get<LogInfoDTO[]>(`${urlLogs}/${file}`)))
      .then(responses => {
        const dataList: LogInfoDTO[][] = responses.map(response => response.data);
        const tempDatalist = dataList;
        setDataList(tempDatalist);
        props.onDataListChange(tempDatalist);
      })
      .catch(error => {
        console.error("error: " + error);
      });
  }, [logsToDisplay]);


  // x button on loginfo
  function handleLogHide(newValue: string) {
    setLogDeleteId(newValue);
    const tempLogsToDisplay = logsToDisplay.filter(item => item !== newValue); // remove the matching item from the array
    setLogsToDisplay(tempLogsToDisplay);
  }

  //checkbox - display from db, callback
  function handleDisplayChange(newLogsToDisplay: string[]) {
    setLogsToDisplay(newLogsToDisplay)
  }

  function generateRandomKey() {
    return Math.floor(Math.random() * 1000000);
  }

  return (
    <div className='col-3 datalist-container'>

      <button className="plus-button" onClick={() => {
        // onAPIRequest();
        setShowModal(true);
      }}>Přidat záznam</button>
      {showModal &&
        <ModalForm showModal={showModal} handleModalClose={() => setShowModal(false)} onDisplayChange={handleDisplayChange} />
      }

      <ul style={{ listStyle: 'none' }}>

        {dataList.map((zaznam) =>
          <li key={generateRandomKey()}>
            <LogInfo data={zaznam} logDisplayID={zaznam[0].csvFileId} onLogHide={handleLogHide} currentTime={props.currentTime} markerLocation={props.markerLocation} />
          </li>)
        }
      </ul>
    </div>
  );
}
