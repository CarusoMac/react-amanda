import React from 'react'

export interface LogInfoDTO {
  logID: string;
  onLogDelete: (logId: string) => void;
  currentTime: number;
  markerLocation: [number, number];
  pathInTime?: [{ lat: number, lon: number, timestamp: number }]
  recordId: string
  csvFileId: string
  mcc: string
  mnc: string
  lac: string
  cellid: string
  lat: number
  lon: number
  signal: string
  measured_at: number
  rating: string
  speed: string
  direction: string
  act: string
  ta: string
  psc: string
  tac: string
  pci: string
  sid: string
  nid: string
  bid: string
  btsLat: number
  btsLon: number
}
