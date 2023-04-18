import "./lobby.css";

function Lobby({ ip, users }) {

  const imageDataSet = [
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

  return (
    <>
      <div className="Ip">Server IP: {ip}</div>0
      <div className="Players">
        {users.map((user) => (
          <div
            className="pp"
            style={
              users.length > 12
                ? { width: "7rem", heigth: "7rem" }
                : { width: "10rem", height: "10rem" }
            }
          >
            <img className="userImage" src={`./characters/${imageDataSet[user.img]}`}></img>
            {user.userName}
          </div>
        ))}
      </div>
    </>
  );
}

export default Lobby;
