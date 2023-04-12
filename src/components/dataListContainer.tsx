import React, { useEffect, useState } from 'react';
import LogInfo from './TrackInformation';
import axios from 'axios';
import { urlLogs } from '../endpoints';
import ModalForm from './forms/ModalForm';
import { LogInfoDTO } from '../DTOs/logInfoDTO';


interface DataListContainerProps {
  currentTime: number;
  markerLocation: [number, number];
  onDataListChange: (newDataList: LogInfoDTO[][]) => void
  onCellChange: (currentCell: string) => void;
}

export default function DataListContainer(props: DataListContainerProps) {
  const [logsToDisplay, setLogsToDisplay] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [dataList, setDataList] = useState<LogInfoDTO[][]>([]);
  const [preserveCheckBox, setPreserveCheckBox] = useState<string[]>([]);
  const [currentCell, setCurrentCell] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const responses = await Promise.all(
          logsToDisplay.map(file => axios.get<LogInfoDTO[]>(`${urlLogs}/${file}`))
        );
        const tempDatalist = responses.map(response => response.data);
        setDataList(tempDatalist);
        props.onDataListChange(tempDatalist);
      } catch (error) {
        console.error("error: " + error);
      }
    }
    fetchData();
    setPreserveCheckBox(logsToDisplay);
  }, [logsToDisplay]);

  const handleLogHide = (newValue: string) => {
    setLogsToDisplay(prevLogsToDisplay => prevLogsToDisplay.filter(item => item !== newValue));
  };

  const handleDisplayChange = (newLogsToDisplay: string[]) => {
    setLogsToDisplay(newLogsToDisplay);
  };

  const handleCellChange = (currentCell: string) => {
    setCurrentCell(currentCell);
    props.onCellChange(currentCell);
  }


  return (
    <div className='col-3 datalist-container'>
      <div className="d-flex justify-content-end style={{ marginLeft: '10px' }}">
        <button className="plus-button" onClick={() => {
          setShowModal(true);
        }}>Vybrat záznam</button>
      </div>
      {showModal &&
        <ModalForm showModal={showModal}
          handleModalClose={() => setShowModal(false)}
          onDisplayChange={handleDisplayChange}
          preserveCheckBox={preserveCheckBox} />
      }

      <ul style={{ listStyle: 'none' }}>
        {dataList.map((zaznam) =>
          <li key={zaznam[0].csvFileId}>
            <LogInfo
              data={zaznam}
              logDisplayID={zaznam[0].csvFileId}
              onLogHide={handleLogHide}
              currentTime={props.currentTime}
              markerLocation={props.markerLocation}
              onCellChange={handleCellChange}
            />
          </li>)
        }
      </ul>
    </div>
  );
}