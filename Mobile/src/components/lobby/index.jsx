import "./login.css";
import { useState } from "react";
import { useRef } from "react";
import Font from "react-font";

function Login({ sendUserName }) {
  const userName = useRef(null);
  const [page, setPage] = useState(0);
  const [name, setName] = useState("");
  const [image, setImage] = useState(0);

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

  const send = () => {
    if (name) {
      console.log(`${name}-${image}`)
      sendUserName(`${name}-${image}`);
    }
  };

  const changePage = () => {
    if (userName?.current) {
      const { value } = userName.current;
      setName(value);
      setPage(1);
    }
  };

  if (page) {
    return (
      <div className="Main">
        <div className="connectDIV2">
          <div className="gameTitle2">
            <span className="gameTitlesSpan">
              <Font family="VT323">Boozy Brain</Font>
            </span>
            <span className="gameTitlesSpan2">
              <Font family="VT323">Can you outsmart the bottle?</Font>
            </span>
          </div>
          <span className="carTitlesSpan">
            <Font family="VT323">Select a Character</Font>
          </span>
          <div className="characterDiv">
            {imageDataSet.map((name, index) => (
              <div
                className="characterSelectionPic"
                style={index === image ? { borderColor: '#ffcc00' } : {}}
                onClick={() => setImage(index)}
              >
                <img
                  className="characterSelectionPicimg"
                  src={`images/characters/${name}`}
                ></img>
              </div>
            ))}
          </div>
          <div className="connect2" onClick={send}>
            <div className="buttomImageBackground">
              <img className="buttomImageBackgroundPIC" src="images/button.svg">
              </img>
              <Font family="VT323">SELECT</Font></div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="Main">
      <div className="connectDIV">
        <div className="gameTitle">
          <span className="gameTitlesSpan">
            <Font family="VT323">Boozy Brain</Font>
          </span>
          <span className="gameTitlesSpan2">
            <Font family="VT323">Can you outsmart the bottle?</Font>
          </span>
        </div>
        <input
          //onFocus={() => document.body.requestFullscreen()}
          ref={userName}
          onKeyUp={(e) => (e.target.value = e.target.value.toUpperCase())}
        />
        <div className="connect" onClick={changePage}
        >

          <div className="buttomImageBackground">
            <img className="buttomImageBackgroundPIC" src="images/button.svg">
            </img>
            <Font family="VT323">START</Font></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
