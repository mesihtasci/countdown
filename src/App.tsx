// App.tsx
import React, { useEffect, useRef, useState } from "react";
import Button from "./components/Button/Button";
import Countdown, { CountdownRef } from "./components/Countdown/Countdown";
import CountdownTheme from "./components/CountdownTheme/CountdownTheme";
import './App.css';

function App() {
  const [showCountdown, setShowCountdown] = useState(false);
  const countdownRef = useRef<CountdownRef>(null);

  const handleStartButtonClick = () => {
    if (countdownRef.current) countdownRef.current.setPaused(false);
  };

  useEffect(() => {
    console.log("test")
  }, [countdownRef.current?.countdownValue])

  return (
    <div className="container">
      {!showCountdown ? (
        <Button
          onClick={() => {
            setShowCountdown(true);
            handleStartButtonClick();
          }}
          text="Start Countdown"
        ></Button>
      ) : (
        <CountdownTheme>
          <Countdown isPaused={false} ref={countdownRef} onReset={(() => {setShowCountdown(false)})} timer={10}></Countdown>
        </CountdownTheme>
      )}
    </div>
  );
}

export default App;
