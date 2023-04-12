//dependecies
import React from 'react';
import { useState, useEffect } from 'react';
//styles
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
//components
import MapComponent from './components/MapComponent';
import SettingControls from './components/settingControls';
import DataListContainer from './components/dataListContainer';
import { LogInfoDTO } from './DTOs/logInfoDTO';
import { BtsTowerModel } from './DTOs/btsTowerModel';

function App() {
  const [currentTime, setCurrentTime] = useState(100); //in ms
  const [markerLocation, setMarkerLocation] = useState<[number, number]>([0, 0]);
  const [dataList, setDataList] = useState<LogInfoDTO[][]>([]);
  const [timeStampRange, setTimeStampRange] = useState<[number, number]>([0, 1]);
  const [btsTowers, setBtsTowers] = useState<BtsTowerModel[]>([]);
  const [currentCell, setCurrentCell] = useState("");

  useEffect(() => {
    let timeStamps: number[] = [];
    let tempBtsTowers: BtsTowerModel[] = [];
    dataList.map((data) => {
      data.map(record => {
        timeStamps.push(record.measured_at);
        if (!tempBtsTowers.some(tower => tower.cellid.trim() === record.cellid.trim())) {
          tempBtsTowers.push({ cellid: record.cellid, lat: record.btsLat, lon: record.btsLon })
        }
      });
    })
    const min = Math.min(...timeStamps);
    const max = Math.max(...timeStamps);
    setTimeStampRange([min, max]);
    setBtsTowers(tempBtsTowers);
    setCurrentTime(min)
  }, [dataList])

  const handleNewDataList = (newDataList: LogInfoDTO[][]) => {
    setDataList(newDataList)
  }
  const handleCellChange = (currentCell: string) => {
    setCurrentCell(currentCell);
  }
  console.log(currentCell);

  return (
    <>
      <div className='main-container container'>
        <SettingControls
          onRangeSet={setCurrentTime}
          setMarkerLocation={setMarkerLocation}
          currentTime={currentTime}
          timeStampRange={timeStampRange}
          markerLocation={markerLocation}
        />
        <hr />
        <div className='row'>
          <MapComponent
            currentTime={currentTime}
            onMarkerChange={setMarkerLocation}
            dataList={dataList}
            markerLocation={markerLocation}
            btsTowers={btsTowers}
            currentCell={currentCell}
          />
          <DataListContainer
            currentTime={currentTime}
            markerLocation={markerLocation}
            onDataListChange={handleNewDataList}
            onCellChange={handleCellChange}
          />
        </div>
      </div>
    </>
  );
}

export default App;