import styled, { keyframes } from "styled-components";
import Font from "react-font";
import IF from "../utils/IF";
import TimerBar from "../utils/TimerBar";

const appear = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const QuestionTitle = styled.div`
  position: relative;
  width: auto;
  background-color: transparent;
  margin-inline: auto;
  margin-block: 2rem;
  text-align: center;
  height: auto;
  color: white;
  padding-block: 2vh;
  font-size: 4vh;
  animation-name: ${appear};
  animation-duration: 1s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
  border: #ffe700 double 1vh;
  border-radius: 1vh;
  padding-inline: 1vw;
`;
const Container = styled.div`
  position: relative;
  width: 80%;
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const RoundIntro = ({ type, subType, roundNumber }) => (
  <Container>
    <QuestionTitle>
      <Font family="VT323">Round #{roundNumber + 1}</Font>
    </QuestionTitle>
    <QuestionTitle>
      <Font family="VT323">Type: {type.toUpperCase()}</Font>
    </QuestionTitle>
    <IF condition={subType}>
      <QuestionTitle>
        <Font family="VT323">{subType.toUpperCase()}</Font>
      </QuestionTitle>
    </IF>
    <TimerBar maxTime={2} />
  </Container>
);

export default RoundIntro;
