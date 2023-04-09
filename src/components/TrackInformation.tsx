import React, { useRef, useState, useEffect } from 'react'
// import data from '../data/log1.json'
import { distance, formatTimeStamp, findClosestTimestamp } from '../utils/utils';
import { logDTO } from '../DTOs/log.model';
import axios, { AxiosResponse } from 'axios';
import { LogInfoDTO } from '../DTOs/logInfoDTO';
import LogTitle from './TrackTitile';



export default function LogInfo(props: logDTO) {
  const [currentLat, setCurrentLat] = useState(0);
  const [currentLon, setCurrentLon] = useState(0);
  const [currentCell, setCurrentCell] = useState('');
  const [distanceFromMarker, setDistanceFromMarker] = useState(0);
  const [minDistance, setMinDistance] = useState(0);
  const [minDistanceTime, setMinDistanceTime] = useState(0);


  const data = props.data;
  const distances = data.map(point => ({ distance: distance(props.markerLocation[0], props.markerLocation[1], point.lat, point.lon), time: point.measured_at }));
  //update on current Time
  useEffect(() => {
    let closestLocation = null;
    for (let i = 0; i < data.length; i++) {
      const location = data[i];
      if (location.measured_at <= props.currentTime) {
        if (!closestLocation || location.measured_at > closestLocation.measured_at) {
          closestLocation = location;
        }
      }
    }
    if (closestLocation) {
      setCurrentCell(closestLocation.cellid);
      setCurrentLat(closestLocation.lat);
      setCurrentLon(closestLocation.lon);
    }
  }, [props.currentTime, data]);

  //update current distance from marker on current location change
  useEffect(() => {
    const newDistance = distance(currentLat, currentLon, props.markerLocation[0], props.markerLocation[1])
    setDistanceFromMarker(newDistance);
  }, [currentLat, currentLon]);


  // min distance from marker
  useEffect(() => {
    const newDistance = distance(currentLat, currentLon, props.markerLocation[0], props.markerLocation[1])
    setDistanceFromMarker(newDistance);
    const { distance: minDistance, time: minDistanceTime } = distances.reduce((min, current) => current.distance < min.distance ? current : min);
    setMinDistance(minDistance);
    setMinDistanceTime(minDistanceTime);
  }, [props.markerLocation]);

  //tested ok
  const handleLogHide = () => {
    const newValue = props.logDisplayID
    props.onLogHide(newValue);
  };

  return (
    <div className='log-info-card container'>
      <div className='row header'>
        <div className='col-10'>
          <LogTitle csvFileId={props.logDisplayID} />
        </div>
        <div className='d-flex justify-content-end col-1'>
          <button className='log-delete' name={props.logDisplayID} onClick={handleLogHide}>
            x
          </button>
        </div>
      </div>

      <p>
        <span className="orange">lat:</span> <span>{currentCell ? currentLat : ""}</span> <br />
        <span className="orange">lng:</span> <span>{currentCell ? currentLon : ""}</span>
      </p>


      <hr />
      <p><span className='orange'>cellID:</span> <span>{currentCell}</span></p>
      <hr />
      <p><span className='orange'>aktuálně od značky: </span> <span>{(currentCell && props.markerLocation[0] !== 0) ? distanceFromMarker : ""} m</span></p>

      <hr />
      <p><span className='orange'>min od značky: </span> <span>{props.markerLocation[0] !== 0 ? minDistance : ""} m</span></p>
      <p>{formatTimeStamp(minDistanceTime)}</p>
    </div>
  )
}
