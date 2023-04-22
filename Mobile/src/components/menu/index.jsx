import ActionButton from "../utils/ActionButton";

function Menu({ startGame }) {
  return (
    <>
      <ActionButton text="Normal" onClick={() => startGame()} />
      <ActionButton text="Warm Up" onClick={() => startGame()} />
      <ActionButton text="Juiced-up" onClick={() => startGame()} />
      <ActionButton text="Wasted" onClick={() => startGame()} />
    </>
  );
}

export default Menu;
