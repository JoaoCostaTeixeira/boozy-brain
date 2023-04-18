import { useEffect } from "react";
import { useState } from "react";
import Font from "react-font";
function Joke({ newjoke, userName }) {
  const [joke, setjoke] = useState(null);

  useEffect(() => {
    getJoke();
  }, [newjoke]);

  function getJoke() {
    fetch("https://v2.jokeapi.dev/joke/Any")
    .then((res) => res.json())
    .then((res) => {
        console.log(res)
        if(res.error) return
        setjoke(res)
    })
  }

  function single() {return (
    <>
      <span className="joke">
        <Font family="VT323">{joke.joke}</Font>
      </span>
    </>
  );}

  function twopart() {
    return (
      <>
        <span className="joke">
          <Font family="VT323">{joke.setup}</Font>
        </span>
        <span className="playerName">
          <Font family="VT323">{joke.delivery}</Font>
        </span>
      </>
    );
  }
  return (
    <>
      <div className="Main">

        <div className="gameTitle">
          <span className="gameTitlesSpan">
            <Font family="VT323">Boozy Brain</Font>
          </span>
          <span className="gameTitlesSpan2">
            <Font family="VT323">Can you outsmart the bottle?</Font>
          </span>
          <span className="playerName">
            <Font family="VT323">ID: {userName}</Font>
          </span>
        </div>
        <div className="gameTitle">
      <span className="gameTitlesSpan2">
        <Font family="VT323">Waiting for a new event ...</Font>
        </span>
      </div>
        <div className="jokeTitle">
          {joke ? joke.type === 'twopart' ? twopart() : single() : <></>}
        </div>
      </div>
    </>
  );
}

export default Joke;
