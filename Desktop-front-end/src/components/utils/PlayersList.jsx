import Font from "react-font";
import styled from "styled-components";
import UserImage from "./UserImage";

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

const Wrong = styled.div`
  color: red;
  margin-left: -5px;
`;

const Right = styled.div`
  color: #04ff04;
  margin-left: -5px;
`;

function PlayersList({ users, showResults, showDrinking }) {
  return (
    <PlayersStyled>
      {users
        .sort((a, b) => b.score - a.score)
        .map((user) => (
          <UserStyled key={user.socketId}>
            <UserImage index={user.img} width={70} />
            <NameStyled>
              <Font family="VT323">{user.userName}</Font>
              {showResults ? (
                <ShowScore score={user.scoreInThis} />
              ) : showDrinking ? (
                <Font family="VT323">DRINK</Font>
              ) : (
                <Font family="VT323">{user.score}</Font>
              )}
            </NameStyled>
          </UserStyled>
        ))}
    </PlayersStyled>
  );
}

function ShowScore({ score = "" }) {
  if (score.charAt(0) === "-") {
    return (
      <Wrong>
        <Font family="VT323">{score}</Font>
      </Wrong>
    );
  }

  return (
    <Right>
      <Font family="VT323">{score}</Font>
    </Right>
  );
}
export default PlayersList;
