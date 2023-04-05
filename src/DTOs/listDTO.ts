export interface ListDTO {
  //getting the list of available logs from db

  csvFileId: string;
  csvFileName: string;
  userId: string;
  uploadDate: string;
  firstTimeStamp: number;
  lastTimeStamp: number;
}
