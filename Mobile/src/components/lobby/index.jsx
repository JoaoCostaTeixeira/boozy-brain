import "./login.css";
import { useRef } from "react";
import Font from 'react-font'

function Login({ sendUserName }) {
  const userName = useRef(null);
  const send = () => {
    if (userName?.current) {
      const { value } = userName.current;
      sendUserName(value);
    }
  };
  return (
    <div className="Main">
      <div className="connectDIV">
      <div className="gameTitle">
        <span className="gameTitlesSpan"><Font family='VT323'>Boozy Brain</Font></span>
        <span className="gameTitlesSpan2"><Font family='VT323'>Can you outsmart the bottle?</Font></span>
      </div>
        <input
          onFocus={() => document.body.requestFullscreen()}
          ref={userName}
          onKeyUp={(e) => (e.target.value = e.target.value.toUpperCase())}
        />
        <button className="connect" onClick={send}>
          <Font family='VT323'>START</Font>
        </button>
      </div>
    </div>
  );
}

export default Login;
