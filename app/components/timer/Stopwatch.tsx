"use client";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { useStopwatch } from "react-use-precision-timer";
import BtnAB from "../BtnAB";
import BtnSwitch from "../BtnSwitch";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [reRender, setRerender] = useState(0);
  const stopwatch = useStopwatch();

  useEffect(() => {
    let interval: any;
    if (stopwatch.isRunning()) {
      interval = setInterval(() => setRerender(reRender + 1), 10);
      setTime(stopwatch.getElapsedRunningTime());
    }
    return () => clearInterval(interval);
  }, [reRender, stopwatch.isRunning()]);

  const startStop = () => {
    if (stopwatch.isRunning()) stopwatch.pause();
    else if (stopwatch.isPaused()) stopwatch.resume();
    else stopwatch.start();
  };

  const reset = () => {
    setTime(0);
    stopwatch.stop()
  };

  return (
    <div className="relative">
      <div
        className="absolute mt-24 
        flex flex-col items-center 
        px-2 py-4 
        rounded-xl
        shadow shadow-md shadow-neutral-300
        mx-1
        "
      >
        <FaPlay
          className={`absolute top-4 left-4 text-emerald-500 transition ease-in-out ${
            time > 0 ? "opacity-90" : "opacity-10"
          }`}
        />
        <div
          id="time-container"
          className={`
          ${time > 0 ? "text-amber-200" : "text-white opacity-50"} 
          ${time > 0 ? "shadow-sm shadow-amber-200 " : "shadow-none"} 
          text-2xl
          bg-black 
          rounded-full
          w-[160px]
          h-[160px]
          px-3 py-1 my-2
          flex justify-center items-center
          `}
          style={
            time == 0
              ? { textShadow: "none" }
              : { textShadow: "3px 3px 15px #ffffcc" }
          }
        >
          <span>{new Date(time).toISOString().slice(11, 19)}:</span>
          <span className="text-sm">
            {new Date(time).toISOString().slice(20, 22)}
          </span>
        </div>
        <div
          id="button-container"
          className="flex w-[200px] justify-center text-sm"
        >
          <BtnAB 
          action={startStop} 
          condition={stopwatch.isRunning()} 
          labelA="Pause" 
          labelB="Start"
          />
          <BtnSwitch
            action={reset}
            condition={time > 0 }
            label="Reset"
            
          />
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
