//dependecies
import { MapContainer, TileLayer, Marker, Popup, Polyline, LayerGroup, FeatureGroup, Rectangle, Circle } from 'react-leaflet'
import { useRef, useEffect, useState } from 'react';

//styles
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
//data


//components
import DragZnacka from './Drag';
import { marker } from 'leaflet';
import { LogInfoDTO } from '../DTOs/logInfoDTO';

interface MapComponentProps {
  currentTime: number;
  onMarkerChange: (position: [number, number]) => void;
  dataList: LogInfoDTO[][];
  markerLocation: [number, number];
}

//vypocteni mapoveho centra
const mapcenter = (logs: LogInfoDTO[][]) => {
  let pathCoordinates: [number, number][] = [];
  logs.forEach(log => {
    log.forEach(location => {
      pathCoordinates.push([location.lat, location.lon]);
    });
  });
  return pathCoordinates.reduce(
    (acc, cur) => [acc[0] + cur[0] / pathCoordinates.length, acc[1] + cur[1] / pathCoordinates.length],
    [0, 0]
  );
};

export default function MapComponent(props: MapComponentProps) {

  // const [currentLocation, setCurrentLocation] = useState([log1[log1.length - 1].lat, log1[log1.length - 1].lon]);
  const [pathInTimeCollection, setPathInTimeCollection] = useState<[number, number][][]>([]);
  const [mapCenter, setMapCenter] = useState<[number, number]>([0, 0]);


  useEffect(() => {
    const newCenter = mapcenter(props.dataList);
    setMapCenter(newCenter);
  }, [props.dataList]);




  useEffect(() => {
    let tempPathInTimeCollection: [number, number][][] = [];
    let dataList = props.dataList;
    dataList.forEach(data => {
      let tempPathInTime: [number, number][] = [];

      data.forEach(location => {
        if ((location.measured_at) <= props.currentTime) {
          tempPathInTime.push([location.lat, location.lon]);
        }
      });
      tempPathInTimeCollection.push(tempPathInTime);
      setPathInTimeCollection(tempPathInTimeCollection);

    })
  }, [props.currentTime]);


  return (
    <>
      <div className='col-9'>
        {/* <MapContainer center={mapcenter()} zoom={15} scrollWheelZoom={true} > */}
        <MapContainer key={mapCenter.toString()} center={mapCenter} zoom={15} scrollWheelZoom={true} >

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <DragZnacka positions={props.markerLocation[0] !== 0 ? props.markerLocation : mapCenter} handleDrag={props.onMarkerChange} />

          <LayerGroup>
            {pathInTimeCollection.map((path, index) => (
              <Polyline key={index} positions={path} color="red" />
            ))}
          </LayerGroup>



        </MapContainer>
      </div>
    </>
  )
}