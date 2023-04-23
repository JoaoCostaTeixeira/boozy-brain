import { useEffect } from "react";
import GameTitle from "../gameTitle";
import ActionButton from "../utils/ActionButton";
import UserImageName from "../utils/UserImageName";

function TrueOrFalse({ userName, image, sendReponse, setJoke }) {
  const options = ["TRUE", "FALSE"];

  useEffect(() => {
    const timer = setTimeout(() => {
      sendReponse("E", 4);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

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

export default TrueOrFalse;
