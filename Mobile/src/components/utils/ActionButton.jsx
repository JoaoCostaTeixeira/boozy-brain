import styled from "styled-components";
import Button from "./Button";

const ActionButtonDiv = styled.div`
  margin: auto;
  display: block;
  height: 14vh;
  width: 100vw;
  background-color: rgba(255, 255, 255, 0);
  line-height: 14vh;
  text-shadow: 0.5vw 0.5vw 0vw rgba(0, 0, 0, 0.443);
  color: cornsilk;
  font-family: monospace;
  font-weight: 500;
  font-size: 8vh;
  text-align: center;
  position: relative;
`;

function ActionButton({ text = "", onClick }) {
  return (
    <ActionButtonDiv onClick={onClick}>
      <Button text={text} />
    </ActionButtonDiv>
  );
}

export default ActionButton;
