import React, { useState, useEffect, useRef } from 'react';
import { formatTimeStamp } from '../utils/utils';

export default function TimeComponent() {
  const [time, setTime] = useState(new Date());
  const timeRef = useRef<Date>(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      timeRef.current.setTime(Date.now());
      setTime(new Date(timeRef.current));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>{formatTimeStamp(time.getTime())}</>
  );
};
