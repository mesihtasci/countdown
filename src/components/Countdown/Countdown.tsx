// Countdown.tsx
import {
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import styles from "./Countdown.module.css";
import { debounce } from "../../utils/helper";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

type CountdownProps = {
  timer: number;
  isPaused: boolean;
  onReset: () => void;
};

export type CountdownRef = {
  isCountdownPaused: boolean;
  countdownValue: number;
  setPaused: (paused: boolean) => void;
};

const Countdown = forwardRef<CountdownRef, CountdownProps>(
  ({ timer, isPaused, onReset }, ref) => {
    const [isCountdownPaused, setPaused] = useState(isPaused);
    const [countdownValue, setCountdownValue] = useState(timer);
    const [mouseLeaveUsed, setMouseLeaveUsed] = useState(false);
    const countdownValueRef = useRef<number>(timer);

    const mouseLeaveHandler = () => {
      setMouseLeaveUsed(true);
      setPaused(false);
    };

    const mouseEnterHandler = () => {
      if (mouseLeaveUsed) {
        if(countdownValue === 0) 
          onReset()
        else
          setPaused(true);
      }
    };

    const mouseLeaveDebounced = debounce(mouseLeaveHandler, 350);
    const mouseEnterDebounced = debounce(mouseEnterHandler, 350);

    useEffect(() => {
      countdownValueRef.current = countdownValue;
    }, [countdownValue]);

    useEffect(() => {
      let countdownWorker: Worker = new Worker(
        new URL("../workers/countdownWorker", import.meta.url),
        { type: "module" }
      );

      if (isCountdownPaused) countdownWorker.terminate();

      countdownWorker.onmessage = function (event) {
        if (!isCountdownPaused) setCountdownValue(event.data);
      };

      countdownWorker.postMessage({
        countdownSeconds: countdownValueRef.current,
      });

      return () => {
        countdownWorker.terminate();
      };
    }, [isCountdownPaused]);

    useImperativeHandle(
      ref,
      () => (
        {
        isCountdownPaused,
        setPaused,
        countdownValue,
      }),
      [isCountdownPaused, setPaused, countdownValue]
    );

    return (
      <div
        className={styles.value}
        onClick={() => {
          if (isCountdownPaused) onReset();
        }}
        onMouseEnter={mouseEnterDebounced}
        onMouseLeave={mouseLeaveDebounced}
      >
        {/* {isCountdownPaused ? <div  className={styles.text}>Paused</div> : countdownValue} */}
        {isCountdownPaused ? (
          <div className={styles.text}>Paused</div>
        ) : (
          <CircularProgressbar value={countdownValue} maxValue={timer} strokeWidth={4} text={`${countdownValue}`} counterClockwise={true}/>

        )}
      </div>
    );
  }
);

export default Countdown;