import React from 'react'
import { formatTimeStamp } from '../../utils/utils';

//basic table for modal form - files to choose form database
interface FileInfoProps {
  logId: number;
  csvFileId: string;
  csvFileName: string;
  userId: string;
  uploadDate: string;
  firstTimeStamp: number;
  lastTimeStamp: number;
}

export default function FileInfo(props: FileInfoProps) {
  return (
    <>
      <td className='col-2'>{props.csvFileName}</td>
      <td className='col-3'>{props.uploadDate}</td>
      <td className='col-3'>{formatTimeStamp(props.firstTimeStamp)}</td>
      <td className='col-3'>{formatTimeStamp(props.lastTimeStamp)}</td>
    </>

  )
}
