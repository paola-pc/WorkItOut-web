"use client";
import { useEffect, useState } from "react";
import { CgSandClock } from "react-icons/cg";
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
        className="absolute mt-24 flex flex-col items-center px-2 py-4 mx-1
        border border-black border-2
        rounded-xl
        bg-neutral-900
        shadow shadow-md shadow-neutral-800
        "
      >
        <span className={isRunning ? "flip-2-hor-top-1" : ""}>
          <CgSandClock className="text-2xl text-amber-200 " />
        </span>
        <div
          id="time-container"
          className={`
          ${time > 0 ? "text-amber-200" : "text-amber-300 opacity-70" } 
          text-2xl
          bg-black 
          border border-[1px] border-amber-300 border-opacity-40 
          rounded-xl
          px-3 py-1 my-2
          `
        }
          style={
            time == 0
              ? { textShadow: "none" }
              : { textShadow: "3px 3px 15px #ffffcc" }
          }
        >
          <span>{hours.toString().padStart(2, "0")}:</span>
          <span>{minutes.toString().padStart(2, "0")}:</span>
          <span>{seconds.toString().padStart(2, "0")}:</span>
          <span className="text-sm">
            {milliseconds.toString().padStart(2, "0")}
          </span>
        </div>
        <div id="button-container" className="flex w-[200px]">
          <Button
            label={isRunning ? "Pause" : "Start"}
            onClick={startStop}
            color={!isRunning ? "bg-emerald-500" : undefined}
            small
          />
          <Button label="Reset" onClick={reset} small outline />
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
