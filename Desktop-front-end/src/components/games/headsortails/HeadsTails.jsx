import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import PlayersList from "../../utils/PlayersList.jsx";
import TimerBar from "../../utils/TimerBar";
import QuestionTitleComponent from "../lyrics/QuestionTitle.jsx";

const MAX_TIME = 5;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  height: 80%;
`;

const Image = styled.img`
  width: 30%;
  height: auto;
  margin: auto;
`;

const drinkImages = ["cara", "coroa", "bebe"];

function HeadsTails({ question, responses, users, newQuestion, nextQuestion }) {
  const [showResults, setShowResults] = useState(false);
  const [showAllResults, setShowAllResults] = useState(false);
  const [playingUsers, setPlayingUsers] = useState(0);

  const [drinkingUsers, setDrinkingUsers] = useState([]);
  const [questionDate, setQuestionDate] = useState(null);

  useEffect(() => {
    if (!question) return;
    setPlayingUsers(users.length);
    const now = Math.floor(Date.now() / 1000); // returns the current timestamp in seconds
    setQuestionDate(now);
  }, [question]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      newQuestion("headstails");
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [question]);

  useEffect(() => {
    if (
      playingUsers &&
      (responses.length === playingUsers || responses.length === users.length)
    ) {
      if (question.result === 3) {
        setDrinkingUsers(users);
      } else {
        const userScores = users.filter((user) => {
          const response = responses.find(
            (rr) => rr.userName === user.userName
          );
          if (!response || response.position !== question.result) {
            return true;
          }
          return false;
        });

        setDrinkingUsers(userScores);
      }

      const now = Math.floor(Date.now() / 1000); // returns the current timestamp in seconds
      const timeElapsed = 5 - (now - questionDate);

      const timeGo = timeElapsed < 0 ? 1 : timeElapsed + 1;
      setTimeout(() => {
        setShowResults(true);
      }, timeGo * 1000);

      setTimeout(() => {
        setShowResults(false);
        setShowAllResults(true);
      }, (timeGo + 4) * 1000);

      setTimeout(() => {
        setShowAllResults(false);
        nextQuestion();
      }, (timeGo + 7) * 1000);
    }
  }, [responses, users.length]);

  if (showResults) {
    if(!drinkingUsers.length)  return  <QuestionTitleComponent question={'No one Drinks'}/>
    return <PlayersList users={drinkingUsers} showDrinking={true} />;
  }

  if (showAllResults) {
    return <PlayersList users={users} />;
  }

  return (
    <Container>
      <Image
        src={`./images/cara_ou_coroa/${drinkImages[question.result || 0]}.gif`}
      />
      <TimerBar maxTime={MAX_TIME} />
    </Container>
  );
}

export default HeadsTails;
