//dependecies
import { MapContainer, TileLayer, Marker, Popup, Polyline, LayerGroup, FeatureGroup, Rectangle, Circle } from 'react-leaflet'
import { useRef, useEffect, useState } from 'react';

//styles
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
//data
import log1 from '../data/log1.json'

//components
import DragZnacka from './dragZnacka';
import { marker } from 'leaflet';

interface MapComponentProps {
  currentTime: number;
  onMarkerChange: (position: [number, number]) => void;
}

export default function MapComponent(props: MapComponentProps) {

  const [currentLocation, setCurrentLocation] = useState([log1[log1.length - 1].lat, log1[log1.length - 1].lon]);
  const [activeTower, setActiveTower] = useState(log1[log1.length - 1].cellid);
  const [pathInTime, setPathInTime] = useState<[number, number][]>([]);


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
  const center = mapcenter();
  const [markerLocation, setMarkerLocation] = useState(mapcenter())
  useEffect(() => {
    let tempPathInTime: [number, number][] = [];
    log1.forEach(location => {
      if ((location.timestamp) <= props.currentTime) {
        tempPathInTime.push([location.lat, location.lon]);
        setActiveTower(location.cellid);
      }
    });
    setPathInTime(tempPathInTime);
    setCurrentLocation(tempPathInTime[tempPathInTime.length - 1]);
    //setDistance
  }, [props.currentTime]);

  useEffect(() => {
    props.onMarkerChange(markerLocation);
    //setDistance
  }, [markerLocation]);




  return (
    <>
      <div className='col-9'>
        {/* <MapContainer center={mapcenter()} zoom={15} scrollWheelZoom={true} > */}
        <MapContainer center={mapcenter()} zoom={15} scrollWheelZoom={true} >

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <DragZnacka positions={center} onPositionChange={setMarkerLocation} />
          <Polyline positions={pathInTime} color="red" />
        </MapContainer>
      </div>
    </>
  )
}