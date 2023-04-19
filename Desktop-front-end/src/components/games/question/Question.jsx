import { useState } from "react";
import { useEffect } from "react";
import "./question.css";
import Font from "react-font";
import { randomize } from "../../../utilities/utils";

function Question({
  question,
  responses,
  users,
  newQuestion,
  nextQuestion,
  setScores,
}) {
  const [questionLocal, setquestionLocal] = useState(null);
  const [right, setRight] = useState("");

  const [showResults, setShowResults] = useState(false);
  const [showAllResults, setShowAllResults] = useState(false);
  const [playingUsers, setPlayingUsers] = useState(0);

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

    setquestionLocal(questions);
    setPlayingUsers(users.length);
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

        if (response && questionLocal[response.position].right) {
          user.score++;
        }
        return user;
      });

      setScores(userScores);

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

  if (showAllResults) {
    return (
      <>
        <div className="Players">
          {users.map(({ userName, score }, index) => (
            <div
              key={index}
              className="pp"
              style={
                users.length > 12
                  ? { width: "7rem", heigth: "7rem" }
                  : { width: "10rem", height: "10rem" }
              }
            >
              {userName}
              <br />
              {score}
            </div>
          ))}
        </div>
      </>
    );
  }

  if (showResults) {
    return (
      <>
        <div className="Players">
          {responses.map(({ response, userName, position }, index) => (
            <div
              key={index}
              className="pp"
              style={
                users.length > 12
                  ? { width: "7rem", heigth: "7rem" }
                  : { width: "10rem", height: "10rem" }
              }
            >
              {userName}
              <br />
              {response}
              <br />
              {questionLocal[position].right ? "RIGHT ANSWER" : "WRONG ANSWER"}
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="Question">
        <Font family="Geo">{question?.question}</Font>
      </div>
      <div className="Answers">
        <div
          className={
            "bb A " +
            (responses.length === users.length && right?.index == 0
              ? "correctAnswer"
              : "")
          }
        >
          <span>
            <Font family="VT323">
              A : {questionLocal && questionLocal[0].text}
            </Font>
          </span>
        </div>
        <div
          className={
            "bb B " +
            (responses.length === users.length && right?.index == 1
              ? "correctAnswer"
              : "")
          }
        >
          <span>
            <Font family="VT323">
              B : {questionLocal && questionLocal[1]?.text}
            </Font>
          </span>
        </div>
        <div
          className={
            "bb C " +
            (responses.length === users.length && right?.index == 2
              ? "correctAnswer"
              : "")
          }
        >
          <span>
            <Font family="VT323">
              C : {questionLocal && questionLocal[2]?.text}
            </Font>
          </span>
        </div>
        <div
          className={
            "bb D " +
            (responses.length === users.length && right?.index == 3
              ? "correctAnswer"
              : "")
          }
        >
          <span>
            <Font family="VT323">
              D : {questionLocal && questionLocal[3]?.text}
            </Font>
          </span>
        </div>
      </div>
    </>
  );
}

export default Question;
