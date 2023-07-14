"use client";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";

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
        <FaPlay
          className={`absolute top-4 left-4 text-amber-200 transition ease-in-out ${
            time > 0 ? "opacity-90" : "opacity-20"
          }`}
        />
        <div
          id="time-container"
          className={`
          ${time > 0 ? "text-amber-200" : "text-amber-300 opacity-50"} 
          text-2xl
          bg-black 
          border border-[1px] border-amber-300 border-opacity-40 
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
          <span>{hours.toString().padStart(2, "0")}:</span>
          <span>{minutes.toString().padStart(2, "0")}:</span>
          <span>{seconds.toString().padStart(2, "0")}:</span>
          <span className="text-sm">
            {milliseconds.toString().padStart(2, "0")}
          </span>
        </div>
        <div id="button-container" className="flex w-[200px] justify-center text-sm">
          <button 
          onClick={startStop}
          className={`
            p-2
            w-[70px]
            rounded-full
            hover:opacity-90
            text-neutral-100
            transition ease-out
            ${isRunning ? "bg-rose-700" : "bg-emerald-600"}
            ${isRunning ? "shadow shadow-md shadow-rose-900 translate-y-[1px]" : "shadow shadow-md shadow-emerald-900"}
            mx-2
          `}
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            onClick={reset}
            className={`
            p-2
            w-[70px]
            rounded-full
            hover:opacity-80
            text-neutral-900
            bg-neutral-200
            translate ease-in duration-300
            ${time > 0 ? 'shadow shadow-md shadow-neutral-500' : 'opacity-70 translate-y-[1px]' }
            mx-2
            `}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
