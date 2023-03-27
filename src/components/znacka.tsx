import React from 'react'

export default function Znacka() {
  return (
    <div className='set-marker-container'>
      <h3>Značka</h3>
      <label htmlFor="latitude">
        <input type="number" id="latitude" name="latitude" placeholder="zeměpisná šířka" /> lat</label> <br />

      <label htmlFor="longitude">
        <input type="number" id="longitude" name="longitude" placeholder="zeměpisná délka" /> lng</label>
    </div>
  )
}
