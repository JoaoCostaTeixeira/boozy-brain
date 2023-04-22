import GameTitle from "../gameTitle";
import ActionButton from "../utils/ActionButton";
import UserImageName from "../utils/UserImageName";

function Normal({userName, image, sendReponse, setJoke}) {

  const options = ["A", "B", "C", "D"];


  return (
    <>
      <GameTitle />
      <UserImageName name={userName} image={image} />
      {options.map((option, index) => (
        <ActionButton
          text={option}
          onClick={() => {
            sendReponse(option, index);
            setJoke((prev) => prev + 1);
          }}
        />
      ))}
    </>
  );
}

export default Normal;
