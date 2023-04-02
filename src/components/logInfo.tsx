import React, { useRef, useState, useEffect } from 'react'
import data from '../data/log1.json'
import { distance, formatTimeStamp } from '../utils/utils';
import { logDTO } from './log.model';
import axios, { AxiosResponse } from 'axios';

// fetch z DB na log s logID /. json export / lat, lon, measured_at

// export default function LogInfo(props: LogInfoProps) {
export default function LogInfo(props: logDTO) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentLat, setCurrentLat] = useState(0);
  const [currentLon, setCurrentLon] = useState(0);
  const [currentCell, setCurrentCell] = useState(0);
  const [distanceFromMarker, setDistanceFromMarker] = useState(0);
  const targetDivRef = useRef<HTMLDivElement>(null);
  const distances = data.map(point => ({ distance: distance(props.markerLocation[0], props.markerLocation[1], point.lat, point.lon), time: point.timestamp }));
  const [minDistance, setMinDistance] = useState(0);
  const [minDistanceTime, setMinDistanceTime] = useState(0);


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
    const { distance: minDistance, time: minDistanceTime } = distances.reduce((min, current) => current.distance < min.distance ? current : min);
    setMinDistance(minDistance);
    setMinDistanceTime(minDistanceTime);
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
    <div className='log-info-card container'>
      <div className='row header'>
        <h3 className='col-4 align-self-center'>{props.logID}</h3>
        <div className='col-8 d-flex align-items-center justify-between log-info-controls'>

          <input type="checkbox" className='mr-1' />
          <button className='log-delete' name={props.logID} onClick={handleLogDelete}>
            X
          </button>

        </div>
      </div>
      <p>
        <span className="orange">lat:</span> <span>{currentLat}</span> <br />
        <span className="orange">lng:</span> <span>{currentLon}</span>
      </p>
      <div ref={targetDivRef} style={{ display: 'none' }}>
        <hr />
        <p><span className='orange'>cellID:</span> <span>{currentCell}</span></p>
        <hr />
        <p><span className='orange'>aktuálně od značky: </span> <span>{distanceFromMarker} m</span></p>
        <hr />
        <p><span className='orange'>min od značky: </span> <span>{minDistance} m</span></p>
        <p>{formatTimeStamp(minDistanceTime)}</p>
      </div>
      <button onClick={handleHideButtonClick}>
        {!isVisible ? (

          <span dangerouslySetInnerHTML={{ __html: '&#9661;' }} />

        ) : (
          <span dangerouslySetInnerHTML={{ __html: '&#x25B3;' }} />
        )}
      </button>
    </div >
  )
}
