import "./lobby.css";

function Lobby({ ip, users }) {
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
            <img src='./characters/pupa_drinking.png'></img>
            {user.userName}
          </div>
        ))}
      </div>
    </>
  );
}

export default Lobby;
