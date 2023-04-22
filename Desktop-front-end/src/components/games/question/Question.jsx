import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { randomize } from "../../../utilities/utils";
import PlayersList from "../../utils/PlayersList.jsx";
import Answers from "./Answers";
import QuestionTitleComponent from "./QuestionTitle";
import { calculateScore } from "../../utils/calculateScoreNormal";
import TimerBar from "../../utils/TimerBar";


const MAX_TIME = 20;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

function Question({
  question,
  responses,
  users,
  newQuestion,
  nextQuestion,
  setScores,
}) {
  const [questionLocal, setQuestionLocal] = useState(null);
  const [right, setRight] = useState("");

  const [showResults, setShowResults] = useState(false);
  const [showAllResults, setShowAllResults] = useState(false);
  const [playingUsers, setPlayingUsers] = useState(0);
  const [displayRight, setDisplayRight] = useState(false);

  const [questionDate, setQuestionDate] = useState(null);

  useEffect(() => {
    if (!question) return;

    const questions = [
      { text: question.correct_answer, right: true },
      { text: question.wrong_answer1, right: false },
      { text: question.wrong_answer2, right: false },
      { text: question.wrong_answer3, right: false },
    ];

    questions.sort(randomize);

    const index = questions.map((object) => object.right).indexOf(true);
    setRight({ text: question.correct_answer, index });

    setQuestionLocal(questions);
    setPlayingUsers(users.length);

    setDisplayRight(false);
    const now = Math.floor(Date.now() / 1000); // returns the current timestamp in seconds
    setQuestionDate(now);
  }, [question]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      newQuestion("normal");
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [questionLocal]);

  useEffect(() => {
    if (
      playingUsers &&
      (responses.length === playingUsers || responses.length === users.length)
    ) {
      const userScores = users.map((user) => {
        const response = responses.find((rr) => rr.userName === user.userName);
        const points = calculateScore(
          response.date - questionDate,
          MAX_TIME,
          200,
          10
        );
        if (response && questionLocal[response.position].right) {
          user.score = user.score + points;
          user.scoreInThis = `+${points}`;
        } else {
          const score = Math.floor(points / 2);

          user.score = user.score - score;
          if (user.score < 0) user.score = 0;
          user.scoreInThis = `-${score}`;
        }
        return user;
      });

      setScores(userScores);
      setDisplayRight(true);

      setTimeout(() => {
        setShowResults(true);
      }, 3000);

      setTimeout(() => {
        setShowResults(false);
        setShowAllResults(true);
      }, 6000);

      setTimeout(() => {
        setShowAllResults(false);
        nextQuestion();
      }, 9000);
    }
  }, [responses, users.length]);

  if (showResults) {
    return <PlayersList users={users} showResults={true} />;
  }

  if (showAllResults) {
    return <PlayersList users={users} />;
  }
  return (
    <Container>
      <QuestionTitleComponent question={question?.question || ""} />
      <Answers
        displayRight={displayRight}
        question={questionLocal || []}
        rightIndex={right?.index || 0}
      />
      <TimerBar maxTime={MAX_TIME}/>
    </Container>
  );
}

export default Question;
