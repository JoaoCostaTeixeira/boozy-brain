import { useState } from "react";
import Joke from "../joke";
import Normal from "../gameTypes/Normal";
import TrueOrFalse from "../gameTypes/TrueFalse";
import HeadsTails from "../gameTypes/HeadsTails";

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

  if (question === "trueorfalse")
    return (
      <TrueOrFalse
        sendReponse={sendReponse}
        userName={userName}
        image={image}
        setJoke={setJoke}
      />
    );

  if (question === "headstails")
    return (
      <HeadsTails
        sendReponse={sendReponse}
        userName={userName}
        image={image}
        setJoke={setJoke}
      />
    );
  return <></>;
}

export default Game;
