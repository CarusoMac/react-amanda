import React, { useRef, useState, useEffect } from 'react'
// import data from '../data/log1.json'
import { distance, formatTimeStamp, findClosestTimestamp } from '../utils/utils';
import { logDTO } from '../DTOs/log.model';
import axios, { AxiosResponse } from 'axios';
import { LogInfoDTO } from '../DTOs/logInfoDTO';


export default function LogInfo(props: logDTO) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentLat, setCurrentLat] = useState(0);
  const [currentLon, setCurrentLon] = useState(0);
  const [currentCell, setCurrentCell] = useState('');
  const [distanceFromMarker, setDistanceFromMarker] = useState(0);
  const targetDivRef = useRef<HTMLDivElement>(null);

  const [minDistance, setMinDistance] = useState(0);
  const [minDistanceTime, setMinDistanceTime] = useState(0);

  const data = props.data;
  const distances = data.map(point => ({ distance: distance(props.markerLocation[0], props.markerLocation[1], point.lat, point.lon), time: point.measured_at }));



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

  // useEffect(() => {
  //   let tempPathInTime: [number, number][] = [];
  //   data.forEach(location => {
  //     if ((location.measured_at) <= props.currentTime) {
  //       tempPathInTime.push([location.lat, location.lon]);
  //       setCurrentCell(location.cellid);
  //     }
  //   });

  //   setCurrentLat(tempPathInTime[tempPathInTime.length - 1][0]);
  //   console.log(tempPathInTime)
  //   console.log(tempPathInTime[tempPathInTime.length - 1])
  //   setCurrentLon(tempPathInTime[tempPathInTime.length - 1][1]);
  //   //setDistance
  // }, [props.currentTime]);
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

  //dropdown
  // const handleDropDown = () => {
  //   if (targetDivRef.current) {
  //     targetDivRef.current.style.display = isVisible ? 'none' : 'block';
  //     setIsVisible(!isVisible);
  //   }
  // };

  //tested ok
  const handleLogHide = () => {
    const newValue = props.logDisplayID
    props.onLogHide(newValue);
  };


  return (
    <div className='log-info-card container'>
      <div className='row header'>
        <h3 className='col-4 align-self-center'>{props.logDisplayID}</h3>
        <div className='col-8 d-flex align-items-center justify-between log-info-controls'>

          <input type="checkbox" className='mr-1' />
          <button className='log-delete' name={props.logDisplayID} onClick={handleLogHide}>
            X
          </button>

        </div>
      </div>
      <p>

        <span className="orange">lat:</span> <span>{currentCell ? currentLat : ""}</span> <br />
        <span className="orange">lng:</span> <span>{currentCell ? currentLon : ""}</span>
      </p>
      {/* <div ref={targetDivRef} style={{ display: 'none' }}>
       */}
      <div ref={targetDivRef} >
        <hr />
        <p><span className='orange'>cellID:</span> <span>{currentCell}</span></p>
        <hr />
        <p><span className='orange'>aktuálně od značky: </span> <span>{currentCell ? distanceFromMarker : ""} m</span></p>
        <hr />
        <p><span className='orange'>min od značky: </span> <span>{minDistance} m</span></p>
        <p>{formatTimeStamp(minDistanceTime)}</p>
      </div>

      {/* <button onClick={handleDropDown}>
        {!isVisible ? (
          <span dangerouslySetInnerHTML={{ __html: '&#9661;' }} />
        ) : (
          <span dangerouslySetInnerHTML={{ __html: '&#x25B3;' }} />
        )}
      </button> */}

    </div >
  )
}
