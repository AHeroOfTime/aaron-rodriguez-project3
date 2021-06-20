function Game(props) {
  const { randomGame } = props;
  return (
    <div className="gameInfo">
      <div className="imgContainer">
        <img
          src={randomGame.image.original_url}
          alt={`Box art for ${randomGame.name}`}
        />
      </div>
      <div className="textContainer">
        <h2 className="gameName">{randomGame.name}</h2>
        <p className="gameDesc">{randomGame.deck}</p>
      </div>
    </div>
  );
}

export default Game;
