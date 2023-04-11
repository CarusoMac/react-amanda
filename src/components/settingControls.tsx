import React from 'react'
import { useState, useEffect } from 'react';

//data
import DragController from './DragController';

//utils
import { formatTimeStamp } from '../utils/utils';
import TimeComponent from './TimeComponent';

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

  const handleButtonClick = (type: string, e: React.MouseEvent<HTMLButtonElement>) => {
    switch (type) {
      case 'play':
        setIsPlaying(true);
        break;
      case 'pause':
        setIsPlaying(false);
        break;
      case 'backward':
        const tempTime = props.currentTime;
        props.onRangeSet(tempTime - 30000);
        break;
      case 'forward':
        const tempTime2 = props.currentTime;
        props.onRangeSet(tempTime2 + 30000);
        break;
      default:
        break;
    }
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
      clearInterval(intervalId);
    };
  }, [props.currentTime, isPlaying]);

  return (
    <>
      <div className="d-flex justify-content-between header-control-container">
        <div className="set-control-card col-4">
          <div className="set-control-container">
            <h3>Nastavení času</h3>
            <div className="range-slider-container">
              <input
                className='range-slider'
                type='range'
                min={props.timeStampRange[0]}
                max={props.timeStampRange[1]}
                step='30000'
                value={props.currentTime}
                onChange={handleTimeChange}
              />
            </div>
            <div className="slider-controls-container">
              <div className="slider-controls">
                <button className="backward-button" onClick={(e) => handleButtonClick('backward', e)}>&lt; &lt;</button>
                <button className="play-button" onClick={(e) => handleButtonClick('play', e)}>&#9654;</button>
                <button className="pause-button" onClick={(e) => handleButtonClick('pause', e)}>&#x7C;&#x7C;</button>
                <button className="forward-button" onClick={(e) => handleButtonClick('forward', e)}>&gt; &gt;</button>
              </div>
            </div>

            <div>
              {props.currentTime !== Infinity ? formatTimeStamp(props.currentTime) : <TimeComponent />}
            </div>
          </div>
        </div>
        <div className="set-control-card col-4">
          <DragController markerLocation={props.markerLocation} setMarkerLocation={props.setMarkerLocation} />
        </div>
        <div className="set-control-card col-3 d-flex align-items-center text-center">
          <p>Uzivatelske okno, nastaveni, nebo seznam intersekci,..</p>
        </div>
      </div>
    </>
  )
}