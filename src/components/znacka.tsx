import React, { ChangeEvent, useEffect, useState } from 'react'
import icon from 'leaflet/dist/images/marker-icon.png'

interface ZnackaProps {
  markerLocation: [number, number]
  setMarkerLocation: (newMarkerLocation: [number, number]) => void
}

export default function Znacka(props: ZnackaProps) {

  const handleMarkerLonChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.setMarkerLocation([props.markerLocation[0], parseFloat(event.target.value)]);
  }

  const handleMarkerLatChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.setMarkerLocation([parseFloat(event.target.value), props.markerLocation[1]]);
  }


  return (

    <div className='set-marker-container'>
      <div className='set-marker-header'>
        <h3>Značka</h3>
        <img src={icon} alt="icon" />
      </div>
      <label htmlFor="latitude">
        <input type="number" id="latitude"
          name="latitude" placeholder="zeměpisná šířka"
          value={props.markerLocation[0]}
          step="0.001"
          onChange={handleMarkerLatChange} /> lat</label> <br />
      <label htmlFor="longitude">
        <input type="number" id="longitude" name="longitude" placeholder="zeměpisná délka" value={props.markerLocation[1]}
          step="0.001"
          onChange={handleMarkerLonChange} /> lng</label>
    </div>
  )
}