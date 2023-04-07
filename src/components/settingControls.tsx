


import React from 'react'
import { useState, useEffect, useRef } from 'react';


//data
import '../App.css'
import Znacka from './znacka';

//utils
import { formatTimeStamp } from '../utils/utils';
import FileUploadForm from './forms/uploadForm';

interface SettingControlsProps {
  onRangeSet: (newTime: number) => void;
  currentTime: number;
  timeStampRange: [number, number];
  markerLocation: [number, number];
  setMarkerLocation: (newMarkerLocation: [number, number]) => void
}

export default function SettingControls(props: SettingControlsProps) {

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.valueAsNumber;
    props.onRangeSet(newTime);
  };

  //controlls buttons**********************************************
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayButtonClick = () => {
    setIsPlaying(true);
  };

  const handlePauseButtonClick = () => {
    setIsPlaying(false);
  }

  const handleBackwardButtonClick = () => {
    let tempTime = props.currentTime
    props.onRangeSet(tempTime - 30000);
  };

  const handleForwardButtonClick = () => {
    let tempTime = props.currentTime
    props.onRangeSet(tempTime + 30000);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isPlaying) {
        let temptime = props.currentTime;
        if (temptime < props.timeStampRange[1]) {
          props.onRangeSet(temptime + 30000);
        } else {
          setIsPlaying(false);
        }
      }
    }, 1000);
    return () => {
      clearTimeout(intervalId);
    };
  }, [props.currentTime, isPlaying]);

  return (
    <>
      <div className="d-flex justify-content-between header-control-container">
        <div className="set-control-card col-4">
          <div className="set-control-container">
            <h3>Nastaveni casu</h3>

            <div className="range-slider-container">
              <input className='range-slider' type='range' min={props.timeStampRange[0]} max={props.timeStampRange[1]} step='30000' value={props.currentTime} onChange={handleTimeChange} />
            </div>

            <div className="slider-controls-container">
              <div className="slider-controls">
                <button className="backward-button" onClick={handleBackwardButtonClick}>&lt; &lt;</button>
                <button className="play-button" onClick={handlePlayButtonClick}>&#9654;</button>
                <button className="pause-button" onClick={handlePauseButtonClick}>&#x7C;&#x7C;</button>
                <button className="forward-button" onClick={handleForwardButtonClick}>&gt; &gt;</button>
              </div>
            </div>

            <div>
              {formatTimeStamp(props.currentTime)}
            </div>
          </div>
        </div>
        <div className="set-control-card col-3">

          <Znacka markerLocation={props.markerLocation} setMarkerLocation={props.setMarkerLocation} />

        </div>
        <div className="set-control-card col-4 d-flex align-items-center text-center">
          <p>Uzivatelske okno, nastaveni, nebo seznam intersekci,..</p>

        </div>
      </div>

    </>
  )
}