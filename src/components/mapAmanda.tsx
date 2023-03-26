//dependecies
import { MapContainer, TileLayer, Marker, Popup, Polyline, LayerGroup, FeatureGroup, Rectangle, Circle } from 'react-leaflet'

//styles
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
//data
import log1 from '../data/log1.json'

export default function MapComponent() {

  const mapcenter = () => {
    let pathCoordinates: [number, number][] = [];
    log1.map(location => {
      pathCoordinates.push([location.lat, location.lon]);
    });
    return pathCoordinates.reduce(
      (acc, cur) => [acc[0] + cur[0] / pathCoordinates.length, acc[1] + cur[1] / pathCoordinates.length],
      [0, 0]
    )
  }

  return (
    <>
      <div className='col-9'>
        <MapContainer center={mapcenter()} zoom={16} scrollWheelZoom={true} >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* <FeatureGroup pathOptions={purpleOptions}>
          {grid(mapCenter)}
        </FeatureGroup> */}
          {/* {uniqueTowers.map((tower, index) =>
          <Markers key={index} cellid={tower.cellid} lat={tower.lat} lon={tower.lon} />
        )} */}
          {/* <Polyline positions={pathInTime} color="red" /> */}
        </MapContainer>
      </div>
    </>
  )
}