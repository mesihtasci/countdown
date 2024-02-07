import { useRef, useState } from "react";
import Countdown, { CountdownRef } from '../../components/countdown/Countdown'
import Button from "../../components/button/Button";
import { Link } from "react-router-dom";

const NormalCountdown = () => {
  const [showCountdown, setShowCountdown] = useState(false);
  const countdownRef = useRef<CountdownRef>(null);

  const handleStartButtonClick = () => {
    if (countdownRef.current) countdownRef.current.setCountdownPaused(false);
  };

  return (
    <div className="container">
      <Link tabIndex={2} to="/accessible-countdown" className="navigation-button">
        <Button>Switch to accessible version</Button>
      </Link>
      {!showCountdown ? (
        <Button
          tabIndex={1}
          onClick={() => {
            setShowCountdown(true);
            handleStartButtonClick();
          }}
        >
          Start Countdown
        </Button>
      ) : (
        <Countdown
          isPaused={false}
          ref={countdownRef}
          onReset={() => {
            setShowCountdown(false);
          }}
          timer={10}
        ></Countdown>
      )}
    </div>
  );
};

export default NormalCountdown;
