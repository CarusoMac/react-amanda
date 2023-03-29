export interface logDTO {
  logID: string;
  onLogDelete: (logId: string) => void;
  currentTime: number;
  markerLocation: [number, number];
  pathInTime?: [{ lat: number, lon: number, timestamp: number }]
}