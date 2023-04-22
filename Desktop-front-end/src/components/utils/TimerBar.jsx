import { useState, useEffect } from "react";
import styled from "styled-components";

const TimerStyle = styled.div`
width: 80vw;
height: 1vw;
position: absolute;
bottom: 4vh;
}
`;

const TimerInnerDivStyle = styled.div`
height: 20px;
background-color: #ffe700;
transition: all 1s linear 0s;
border-radius: 1vh;
}
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
