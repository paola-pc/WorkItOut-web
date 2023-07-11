'use client';
import { set } from "mongoose";
import { useEffect, useState } from "react";
import Button from "../Button";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => setTime(time + 1), 10)
    }
    return () => clearInterval(interval)
  }, [time, isRunning])

  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  const startStop = () => {
    setIsRunning(!isRunning);
  }

  const reset = () => {
    setTime(0);
  }

  return (
    <div className="relative">
      <div className="absolute mt-24 flex flex-col items-center p-10 ">
        <div id="time-container" className="text-2xl">
          <span>{hours.toString().padStart(2, '0')}:</span>
          <span>{minutes.toString().padStart(2, '0')}:</span>
          <span>{seconds.toString().padStart(2, '0')}:</span>
          <span>{milliseconds.toString().padStart(2, '0')}</span>
        </div>
        <div id="button-container" className="flex w-[200px]">
          <Button label={isRunning ? 'Pause' : 'Start'} onClick={startStop} small/>
          <Button label="Reset" onClick={reset} small outline/>
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;