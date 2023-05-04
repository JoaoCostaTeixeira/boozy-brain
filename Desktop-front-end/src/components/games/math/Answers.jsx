import styled, { keyframes } from "styled-components";
import Font from "react-font";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const AnswerWrapper = styled.div`
  width: 100%;
  position: absolute;
  height: 50%;
  bottom: 3vw;
  flex-wrap: wrap;
  display: flex;
  text-shadow: 0.2vw 0.2vw 0vw rgba(0, 0, 0, 0.443);
`;

const AnswerOption = styled.div`
  height: 10vh;
  border: #ffe700 double 0.7vh;
  width: 40vw;
  justify-content: space-between;
  margin-inline: 4vw;
  color: white;
  text-align: center;
  font-size: 3vh;
  padding-block: 1vh;
  border-radius: 1vh;
  opacity: 0;
  display: flex;
  align-items: center;
  background-color: #ffd90133;
  animation-name: ${fadeIn};
  animation-duration: 1s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;

  &.correctAnswer {
    background: linear-gradient(#33ff0086, #a6f09386);
    transition: all 1s ease-in;
  }
`;

const CenterSpan = styled.span`
  margin: auto;
`;
const Answers = ({ question, displayRight, rightIndex }) => {
  return (
    <AnswerWrapper>
      {question.map((option, index) => (
        <AnswerOption
          key={index}
          className={
            displayRight && rightIndex === index ? "correctAnswer" : ""
          }
          style={{ animationDelay: `${1 + 0.5 * index}s` }}
        >
          <CenterSpan>
            <Font family="VT323">
              {String.fromCharCode(65 + index)}: {option.text}
            </Font>
          </CenterSpan>
        </AnswerOption>
      ))}
    </AnswerWrapper>
  );
};
export default Answers;
