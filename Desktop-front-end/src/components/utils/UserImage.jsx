function UserImage({ index }) {
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
    <img
      className="userImage"
      src={`./characters/${imageDataSet[index] || imageDataSet[0]}`}
    ></img>
  );
}

export default UserImage;
