import React, { useRef, useCallback, useMemo, useState, useEffect } from 'react'
import { Marker, Popup } from 'react-leaflet'
import L, { LatLng } from 'leaflet';


interface DragZnackaProps {
  positions: [number, number]
  handleDrag: (position: [number, number]) => void;
}

export default function DragZnacka(props: DragZnackaProps) {

  const [position, setPosition] = useState<[number, number]>([props.positions[0], props.positions[1]]);
  const markerRef = useRef<L.Marker<any>>(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          const latlng: LatLng = marker.getLatLng()
          props.handleDrag([latlng.lat, latlng.lng]);

        }
      },
    }),
    [],
  )

  useEffect(() => {
    setPosition([props.positions[0], props.positions[1]])
  }, [props.positions])



  return (
    <Marker
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      draggable={true}>

    </Marker>
  )
}
