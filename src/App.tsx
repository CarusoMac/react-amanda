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

function App() {
  const [currentTime, setCurrentTime] = useState(0); //in ms
  const [markerLocation, setMarkerLocation] = useState<[number, number]>([0, 0]);
  const [dataList, setDataList] = useState<LogInfoDTO[][]>([]);
  const [timeStampRange, setTimeStampRange] = useState<[number, number]>([0, 1]);

  useEffect(() => {
    let timeStamps: number[] = [];
    dataList.map((data) => {
      data.map(timeStamp => {
        timeStamps.push(timeStamp.measured_at);
      });
    })
    const min = Math.min(...timeStamps);
    const max = Math.max(...timeStamps);
    setTimeStampRange([min, max]);
    setCurrentTime(min)
  }, [dataList])

  const handleNewDataList = (newDataList: LogInfoDTO[][]) => {
    setDataList(newDataList)
  }

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
          />
          <DataListContainer 
          currentTime={currentTime} 
          markerLocation={markerLocation} 
          onDataListChange={handleNewDataList} />
        </div>
      </div>
    </>
  );
}

export default App;