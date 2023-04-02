export interface logDTO {
  logID: string;
  onLogDelete: (logId: string) => void;
  currentTime: number;
  markerLocation: [number, number];
  pathInTime?: [{ lat: number, lon: number, timestamp: number }]
  "MobileCountryCode": number;
  "MobileNetworkCode": number;
  "LocationAreaCode": number;
  "cellid": number;
  "lat": number;
  "lon": number;
  "signal": number;
  "timestamp": number;
  "rating": number;
  "speed": number;
  "direction": number;
  "Accesstechnology": string,
  "TimingAdvance": number;
  "Primaryscramblingcode": number;
  "TrackingAreaCode": number;
  "PhysicalCellID": number;
  "SystemID": number;
  "NetworkID": number;
  "BaseStationID": number;
}