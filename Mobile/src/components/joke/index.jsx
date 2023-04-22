import { useEffect } from "react";
import { useState } from "react";
import Font from "react-font";
import GameTitle from "../gameTitle";
import UserImageName from "../utils/UserImageName";

import styled from "styled-components";

const MainStyle = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const WaitingStyle = styled.span`
  color: white;
  font-size: 3vh;
  text-align: center;
  text-shadow: -0.2vw -0.2vw red;
  height: 50vh;
  display: flex;
  align-items: center;
`;

const JokeDiv = styled.div`
margin-inline: auto;
width: 90vw;
height: 30vh;
display: flex;
flex-direction: column;
-webkit-box-align: center;
align-items: center;
overflow: auto;
margin-bottom: 2vh;
}
`;

const JokeSpan = styled.span`
  color: rgb(246, 201, 201);
  font-size: 3vh;
  text-align: center;
  text-shadow: -0.1vw -0.1vw #ffe700;
`;

const JokeDeliver = styled.span`
  color: rgb(255, 2, 2);
  font-size: 2.4vh;
  text-align: center;
  text-shadow: -0.1vw -0.1vw #ffe700;
`;

function Joke({ newjoke, userName, image }) {
  const [joke, setjoke] = useState(null);

  useEffect(() => {
    getJoke();
  }, [newjoke]);

  function getJoke() {
    fetch("https://v2.jokeapi.dev/joke/Any")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.error) return;
        setjoke(res);
      });
  }

  function single() {
    return (
      <>
        <JokeSpan>
          <Font family="VT323">{joke.joke}</Font>
        </JokeSpan>
      </>
    );
  }

  function twopart() {
    return (
      <>
        <JokeSpan>
          <Font family="VT323">{joke.setup}</Font>
        </JokeSpan>
        <JokeDeliver>
          <Font family="VT323">{joke.delivery}</Font>
        </JokeDeliver>
      </>
    );
  }
  return (
    <MainStyle>
      <GameTitle />
      <UserImageName name={userName} image={image} />

      <WaitingStyle>
        <Font family="VT323">Waiting for a new event ...</Font>
      </WaitingStyle>

      <JokeDiv>
        {joke ? joke.type === "twopart" ? twopart() : single() : <></>}
      </JokeDiv>
    </MainStyle>
  );
}

export default Joke;
