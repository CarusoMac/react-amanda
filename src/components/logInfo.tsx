import React, { useRef, useState } from 'react'

interface LogInfoProps {
  logID: string;
  onLogDelete: (logId: string) => void;
}

// fetch z DB na log s logID /. json export / lat, lon, measured_at

export default function LogInfo(props: LogInfoProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [deleteLogId, setDelteLogId] = useState('');

  const targetDivRef = useRef<HTMLDivElement>(null);

  const handleHideButtonClick = () => {
    if (targetDivRef.current) {
      targetDivRef.current.style.display = isVisible ? 'none' : 'block';
      setIsVisible(!isVisible);
    }
  };

  const handleLogDelete = () => {
    setDelteLogId(props.logID);
    const deletedId = props.onLogDelete(props.logID);

  };

  return (
    <div className='log-info-card'>

      <h3>{props.logID}</h3>
      <p>
        lat:<br />
        lng:
      </p>

      <button onClick={handleHideButtonClick}>
        {isVisible ? (
          <span dangerouslySetInnerHTML={{ __html: '&#9679;&#9679;&#9679;' }} />
        ) : (
          <span dangerouslySetInnerHTML={{ __html: '&#9679;&#9679;&#9679;' }} />
        )}
      </button>

      <div className='log-info-controls'>
        {/* po clicku na delete */}
        <button className='log-delete' name={props.logID} onClick={handleLogDelete}>
          X
        </button>
        <input type="checkbox" />


      </div>

      <div ref={targetDivRef} style={{ display: 'none' }}>
        <hr />
        vzdalenost od znacky
        <p>
          akt
        </p>
        <p>
          min
          case
        </p>
        <hr />
        <p>
          cas od <br />
          cas do
        </p>
      </div>




    </div>
  )
}
