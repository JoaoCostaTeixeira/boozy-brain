import Font from "react-font";
import "./lobby.css";
import { QRCodeCanvas } from "qrcode.react";
import UserImage from "../utils/UserImage";

import styled from "styled-components";

const IPStyled = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: calc(100vw - 400px);
  top: 10vh;
  z-index: 2;
  color: #c0b112;
  font-size: 35pt;
  font-family: impact;
  text-align: center;
  text-shadow: -2px 2px red;
  transform: rotate(11deg);
`;

const PlayersStyled = styled.div`
  position: relative;
  color: black;
  text-align: center;
  font-weight: 300;
  font-size: 3vh;
  width: calc(100vw - 400px);
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  text-shadow: 0.1vw 0.1vw 0vw rgba(0, 0, 0, 0.443);
  padding: 2rem;
`;

const NameStyled = styled.div`
  border: 3px solid #ffcc00;
  border-radius: 3px;
  margin-top: 1%;
  margin-bottom: 6%;
  background-color: #ffcc0076;
  margin-inline: auto;
  width: 85%;
`;

const UserStyled = styled.div`
  width: 12rem;
  height: 18rem;
  margin: 3rem;
  color: white;
  display: flex;
  flex-direction: column;
  border: 6px double #ffcc00;
  border-radius: 10px;
`;

function Lobby({ ip, users }) {
  return (
    <>
      <IPStyled>
      <Font family="VT323">CONNECT</Font>
        <QRCodeCanvas id="qrCode" value={ip} size={300} bgColor={"#ffffff"} />
      </IPStyled>
      <PlayersStyled>
        {users.map((user) => (
          <UserStyled key={user.socketId}>
            <UserImage index={user.img} />
            <NameStyled>
              <Font family="VT323">{user.userName}</Font>
            </NameStyled>
          </UserStyled>
        ))}
      </PlayersStyled>
    </>
  );
}

export default Lobby;
