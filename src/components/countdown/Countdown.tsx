import {
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import styles from "./Countdown.module.css";
import { debounce } from "../../utils/helper";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export enum CountdownState {
  Paused = 1,
  Running = 2,
  Finished = 3,
}

type CountdownProps = {
  timer: number;
  isPaused: boolean;
  disableMouseEvents?: boolean;
  onStateChange?: (state: CountdownState) => void;
  onReset?: () => void;
};

export type CountdownRef = {
  countdownPaused: boolean;
  countdownValue: number;
  reset: () => void;
  setCountdownPaused: (paused: boolean) => void;
};

const Countdown = forwardRef<CountdownRef, CountdownProps>(
  (
    { timer, isPaused, disableMouseEvents = false, onStateChange, onReset },
    ref
  ) => {
    const [countdownPaused, setCountdownPaused] = useState(isPaused);
    const [countdownState, setCountdownState] = useState<CountdownState>(
      isPaused ? CountdownState.Paused : CountdownState.Running
    );
    const [countdownValue, setCountdownValue] = useState(timer);
    const [mouseLeaveUsed, setMouseLeaveUsed] = useState(false);
    const countdownValueRef = useRef<number>(timer);

    const mouseLeaveHandler = () => {
      setMouseLeaveUsed(true);
      setCountdownPaused(false);
    };

    const mouseEnterHandler = () => {
      if (mouseLeaveUsed) {
        if (countdownValue === 0 && onReset) onReset();
        else setCountdownPaused(true);
      }
    };

    const mouseLeaveDebounced = debounce(mouseLeaveHandler, 350);
    const mouseEnterDebounced = debounce(mouseEnterHandler, 350);

    useEffect(() => {
      if (onStateChange) onStateChange(countdownState);
    }, [countdownState, onStateChange]);

    useEffect(() => {
      countdownValueRef.current = countdownValue;
      if (countdownValue === 0) setCountdownState(CountdownState.Finished);
    }, [countdownValue]);

    useEffect(() => {
      let countdownWorker = new Worker(
        new URL("../../workers/countdownWorker", import.meta.url),
        { type: "module" }
      );

      if (countdownPaused) {
        setCountdownState(CountdownState.Paused);
        countdownWorker.terminate();
      }

      countdownWorker.onmessage = function (event) {
        if (!countdownPaused) {
          setCountdownState(CountdownState.Running);
          setCountdownValue(event.data);
        }
      };

      countdownWorker.postMessage({
        countdownSeconds: countdownValueRef.current,
      });

      return () => {
        countdownWorker.terminate();
      };
    }, [countdownPaused]);

    useImperativeHandle(
      ref,
      () => {
        const reset = () => {
          setCountdownPaused(true);
          setCountdownValue(timer);
          setCountdownState(CountdownState.Paused);
        };

        return {
          reset,
          countdownPaused,
          setCountdownPaused,
          countdownValue,
        };
      },
      [countdownPaused, setCountdownPaused, countdownValue, timer]
    );

    return (
      <div
        className={styles.value}
        onClick={() => {
          if (countdownPaused && onReset) onReset();
        }}
        onMouseEnter={disableMouseEvents ? undefined : mouseEnterDebounced}
        onMouseLeave={disableMouseEvents ? undefined : mouseLeaveDebounced}
        aria-label={`Countdown: ${countdownValue} seconds`}
      >
        <CircularProgressbar
          styles={buildStyles({
            pathColor: `white`,
            textColor: "white",
            trailColor: "rgb(60 115 233)",
          })}
          counterClockwise={true}
          background={false}
          value={countdownValue}
          maxValue={timer}
          strokeWidth={4}
          text={
            countdownPaused && countdownValue !== timer
              ? "Paused"
              : countdownValue.toString()
          }
        ></CircularProgressbar>
      </div>
    );
  }
);

export default Countdown;
