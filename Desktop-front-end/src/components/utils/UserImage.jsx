import styled from "styled-components";

const UserImageStyled = styled.img`
  height: auto;
  width: 90%;
  margin: auto;
`;

function UserImage({ index, width }) {
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
    <UserImageStyled
      src={`./characters/${imageDataSet[index] || imageDataSet[0]}`}
      style={width ? { width: `${width}%` } : {}}
    />
  );
}

export default UserImage;
