"use client";
import { useCallback, useEffect, useState } from "react";
import { useTimer } from "react-use-precision-timer";
import { RxLoop } from "react-icons/rx";
import {
  BsHourglassBottom,
  BsHourglassSplit,
  BsHourglassTop,
} from "react-icons/bs";
import BtnAB from "../BtnAB";
import BtnSwitch from "../BtnSwitch";

interface CountdownProps {
  time: number;
  title?: string;
  loop: boolean;
}

const Countdown: React.FC<CountdownProps> = ({
  time,
  title = "Timer",
  loop,
}) => {
  const [reRender, setReRender] = useState(0);
  const [remainingTime, setRemainingTime] = useState(time);
  const [runsOnce, setrunsOnce] = useState(!loop);
  let [counter, setCounter] = useState(0);
  const action = useCallback(() => {
    console.log("boom");
    setCounter((currentCount) => currentCount + 1);
    setRemainingTime(0);
  }, []);
  const timer = useTimer(
    {
      delay: time,
      runOnce: runsOnce,
    },
    action
  );

  const handleStartStop = () => {
    if (timer.isRunning()) {
      timer.pause();
      setRemainingTime(timer.getRemainingTime());
    } else if (timer.isPaused()) {
      timer.resume();
    } else {
      timer.start();
      setRemainingTime(timer.getRemainingTime());
    }
  };

  const handleReset = () => {
    timer.stop();
    setRemainingTime(time);
  };

  const handleLoop = () => {
    setrunsOnce(!runsOnce);
  };

  useEffect(() => {
    let interval: any;
    if (timer.isRunning()) {
      interval = setInterval(() => setReRender(reRender + 1), 10);
      setRemainingTime(timer.getRemainingTime());
    }
    return () => clearInterval(interval);
  }, [reRender, timer.isRunning()]);

  return (
    <div className="relative">
      <div className="absolute mt-24 ml-60 flex flex-col items-center justify-around w-[200px] h-[200px] rounded-xl shadow-md shadow-neutral-300">
        {/* header */}
        <div id="timer-header">
          <span>{title}</span>
          <button onClick={handleLoop} className="absolute right-4 top-4">
            <RxLoop className={`${runsOnce && "opacity-30"}`} />
          </button>
        </div>
        <div
          id="timer-info"
          className="flex flex-col items-center justify-around"
        >
          <div className="text-2xl text-amber-500">
            {timer.isRunning() ? (
              <BsHourglassSplit />
            ) : remainingTime === 0 ? (
              <BsHourglassBottom />
            ) : (
              <BsHourglassTop />
            )}
          </div>
          <span className="text-xl">
            {new Date(remainingTime).toISOString().slice(11, 19)}
          </span>
          <span
            className={`
            text-sm italic text-neutral-600 transition 
            ${remainingTime === 0 ? "opacity-70" : "opacity-0"}
					`}
          >
            {counter > 1 ? `Finished ${counter} times.` : "Finished"}
          </span>
        </div>
        <div id="timer-buttons" className="w-[180px] flex">
          <BtnAB
            action={handleStartStop}
            condition={timer.isRunning()}
            labelA={"Pause"}
            labelB={remainingTime > 0 ? "Start" : "Restart"}
          />
          <BtnSwitch
            action={handleReset}
            label="Reset"
            condition={remainingTime < time}
          />
        </div>
      </div>
    </div>
  );
};

export default Countdown;
