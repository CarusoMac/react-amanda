import React from 'react'


interface LogDbModalProps {
  logId: number;
  csvFileId: number;
  csvFileName: string;
  userId: string;
  uploadDate: string;
  firstTimeStamp: number;
  lastTimeStamp: number;
}

export default function LogDbModal(props: LogDbModalProps) {
  return (


    <tr className='row'>
      <td className='col-2'>{props.csvFileName}</td>
      <td className='col-3'>{props.uploadDate}</td>
      <td className='col-3'>{props.firstTimeStamp}</td>
      <td className='col-3'>{props.lastTimeStamp}</td>
      <td className='col-1'><input type='checkbox' /></td>
    </tr>


  )
}
