"use client";
import { useEffect, useState } from "react";
import Button from "../Button";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(interval);
  }, [time, isRunning]);

  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  const startStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setTime(0);
  };

  return (
    <div className="relative">
      <div
        className="absolute mt-24 flex flex-col items-center p-6
        border border-black border-2
        rounded-lg
        text-neutral-900
      "
      >
        <div
          id="time-container"
          className="
            text-2xl
            text-amber-200 
            bg-black 
            rounded-xl
            p-3 mb-3
          "
        >
          <span style={{ textShadow: "3px 3px 15px #ffffcc" }}>
            {hours.toString().padStart(2, "0")}:
          </span>
          <span style={{ textShadow: "3px 3px 15px #ffffcc"  }}>
            {minutes.toString().padStart(2, "0")}:
          </span>
          <span style={{ textShadow: "3px 3px 15px #ffffcc"  }}>
            {seconds.toString().padStart(2, "0")}:
          </span>
          <span
            style={{ textShadow: "3px 3px 15px #ffffcc"  }}
            className="text-sm"
          >
            {milliseconds.toString().padStart(2, "0")}
          </span>
        </div>
        <div id="button-container" className="flex w-[200px]">
          <Button
            label={isRunning ? "Pause" : "Start"}
            onClick={startStop}
            color={!isRunning ? "bg-emerald-500" : undefined}
          />
          <Button label="Reset" onClick={reset} small outline />
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
