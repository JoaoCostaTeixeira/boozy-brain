import Font from "react-font";

import styled from "styled-components";

const GameTilteStyle = styled.div`
  margin-inline: auto;
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.span`
  color: #ffcc00;
  font-size: 6vh;
  text-decoration: 1vw double red;
  text-shadow: -0.4vw 0.4vw red;
`;

const SubTitle = styled.span`
  olor: white;
  font-size: 3vh;
  text-align: center;
  text-shadow: -0.2vw -0.2vw red;
`;

function GameTitle() {
  return (
    <GameTilteStyle>
      <Title>
        <Font family="VT323">Boozy Brain</Font>
      </Title>
      <SubTitle className="gameTitlesSpan2">
        <Font family="VT323">Can you outsmart the bottle?</Font>
      </SubTitle>
    </GameTilteStyle>
  );
}

export default GameTitle;
