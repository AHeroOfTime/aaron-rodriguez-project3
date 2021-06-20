function Game(props) {
  const { randomGame } = props;
  return (
    <div>
      <h2>{randomGame.name}</h2>
      <p>{randomGame.deck}</p>
      <div className="imgContainer">
        <img
          src={randomGame.image.original_url}
          alt={`Box art for ${randomGame.name}`}
        />
      </div>
    </div>
  );
}

export default Game;
