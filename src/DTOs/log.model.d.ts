import { LogInfoDTO } from "./logInfoDTO";
export interface logDTO {
  logDisplayID: string;
  onLogHide: (logDisplayId: string) => void;
  currentTime: number;
  markerLocation: [number, number];
  pathInTime?: [{ lat: number, lon: number, timestamp: number }]
  data: LogInfoDTO[];
  onCellChange: (currentCell: string) => void;
}