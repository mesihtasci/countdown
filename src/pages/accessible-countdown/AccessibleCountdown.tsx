import { useRef, useState } from "react";
import Countdown, {
  CountdownRef,
  CountdownState,
} from "../../components/countdown/Countdown";
import Button from "../../components/button/Button";
import { ReactComponent as PlayIcon } from "../../assets/icons/play.svg";
import { ReactComponent as PauseIcon } from "../../assets/icons/pause.svg";
import { ReactComponent as ResetIcon } from "../../assets/icons/reset.svg";
import { Link } from "react-router-dom";

const AccessibleCountdown = () => {
  const [countdownState, setCountdownState] = useState<CountdownState>(
    CountdownState.Paused
  );

  const countdownRef = useRef<CountdownRef>(null);

  const handleCountdownState = (newState: CountdownState) => {
    setCountdownState(newState);
  };

  const handleStartButtonClick = () => {
    if (countdownRef.current) {
      countdownRef.current.setCountdownPaused(false);
    }
  };

  const handlePauseButtonClick = () => {
    if (countdownRef.current) {
      countdownRef.current.setCountdownPaused(true);
    }
  };

  const handleResetButtonClick = () => {
    if (countdownRef.current) {
      countdownRef.current.reset();
    }
  };

  const renderPlayPauseButton = (countdownState: CountdownState) => {
    if (countdownState !== CountdownState.Finished) {
      if (countdownState === CountdownState.Paused)
        return (
          <Button tabIndex={1} ariaLabel="Start Countdown" onClick={handleStartButtonClick}>
            <PlayIcon />
          </Button>
        );
      else
        return (
          <Button tabIndex={1} ariaLabel="Pause Countdown" onClick={handlePauseButtonClick}>
            <PauseIcon />
          </Button>
        );
    }

    return <></>;
  };

  return (
    <div className="container">
      <Link to="/" className="navigation-button">
        <Button tabIndex={3}>Switch to normal version</Button>
      </Link>
      <Countdown
        onStateChange={handleCountdownState}
        disableMouseEvents={true}
        isPaused={true}
        ref={countdownRef}
        timer={10}
      />
      <div className="button-wrapper">
        {renderPlayPauseButton(countdownState)}
        <Button tabIndex={2} ariaLabel="Reset Countdown" onClick={handleResetButtonClick}>
          <ResetIcon />
        </Button>
      </div>
    </div>
  );
};

export default AccessibleCountdown;
