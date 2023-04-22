import { useState } from "react";
import Joke from "../joke";
import Normal from "../gameTypes/Normal";

function Game({ question, sendReponse, userName, image }) {
  const [joke, setJoke] = useState(0);

  if (!question)
    return <Joke userName={userName} newJoke={joke} image={image} />;

  if (question === "normal")
    return (
      <Normal
        sendReponse={sendReponse}
        userName={userName}
        image={image}
        setJoke={setJoke}
      />
    );
  return (
    <>
    </>
  );
}

export default Game;
