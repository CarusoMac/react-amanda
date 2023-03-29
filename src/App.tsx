//dependecies
import React from 'react';
import { useState, useEffect } from 'react';
import log1 from './data/log1.json' // fetch from .NET here
//styles
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

//components
import MapComponent from './components/mapAmanda';
import SettingControls from './components/settingControls';
import DataListContainer from './components/dataListContainer';


let timeStamps: number[] = [];
log1.map(timeStamp => {
  timeStamps.push(timeStamp.timestamp);
});
let firstTimeStamp = timeStamps[0];
let lastTimeStamp = timeStamps[timeStamps.length - 1];


function App() {
  const [currentTime, setCurrentTime] = useState(firstTimeStamp); //in ms
  const [markerLocation, setMarkerLocation] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    console.log(markerLocation);
    //setDistance
  }, [markerLocation]);

  return (
    <>
      <h2> 29/3/2023</h2>
      <div className='main-container container'>
        <SettingControls onRangeSet={setCurrentTime} currentTime={currentTime} firstTimeStamp={firstTimeStamp} lastTimeStamp={lastTimeStamp} markerLocation={markerLocation} />
        {/* <UploadFile /> */}
        <hr />
        <div className='row'>
          <MapComponent currentTime={currentTime} onMarkerChange={setMarkerLocation} />
          <DataListContainer currentTime={currentTime} markerLocation={markerLocation} />

        </div>

        {/* according to first and last coordinates, set zoom and center the map */}

      </div>

    </>
  );
}

export default App;
