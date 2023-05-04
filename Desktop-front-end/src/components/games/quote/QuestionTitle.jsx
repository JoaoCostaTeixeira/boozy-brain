import styled, { keyframes } from "styled-components";
import Font from "react-font";

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
  width: 80%;
  background-color: transparent;
  margin: auto;
  margin-block: 3%;
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

const QuestionTitleComponent = ({ question }) => (
  <QuestionTitle>
    <Font family="Geo">{question}</Font>
  </QuestionTitle>
);

export default QuestionTitleComponent;
