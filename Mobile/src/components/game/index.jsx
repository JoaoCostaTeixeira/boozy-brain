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
          <div className="options" onClick={() => startGame()}>
            <div className="buttomImageBackground">
              <img className="buttomImageBackgroundPIC" src="images/button.svg">
              </img>
              <Font family="VT323"> Quickie</Font>
              </div>
          </div>
          <div className="options" onClick={() => startGame()}>
            
            <div className="buttomImageBackground">
              <img className="buttomImageBackgroundPIC" src="images/button.svg">
              </img>
              <Font family="VT323"> Normal</Font>
              </div>
          </div>
          <div className="options" onClick={() => startGame()}>
            <div className="buttomImageBackground">
              <img className="buttomImageBackgroundPIC" src="images/button.svg">
              </img>
              <Font family="VT323">Warm Up </Font></div>
          </div>
          <div className="options" onClick={() => startGame()}>
            <div className="buttomImageBackground">
              <img className="buttomImageBackgroundPIC" src="images/button.svg">
              </img>
              <Font family="VT323">Juiced-up </Font></div>
          </div>
          <div className="options" onClick={() => startGame()}>
          <div className="buttomImageBackground">
              <img className="buttomImageBackgroundPIC" src="images/button.svg">
              </img>
              <Font family="VT323">Wasted</Font></div>
          </div>
        </div>
      )}
      {start && question === "normal" && (
        <div className="Main">
          <div className="gameTitle" style={{ marginBottom: "-3vh" }}>
            <span className="gameTitlesSpan">
              <Font family="VT323">Boozy Brain</Font>
            </span>
            <span className="gameTitlesSpan2">
              <Font family="VT323">Can you outsmart the bottle?</Font>
            </span>
            <span className="playerName">
              <Font family="VT323">ID:{userName}</Font>
            </span>
          </div>
          <div className="imageDivController">
            <img className="imageDivControllerPIC" src="images/characters/pupa_knife.png"></img>
          </div>
          <div
            className="options"
            onClick={() => {
              sendReponse("A", 0);
              setJoke((prev) => prev + 1);
            }}
          >
            <div className="buttomImageBackground">
              <img className="buttomImageBackgroundPIC" src="images/button.svg">
              </img>
              <Font family="VT323">A</Font></div>
          </div>
          <div
            className="options"
            onClick={() => {
              sendReponse("B", 1);
              setJoke((prev) => prev + 1);
            }}
          >
            <div className="buttomImageBackground">
              <img className="buttomImageBackgroundPIC" src="images/button.svg">
              </img>
              <Font family="VT323">B</Font></div>
          </div>
          <div
            className="options"
            onClick={() => {
              sendReponse("C", 2);
              setJoke((prev) => prev + 1);
            }}
          >
            <div className="buttomImageBackground">
              <img className="buttomImageBackgroundPIC" src="images/button.svg">
              </img>
              <Font family="VT323">C</Font></div>

          </div>
          <div
            className="options"
            onClick={() => {
              sendReponse("D", 3);
              setJoke((prev) => prev + 1);
            }}
          >
            <div className="buttomImageBackground">
              <img className="buttomImageBackgroundPIC" src="images/button.svg">
              </img>
              <Font family="VT323">D</Font></div>
          </div>
        </div>
      )}

      {start && !question && <Joke userName={userName} newJoke={joke} />}
    </>
  );
}

export default Game;
