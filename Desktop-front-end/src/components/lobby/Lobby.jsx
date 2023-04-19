import Font from "react-font";
import "./lobby.css";

function Lobby({ ip, users }) {

  const imageDataSet = [
    "goose_bow.png",
    "goose_knife.png",
    "goose_skate.png","pupa_drinking.png",
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

  return (
    <>
      <div className="Ip">Server IP: {ip}</div>0
      <div className="Players">
        {users.map((user) => (
          <div
            className="pp"
            style={
              users.length > 12
                ? { width: "12vw", heigth: "35vh" }
                : { width: "12vw", heigth: "35vh"  }
            }
          >
            <img className="userImage" src={`./characters/${imageDataSet[user.img]}`}></img>
            <div className="username"> <Font family="VT323">{user.userName}</Font></div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Lobby;
