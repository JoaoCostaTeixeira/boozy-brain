import "./App.css";
import Conecting from "./components/connecting/Conection";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import axios from "axios";
import Lobby from "./components/lobby/Lobby";
import Question from "./components/games/question/Question";
import TrueOrFalse from "./components/games/trueorfalse/TrueOrFalse";
import IF from "./components/utils/IF";
const socket = io("http://localhost:4000/");

function App() {
  const [connected, setConnected] = useState(socket.connected);
  const [ip, setIp] = useState("");

  const [start, setStart] = useState(false);

  const [questions, setQuestions] = useState(null);
  const [number, setNumber] = useState(0);

  const [users, setUser] = useState([]);
  const [responses, setResponses] = useState([]);

  const fetchQuestions = () => {
    axios
      .get("http://localhost:3001/questions")
      .then(({ data }) => setQuestions(data));
  };

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
        return [...prev, { userName, score: 0 }];
      });
    });

    socket.on("responseAdmin", (response) => {
      setResponses((prev) => [...prev, response]);
    });

    socket.on("startGame", () => {
      setStart(true);
      fetchQuestions();
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
      if (prev === 19) {
        fetchQuestions();
        return 0;
      }
      return prev + 1;
    });
    setResponses([]);
  };
  return (
    <div className="App">
      {!connected ? (
        <Conecting />
      ) : start && questions ? (
        <>
          <IF condition={questions[number].type === "Question"}>
            <Question
              users={users}
              setScores={setScores}
              nextQuestion={nextQuestion}
              question={(questions && questions[number]) || null}
              responses={responses}
              newQuestion={newQuestion}
            />
          </IF>

          <IF condition={questions[number].type === "TrueOrFalse"}>
            <TrueOrFalse
              users={users}
              setScores={setScores}
              nextQuestion={nextQuestion}
              question={(questions && questions[number]) || null}
              responses={responses}
              newQuestion={newQuestion}
            />
          </IF>
        </>
      ) : (
        <Lobby ip={ip + ":3002"} users={users} />
      )}
    </div>
  );
}

export default App;
