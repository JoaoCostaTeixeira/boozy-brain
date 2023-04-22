import "./login.css";
import { useState } from "react";
import { useRef } from "react";
import Font from "react-font";
import GameTitle from "../gameTitle";
import styled from "styled-components";
import Button from "../utils/Button";

const MainStyle = styled.div`
  height: 50vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-block: auto;
  justify-content: space-evenly;
`;

const MainStyle2 = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputStyle = styled.input`
  margin-inline: auto;
  display: block;
  width: 70vw;
  height: 7vh;
  font-size: 6vw;
  text-align: center;
  color: white;
  border: #ffcc00 double 1.2vw;
  border-radius: 3vw;
  font-family: impact;
  padding: 2vw;
  text-shadow: -0.3vw -0.3vw #bc0404;
  background-color: transparent;
`;

const ButtonDiv = styled.div`
  margin-inline: auto;
  display: block;
  height: 10vh;
  width: 100%;
  background-color: rgba(255, 255, 255, 0);
  line-height: 10vh;
  text-shadow: 0.5vw 0.5vw 0vw rgba(0, 0, 0, 0.443);
  color: cornsilk;
  font-family: monospace;
  font-weight: 800;
  font-size: 6vh;
  margin-top: 1vh;
  text-align: center;
`;

const SelectCharacterDiv = styled.span`
  color: #ffe700;
  font-size: 5vh;
  text-decoration: 1vw double red;
  text-shadow: -0.5vw -0.5vw red;
  margin-top: 1vh;
  text-align: center;
`;

const CharacterDiv = styled.div`
  width: 100vw;
  min-height: 55vh;
  max-height: 48vh;
  padding-block: 20px;
  margin-bottom: 5px;
  display: flex;
  flex-wrap: wrap;
  flex-basis: fit-content;
  justify-content: space-evenly;
  overflow: auto;
`;

const CharacterSelectionDiv = styled.div`
  width: 100px;
  height: 100px;
  margin-inline: 20px;
  margin-bottom: 20px;
  display: flex;
  border-radius: 10px;
  transition: all 0.5s ease-out;
  border: 5px double rgba(255, 242, 0, 0);
`;

const CharacterSelectionIMG = styled.img`
  width: auto;
  height: 80%;
  margin: auto;
`;

function Login({ sendUserName }) {
  const userName = useRef(null);
  const [page, setPage] = useState(0);
  const [name, setName] = useState("");
  const [image, setImage] = useState(0);

  const imageDataSet = [
    "goose_bow.png",
    "goose_knife.png",
    "goose_skate.png",
    "pupa_drinking.png",
    "pupa_knife.png",
    "pupa_muscle.png",
    "pupa_pilinha.png",
    "pupa_fancy.png",
    "rick_funny_mouth.png",
    "rick_high_drunk.png",
    "rick_open_mouth.png",
    "rick_sleepy.png",
    "rick_suspects.png",
  ];

  const send = () => {
    if (name) {
      sendUserName(`${name}-${image}`);
    }
  };

  const changePage = () => {
    if (userName?.current) {
      const { value } = userName.current;
      setName(value);
      setPage(1);
    }
  };

  if (page) {
    return (
      <MainStyle2>
        <GameTitle />
        <SelectCharacterDiv>
          <Font family="VT323">Select a Character</Font>
        </SelectCharacterDiv>
        <CharacterDiv>
          {imageDataSet.map((name, index) => (
            <CharacterSelectionDiv
              style={index === image ? { borderColor: "#ffcc00" } : {}}
              onClick={() => setImage(index)}
            >
              <CharacterSelectionIMG
                src={`images/characters/${name}`}
              ></CharacterSelectionIMG>
            </CharacterSelectionDiv>
          ))}
        </CharacterDiv>
        <ButtonDiv onClick={send}>
          <Button text="SELECT" />
        </ButtonDiv>
      </MainStyle2>
    );
  }

  return (
    <MainStyle>
      <GameTitle />
      <InputStyle
        ref={userName}
        onKeyUp={(e) => (e.target.value = e.target.value.toUpperCase())}
      />
      <ButtonDiv onClick={changePage}>
        <Button text="START" />
      </ButtonDiv>
    </MainStyle>
  );
}

export default Login;
