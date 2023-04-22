import Font from "react-font";

import styled from "styled-components";

const MainStyle = styled.div`
  position: relative;
  display: flex;
  height: auto;
  flex-direction: column;
`;

const ImageDiv = styled.div`
  width: 100vw;
  height: 13vh;
  display: flex;
  margin-block: 1vh;
`;

const Text = styled.span`
  color: rgb(255, 2, 2);
  font-size: 3vh;
  text-align: center;
  text-shadow: -0.1vw -0.1vw #ffe700;
  position: relative;
`;

const Image = styled.img`
  border: double 5px red;
  border-radius: 10px;
  padding: 1vh;
  width: auto;
  height: 70%;
  margin: auto;
`;

function UserImageName({ name = "", image }) {
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

  return (
    <MainStyle>
      <Text>
        <Font family="VT323">ID: {name}</Font>
      </Text>
      <ImageDiv>
        <Image src={"images/characters/" + imageDataSet[image]}></Image>
      </ImageDiv>
    </MainStyle>
  );
}

export default UserImageName;
