//dependecies
import { MapContainer, TileLayer, Polyline, LayerGroup, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet';
import { useEffect, useState } from 'react';
//components
import DragZnacka from './Drag';
import { LogInfoDTO } from '../DTOs/logInfoDTO';
import { BtsTowerModel } from '../DTOs/btsTowerModel';


interface MapComponentProps {
  currentTime: number;
  onMarkerChange: (position: [number, number]) => void;
  dataList: LogInfoDTO[][];
  markerLocation: [number, number];
  btsTowers: BtsTowerModel[];
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

const btsIcon = new Icon({
  iconUrl: process.env.PUBLIC_URL + '/icons/signal-tower-icon.png',
  iconSize: [32, 32],
});

export default function MapComponent(props: MapComponentProps) {
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
          {props.btsTowers.map((tower, index) => (
            <Marker key={index} position={[tower.lat, tower.lon]} icon={btsIcon}>
              <Popup>{
                tower.cellid +
                "lat: " + tower.lat +
                "lon: " + tower.lon}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </>
  )
}