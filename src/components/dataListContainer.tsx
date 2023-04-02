import React, { useEffect, useState } from 'react';
import LogInfo from './logInfo';
import { logDTO } from './log.model';
import axios, { AxiosResponse } from 'axios';
import { urlLogs } from '../endpoints';
import ModalForm from './forms/modalForm';


const numberOfActiveLogs = 3; // fake fetch z db
//fetch z DB bude dotaz na DB na vsechny logy zobrazi se okno s datem vytvoreni a jmenem logu + datum dne ze ktereho ten log je, po odskrtnuti checkboxu a submitu se nahrajou logy do jsonu
// z vytvoreneho jsonu bude probihat zobrazovani a vypocty ve frontendu

interface DataListContainerProps {
  currentTime: number;
  markerLocation: [number, number];
  // logs: logDTO[];
}


export default function DataListContainer(props: DataListContainerProps) {
  const [logsIDarr, setLogsIDarr] = useState(['2Ad', 'B', 'C']); //info vytazene z vytvoreneho jsonu
  const [LogDeleteId, setLogDeleteId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [listDb, setListDb] = useState<logDTO[]>([]);

  const onAPIRequest = () => {
    setShowModal(true);
    axios.get(urlLogs)
      .then((response: AxiosResponse<logDTO[]>) => {
        setListDb(response.data);
      })

  }

  useEffect(() => {
    if (LogDeleteId) {
      setLogsIDarr((prevLogsIDarr) =>
        prevLogsIDarr.filter((logId) => logId !== LogDeleteId)
      );
    }
  }, [LogDeleteId]);




  return (
    <div className='col-3 datalist-container'>

      <button className="upload-button" onClick={() => {
        onAPIRequest();
        setShowModal(true);
      }}>Vybrat z databáze</button>
      {showModal &&
        <ModalForm showModal={showModal} handleModalClose={() => setShowModal(false)} />
      }

      {/* <ul style={{ listStyle: 'none' }}>
      
      
      {logsIDarr.map((logID) => <li>
        <LogInfo key={logID} logID={logID} onLogDelete={setLogDeleteId} currentTime={props.currentTime} markerLocation={props.markerLocation} /></li>)}
      
    </ul> */}
    </div>
  );
}
