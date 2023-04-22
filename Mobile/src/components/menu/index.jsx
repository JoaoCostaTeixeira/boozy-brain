import ActionButton from "../utils/ActionButton";

function Menu({ startGame }) {
  return (
    <>
      <ActionButton text="Normal" onClick={() => startGame('Normal')} />
      <ActionButton text="Warm Up" onClick={() => startGame('Warmup')} />
      <ActionButton text="Juiced-up" onClick={() => startGame('Juiced')} />
      <ActionButton text="Wasted" onClick={() => startGame('Wasted')} />
    </>
  );
}

export default Menu;
