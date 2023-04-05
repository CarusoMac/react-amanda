import React, { useState, useEffect } from 'react'


interface LogDbModalProps {
  logId: number;
  csvFileId: string;
  csvFileName: string;
  userId: string;
  uploadDate: string;
  firstTimeStamp: number;
  lastTimeStamp: number;

}

export default function LogDbModal(props: LogDbModalProps) {

  return (

    <>

      <td className='col-2'>{props.csvFileName}</td>
      <td className='col-3'>{props.uploadDate}</td>
      <td className='col-3'>{props.firstTimeStamp}</td>
      <td className='col-3'>{props.lastTimeStamp}</td>



    </>

  )
}
