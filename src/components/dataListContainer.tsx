import React, { useEffect, useState } from 'react';
import LogInfo from './logInfo';

const numberOfActiveLogs = 3; //fetch z db
//fetch z DB bude dotaz na DB na vsechny logy zobrazi se okno s datem vytvoreni a jmenem logu + datum dne ze ktereho ten log je, po odskrtnuti checkboxu a submitu se nahrajou logy do jsonu

// z vytvoreneho jsonu bude probihat zobrazovani a vypocty ve frontendu

export default function DataListContainer() {
  const [logsIDarr, setLogsIDarr] = useState(['2Ad', 'B', 'C']); //info vytazene z vytvoreneho jsonu
  const [LogDeleteId, setLogDeleteId] = useState('');

  useEffect(() => {
    if (LogDeleteId) {
      setLogsIDarr((prevLogsIDarr) =>
        prevLogsIDarr.filter((logId) => logId !== LogDeleteId)
      );
    }
  }, [LogDeleteId]);

  return (
    <div className='col-3 datalist-container'>
      {/* {logsIDarr.map((logID) => <LogInfo logID={logID} onDeleteLog={setLogsIDarr} />)} */}
      {logsIDarr.map((logID) => <LogInfo key={logID} logID={logID} onLogDelete={setLogDeleteId} />)}
    </div>
  );
}

// import React, { useState } from 'react';
// import LogInfo from './logInfo';

// interface DataListContainerProps {
//   numberOfActiveLogs: number;
// }

// export default function DataListContainer(props: DataListContainerProps) {
//   const [logsIDarr, setLogsIDarr] = useState<string[]>(['2Ad']);

//   const handleDeleteLog = (deleteLogId: string) => {
//     setLogsIDarr((prevLogsIDarr) => prevLogsIDarr.filter((logId) => logId !== deleteLogId));
//   };

//   const logInfoList = logsIDarr.map((logId) => (
//     <LogInfo key={logId} logID={logId} setLogsIDarr={handleDeleteLog} />
//   ));

//   return <div className='col-3 datalist-container'>{logInfoList}</div>;
// }