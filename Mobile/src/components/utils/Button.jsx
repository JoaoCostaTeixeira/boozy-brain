import Font from "react-font";

import styled from "styled-components";

const ButtomImageBackground = styled.div`
  width: 70%;
  min-width: 350px;
  height: 100%;
  margin: auto;
  position: relative;
`;

const ImageBackground = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
`;

const Text = styled.div`
  z-index: 2;
  position: relative;
`;

function Button({ text = "" }) {
  return (
    <ButtomImageBackground>
      <ImageBackground src="images/button.svg" />
      <Text>
        <Font family="VT323">{text.toUpperCase()}</Font>
      </Text>
    </ButtomImageBackground>
  );
}

export default Button;
