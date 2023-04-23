import { useState, useEffect } from "react";
import styled from "styled-components";

const TimerStyle = styled.div`
  width: 80vw;
  height: 25px;
  position: absolute;
  bottom: 4vh;
  display: flex;
  background: #ff0000;
  border: 5px solid #5f0404;
  box-shadow: 0px 0px 8px 0px #151212f7 inset;
  border-radius: 0.8vw;
`;

const TimerInnerDivStyle = styled.div`
  height: 20px;
  background: linear-gradient(
    180deg,
    rgba(255, 198, 4, 1) 9%,
    rgba(254, 255, 0, 1) 27%,
    rgba(250, 227, 109, 1) 41%,
    rgba(247, 215, 112, 1) 51%,
    rgba(254, 255, 0, 1) 61%,
    rgba(255, 198, 4, 1) 82%
  );
  transition: all 1s linear 0s;
  border-radius: 0.8vh;
  border: solid rgb(180, 149, 16) 2px;
  margin-block: auto;
`;

function TimerBar({ maxTime }) {
  const [timeLeft, setTimeLeft] = useState(maxTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const progress = (timeLeft / maxTime) * 100;

  return (
    <TimerStyle>
      <TimerInnerDivStyle
        style={{
          width: `${progress}%`,
        }}
      ></TimerInnerDivStyle>
    </TimerStyle>
  );
}

export default TimerBar;
