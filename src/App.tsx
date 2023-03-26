//dependecies
import React from 'react';
import { useState } from 'react';

//styles
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

//components
import MapComponent from './components/mapAmanda';
import SettingControls from './components/settingControls';
import DataListContainer from './components/dataListContainer';




function App() {
  const [currentTime, setCurrentTime] = useState(0); //in ms
  return (
    <>
      <div className='main-container container'>
        <SettingControls onRangeSet={setCurrentTime} currentTime={currentTime} />
        {/* <UploadFile /> */}
        <div className='row'>
          <MapComponent currentTime={currentTime} />
          <DataListContainer />
        </div>

        {/* according to first and last coordinates, set zoom and center the map */}

      </div>
    </>
  );
}

export default App;
