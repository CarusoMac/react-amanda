import React, { useRef, useState, useEffect } from 'react'
import data from '../data/log1.json'
import { distance } from '../utils/utils';
import { logDTO } from './log.model';

// fetch z DB na log s logID /. json export / lat, lon, measured_at

// export default function LogInfo(props: LogInfoProps) {
export default function LogInfo(props: logDTO) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentLat, setCurrentLat] = useState(0);
  const [currentLon, setCurrentLon] = useState(0);
  const [currentCell, setCurrentCell] = useState(0);
  const [distanceFromMarker, setDistanceFromMarker] = useState(0);
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
    const newDistance = distance(currentLat, currentLon, props.markerLocation[0], props.markerLocation[1])
    setDistanceFromMarker(newDistance);
    // ... do something with tempLat and tempLon ...
  }, [props.currentTime, props.markerLocation]);

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
      <div className='row'>
        <h3 className='col-4 align-items-center'>{props.logID}</h3>
        <div className='col-8 d-flex align-items-center justify-content-end log-info-controls'>
          {/* po clicku na delete */}
          <button className='log-delete' name={props.logID} onClick={handleLogDelete}>
            X
          </button>
          <input type="checkbox" />
        </div>
      </div>
      <p>
        lat: {currentLat}<br />
        lng: {currentLon}
      </p>
      <div ref={targetDivRef} style={{ display: 'none' }}>

        <hr />
        cellID: {currentCell}<br />
        <hr />
        vzdalenost od znacky {distanceFromMarker} m
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
      <button onClick={handleHideButtonClick}>
        {isVisible ? (
          <span dangerouslySetInnerHTML={{ __html: '&#9679;&#9679;&#9679;' }} />
        ) : (
          <span dangerouslySetInnerHTML={{ __html: '&#9679;&#9679;&#9679;' }} />
        )}
      </button>
    </div >
  )
}
