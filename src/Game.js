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
        {/* check if game data has aliases and display */}
        {typeof randomGame.aliases !== 'object' ? (
          <h3 className="alias">AKA: {randomGame.aliases}</h3>
        ) : (
          <h3 className="alias">No known aliases for this game</h3>
        )}
        <p className="gameDesc">{randomGame.deck}</p>
      </div>
    </div>
  );
}

export default Game;
