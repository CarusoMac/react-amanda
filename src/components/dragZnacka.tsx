import React, { useRef, useCallback, useMemo, useState } from 'react'
import { Marker, Popup } from 'react-leaflet'
import L, { LatLng } from 'leaflet';

const center = {
  lat: 51.505,
  lng: -0.09,
}
interface DragZnackaProps {
  positions: [number, number]
  onPositionChange: (position: [number, number]) => void;
}

export default function DragZnacka(props: DragZnackaProps) {
  const [draggable, setDraggable] = useState(false)
  const [position, setPosition] = useState<[number, number]>([props.positions[0], props.positions[1]]);
  const markerRef = useRef<L.Marker<any>>(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          const latlng: LatLng = marker.getLatLng()
          setPosition([latlng.lat, latlng.lng])
          props.onPositionChange([latlng.lat, latlng.lng]);
        }
      },
    }),
    [],
  )
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d)
  }, [])

  return (
    <Marker
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      draggable={draggable}>
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? 'Marker is draggable'
            : 'Click here to make marker draggable'}
        </span>
      </Popup>
    </Marker>
  )
}

