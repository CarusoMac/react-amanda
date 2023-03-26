import React from 'react'
import { useState, useEffect, useRef } from 'react';

//data
import log1 from '../data/log1.json' // fetch from .NET here
import '../App.css'

interface SettingControlsProps {
  onRangeSet: (newTime: number) => void;
  currentTime: number;
  firstTimeStamp: number;
  lastTimeStamp: number;
}

function formatTimeStamp(timestamp: number) {
  let date = new Date(timestamp);
  let options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };
  return (date.toLocaleDateString('cs-CZ', options));
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
      if (props.currentTime < props.lastTimeStamp + 30000 && isPlaying) {
        let temptime = props.currentTime;
        props.onRangeSet(temptime + 30000);
      }
    }, 1000);
    return () => {
      clearTimeout(intervalId);
    };
  }, [props.currentTime, isPlaying]);



  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="set-control-card col-4">
          <div className="set-control-container">
            <h3>Nastaveni casu</h3>

            <div className="range-slider-container">
              <input className='range-slider' type='range' min={props.firstTimeStamp} max={props.lastTimeStamp} step='30000' value={props.currentTime} onChange={handleTimeChange} />
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
        <div className="set-control-card col-4">Znacka</div>
        <div className="set-control-card col-4">Upload</div>
      </div>

    </>
  )
}