import Font from "react-font";
import "./lobby.css";
import { QRCodeCanvas } from "qrcode.react";
import UserImage from "../utils/UserImage";
function Lobby({ ip, users }) {
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

  return (
    <>
      <div className="Ip">
        Connect
        <QRCodeCanvas id="qrCode" value={ip} size={300} bgColor={"#ffffff"} />
      </div>
      <div className="Players">
        {users.map((user) => (
          <div key={user.socketId} className="pp">
            <UserImage index={user.img} />
            <div className="username">
              <Font family="VT323">{user.userName}</Font>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Lobby;
