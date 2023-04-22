import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Login from "./components/lobby";
import Game from "./components/game";
import styled from "styled-components";
import Menu from "./components/menu";

const url = window.location.href.split(":");
const socket = io(url[0] + ":" + url[1] + ":4000/");

const Main = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  background: url("/images/background.svg") no-repeat center center;
  background-size: cover;
`;

function App() {
  const [connected, setConnected] = useState(socket.connected);
  const [userName, setUserName] = useState("");
  const [admin, setAdmin] = useState(false);
  const [question, setQuestion] = useState(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      setConnected(true);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    socket.on("startGame", () => {
      if (start) return;
      setStart(true);
    });

    socket.on("first_player_mobile", ({ userName }) => {
      setUserName((prev) => {
        if (prev.includes(userName)) setAdmin(true);
        return prev;
      });
    });

    socket.on("newQuestion_mobile", (type) => {
      console.log(type);
      if (!start) setStart(true);

      setQuestion(type);
    });

    return () => {
      socket.off("newQuestion_mobile");
      socket.off("first_player_mobile");
      socket.off("connect");
      socket.off("disconnect");
      socket.off("startGame");
    };
  }, []);

  useEffect(() => {
    if (!userName) return;
    socket.emit("newUser", userName);
  }, [userName]);

  const sendUserName = (userName2) => {
    if (!userName2 || userName2 === userName) return;
    setUserName(userName2);
  };

  const startGame = () => {
    setAdmin(false);
    socket.emit("userStartGame");
  };

  const sendReponse = (response, position) => {
    socket.emit("newReponse", {
      response,
      userName: userName.split("-")[0],
      position,
    });
    setQuestion(null);
  };


  const [userName2, image2] = userName.split("-");
  return (
    <Main>
      {connected ? (
        userName ? (
          admin ? (
            <Menu startGame={startGame} />
          ) : (
            <Game
              question={question}
              sendReponse={sendReponse}
              userName={userName2}
              image={image2}
            />
          )
        ) : (
          <Login sendUserName={sendUserName} />
        )
      ) : (
        <a>connecting</a>
      )}
    </Main>
  );
}

export default App;
