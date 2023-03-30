import React from 'react'
import icon from 'leaflet/dist/images/marker-icon.png'

interface ZnackaProps {
  markerLocation: [number, number]
}

export default function Znacka(props: ZnackaProps) {
  return (
    <div className='set-marker-container'>
      <div className='set-marker-header'>
        <h3>Značka</h3>
        <img src={icon} alt="icon" />
      </div>
      <label htmlFor="latitude">
        <input type="number" id="latitude" name="latitude" placeholder="zeměpisná šířka" value={props.markerLocation[0]} /> lat</label> <br />
      <label htmlFor="longitude">
        <input type="number" id="longitude" name="longitude" placeholder="zeměpisná délka" value={props.markerLocation[1]} /> lng</label>
    </div>
  )
}
