import { useState } from "react";
import { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import PlayersList from "../../utils/PlayersList.jsx";
import { calculateScore } from "../../utils/calculateScoreNormal";
import TimerBar from "../../utils/TimerBar";
import Font from "react-font";
import QuestionTitleComponent from "../question/QuestionTitle.jsx";

const MAX_TIME = 5;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  margin-top: 20px;
  height: 65%;
  -webkit-box-pack: justify;
  justify-content: center;
`;

const appear = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
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
function TrueOrFalse({
  question,
  responses,
  users,
  newQuestion,
  nextQuestion,
  setScores,
  resetReponses,
}) {
  const [showResults, setShowResults] = useState(false);
  const [showAllResults, setShowAllResults] = useState(false);
  const [playingUsers, setPlayingUsers] = useState(0);
  const [displayRight, setDisplayRight] = useState(false);

  const [questionDate, setQuestionDate] = useState(null);

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!question) return;
    setPlayingUsers(users.length);
    setCurrent(0);
    const now = Math.floor(Date.now() / 1000); // returns the current timestamp in seconds
    setQuestionDate(now);
  }, [question]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      newQuestion("trueorfalse");
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [question]);

  useEffect(() => {
    let finish = false;
    if (
      playingUsers &&
      (responses.length === playingUsers || responses.length === users.length)
    ) {
      const userScores = users.map((user) => {
        const response = responses.find((rr) => rr.userName === user.userName);
        const points = calculateScore(
          response.date - questionDate,
          MAX_TIME,
          50,
          10
        );
        if (response && response.response === question[current].answer) {
          user.scoreInThisOne = user.scoreInThisOne
            ? user.scoreInThisOne + points
            : points;
        } else {
          const score = Math.floor(points / 2);
          user.scoreInThisOne = user.scoreInThisOne
            ? user.scoreInThisOne - score
            : -score;
        }

        if (current === 3) {
          user.score = user.score + user.scoreInThisOne;
          user.scoreInThis =
            user.scoreInThisOne > 0
              ? `+${user.scoreInThisOne}`
              : `${user.scoreInThisOne}`;
          finish = true;

          if (user.score < 0) user.score = 0;

          delete user.scoreInThisOne;
        }

        return user;
      });

      setScores(userScores);
      setDisplayRight(true);

      setTimeout(() => {
        setDisplayRight(false);

        if (finish) {
          setShowResults(true);
          setTimeout(() => {
            setShowResults(false);
            setShowAllResults(true);
          }, 2000);
          setTimeout(() => {
            setShowAllResults(false);
            nextQuestion();
          }, 4000);
        } else {
          setCurrent((prev) => prev + 1);
          resetReponses();
          newQuestion("trueorfalse");
          setPlayingUsers(users.length);
        }
      }, 2000);
    }
  }, [responses, users.length]);

  if (showResults) {
    return <PlayersList users={users} showResults={true} />;
  }

  if (showAllResults) {
    return <PlayersList users={users} />;
  }

  if (displayRight) {
    return (
      <Container>
        <QuestionTitleComponent question={question[current]?.question || ""} />
        <AnswerOption>
          <CenterSpan>
            <Font family="VT323">{question[current]?.answer || ""}</Font>
          </CenterSpan>
        </AnswerOption>
      </Container>
    );
  }
  return (
    <Container>
      <QuestionTitleComponent question={question[current]?.question || ""} />
      <TimerBar maxTime={MAX_TIME} />
    </Container>
  );
}

export default TrueOrFalse;
