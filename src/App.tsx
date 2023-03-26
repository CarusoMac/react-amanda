//dependecies
import React from 'react';

//styles
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

//components
import MapComponent from './components/mapAmanda';
import SettingControls from './components/settingControls';
import DataListContainer from './components/dataListContainer';




function App() {
  return (
    <>
      <div className='main-container container'>
        <SettingControls />
        {/* <UploadFile /> */}
        <div className='row'>
          <MapComponent />
          <DataListContainer />
        </div>

        {/* according to first and last coordinates, set zoom and center the map */}

      </div>
    </>
  );
}

export default App;
