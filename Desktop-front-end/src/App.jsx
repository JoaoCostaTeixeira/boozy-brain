import "./App.css";
import Conecting from "./components/connecting/Conection";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import axios from "axios";
import Lobby from "./components/lobby/Lobby";
import Question from "./components/games/question/Question";
import TrueOrFalse from "./components/games/trueorfalse/TrueOrFalse";
import IF from "./components/utils/IF";
import RoundIntro from "./components/roundIntro";
const socket = io("http://localhost:4000/");

function App() {
  const [connected, setConnected] = useState(socket.connected);
  const [ip, setIp] = useState("");

  const [start, setStart] = useState(false);

  const [questions, setQuestions] = useState(null);
  const [number, setNumber] = useState(0);

  const [users, setUser] = useState([]);
  const [responses, setResponses] = useState([]);

  const [displayRoundType, setDisplayRoundType] = useState(true);

  const fetchQuestions = (type) => {
    axios.get("http://localhost:3001/questions/" + type).then(({ data }) => {
      setQuestions(data);
      setStart(true);
      setTimeout(() => {
        setDisplayRoundType(false);
      }, 3000);
    });
  };

  // Resets game if all players leave
  useEffect(() => {
    if (!users.length) {
      setQuestions(null);
      setStart(false);
      setNumber(0);
      setResponses([]);
    }
  }, [users]);

  useEffect(() => {
    axios.get("http://localhost:3001/ip").then(({ data }) => setIp(data));

    socket.on("connect", () => {
      setConnected(true);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });
    socket.on("newUserAdmin", (userName) => {
      setUser((prev) => {
        if (!prev.length) socket.emit("first_player", userName);
        return [...prev, { ...userName, score: 0 }];
      });
    });
    socket.on("deleteUserAdmin", ({ socketId }) => {
      setUser((prev) => {
        return prev.filter((user) => user.socketId !== socketId);
      });
    });
    socket.on("responseAdmin", (response) => {
      response.date = Math.floor(Date.now() / 1000);
      setResponses((prev) => [...prev, response]);
    });

    socket.on("startGame", (type) => {
      fetchQuestions(type);
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("responseAdmin");
      socket.off("newUserAdmin");
      socket.off("startGame");
    };
  }, []);

  const newQuestion = (type) => {
    socket.emit("newQuestion", type);
  };

  const setScores = (scores) => {
    setUser(scores);
  };

  const nextQuestion = () => {
    setNumber((prev) => {
      if (prev === questions.length) {
        setStart(false);
        setUser([]);
        return 0;
      }
      return prev + 1;
    });
    setResponses([]);
    setDisplayRoundType(true);

    setTimeout(() => {
      setDisplayRoundType(false);
    }, 3000);
  };

  const resetReponses = () => {
    setResponses([]);
  };
  return (
    <div className="App">
      {!connected ? (
        <Conecting />
      ) : start && questions ? (
        displayRoundType ? (
          <RoundIntro
            type={questions[number].type}
            roundNumber={number}
            subType={questions[number].subType || ""}
          />
        ) : (
          <>
            <IF condition={questions[number].type === "normal"}>
              <Question
                users={users}
                setScores={setScores}
                nextQuestion={nextQuestion}
                question={(questions && questions[number]) || null}
                responses={responses}
                newQuestion={newQuestion}
              />
            </IF>

            <IF
              condition={
                questions[number].type === "random" &&
                questions[number].subType === "TrueOrFalse"
              }
            >
              <TrueOrFalse
                users={users}
                setScores={setScores}
                nextQuestion={nextQuestion}
                question={(questions && questions[number].questions) || null}
                responses={responses}
                newQuestion={newQuestion}
                resetReponses={resetReponses}
              />
            </IF>
          </>
        )
      ) : (
        <Lobby ip={ip + ":3002"} users={users} />
      )}
    </div>
  );
}

export default App;
