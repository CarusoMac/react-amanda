import React, { useRef, useState, useEffect } from 'react'
import data from '../data/log1.json'

interface LogInfoProps {
  logID: string;
  onLogDelete: (logId: string) => void;
  currentTime: number;
}


// fetch z DB na log s logID /. json export / lat, lon, measured_at

export default function LogInfo(props: LogInfoProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentLat, setCurrentLat] = useState(0);
  const [currentLon, setCurrentLon] = useState(0);
  const [currentCell, setCurrentCell] = useState(0);
  const targetDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Find the data point with the closest timestamp to the current time
    const closestDataPoint = data.reduce((closest, current) => {
      const closestTimeDiff = Math.abs(closest.timestamp - props.currentTime);
      const currentTimeDiff = Math.abs(current.timestamp - props.currentTime);
      return currentTimeDiff < closestTimeDiff ? current : closest;
    });

    // Update the lat and lon values to match the closest data point
    setCurrentLat(closestDataPoint.lat);
    setCurrentLon(closestDataPoint.lon);
    setCurrentCell(closestDataPoint.cellid);
    // ... do something with tempLat and tempLon ...
  }, [props.currentTime]);

  const handleHideButtonClick = () => {
    if (targetDivRef.current) {
      targetDivRef.current.style.display = isVisible ? 'none' : 'block';
      setIsVisible(!isVisible);
    }
  };

  const handleLogDelete = () => {
    const deletedId = props.onLogDelete(props.logID);
  };

  return (
    <div className='log-info-card'>

      <h3>{props.logID}</h3>
      <p>
        lat: {currentLat}<br />
        lng: {currentLon}
      </p>
      <button onClick={handleHideButtonClick}>
        {isVisible ? (
          <span dangerouslySetInnerHTML={{ __html: '&#9679;&#9679;&#9679;' }} />
        ) : (
          <span dangerouslySetInnerHTML={{ __html: '&#9679;&#9679;&#9679;' }} />
        )}
      </button>

      <div className='log-info-controls'>
        {/* po clicku na delete */}
        <button className='log-delete' name={props.logID} onClick={handleLogDelete}>
          X
        </button>
        <input type="checkbox" />


      </div>

      <div ref={targetDivRef} style={{ display: 'none' }}>

        <hr />
        cellID: {currentCell}<br />
        vzdalenost od znacky
        <p>
          akt
        </p>
        <p>
          min
          case
        </p>
        <hr />
        <p>
          cas od <br />
          cas do
        </p>
      </div>




    </div>
  )
}
