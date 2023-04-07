import { useEffect } from "react";
import { useState } from "react";
import Font from "react-font";
import Joke from "../joke";
function Game({ startGame, admin, start, question, sendReponse, userName }) {
  const [joke, setJoke] = useState(0);

  return (
    <>
      {admin && !start && (
        <div className="Main">
          <button className="options" onClick={() => startGame()}>
            Quickie
          </button>
          <button className="options" onClick={() => startGame()}>
            Normal
          </button>
          <button className="options" onClick={() => startGame()}>
            Warm Up
          </button>
          <button className="options" onClick={() => startGame()}>
            Juiced-up
          </button>
          <button className="options" onClick={() => startGame()}>
            Wasted
          </button>
        </div>
      )}
      {start && question === "normal" && (
        <div className="Main">
          <div className="gameTitle">
            <span className="gameTitlesSpan">
              <Font family="Geo">Boozy Brain</Font>
            </span>
            <span className="gameTitlesSpan2">
              <Font family="Geo">Can you outsmart the bottle?</Font>
            </span>
            <span className="playerName">
              <Font family="Geo">ID:{userName}</Font>
            </span>
          </div>
          <button
            className="options"
            onClick={() => {
              sendReponse("A", 0);
              setJoke((prev) => prev + 1);
            }}
          >
            <Font family="Geo">A</Font>
          </button>
          <button
            className="options"
            onClick={() => {
              sendReponse("B", 1);
              setJoke((prev) => prev + 1);
            }}
          >
            <Font family="Geo">B</Font>
          </button>
          <button
            className="options"
            onClick={() => {
              sendReponse("C", 2);
              setJoke((prev) => prev + 1);
            }}
          >
            <Font family="Geo">C</Font>
          </button>
          <button
            className="options"
            onClick={() => {
              sendReponse("D", 3);
              setJoke((prev) => prev + 1);
            }}
          >
            <Font family="Geo">D</Font>
          </button>
        </div>
      )}

      {start && !question && <Joke userName={userName} newJoke={joke} />}
    </>
  );
}

export default Game;
