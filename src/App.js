// 'external' imports
import { useState } from 'react';
// internal imports
import Game from './Game';

import './App.css';

function App() {
  // Create state for data and for a single random game
  const [dataArray, setDataArray] = useState([]);
  const [randomGame, setRandomGame] = useState({});

  // Helper Functions
  function getRandomNumber(upperLimit) {
    const randomNum = Math.floor(Math.random() * upperLimit);
    return randomNum;
  }

  // create function to fetch data
  const getData = async (e) => {
    // prevent default form function
    e.preventDefault();
    // creating proxy
    const proxiedUrl = 'https://www.giantbomb.com/api/games/';
    const url = new URL('https://proxy.hackeryou.com');
    url.search = new URLSearchParams({
      reqUrl: proxiedUrl,
      xmlToJSON: true,
      'params[api_key]': '0a88b2981b009c7b2ccd0dc9eed28515c39fc609',
      'params[platforms]': '9',
    });

    // Hit api and get data
    // fetch(url)
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((resData) => {
    //     // resData.response -> object(may need some of this info later)
    //     // resData.response.results.game -> array of games
    //     // const resArray = resData.response.results.game;
    //     setDataArray(resData.response.results.game);

    //     // call function that sets a random game from the array
    //     getRandomGame(dataArray);
    //   });
    const response = await fetch(url);
    const games = await response.json();
    const gamesArray = await games.response.results.game;
    // setDataArray(gamesArray);

    getRandomGame(gamesArray);
  };

  // get single game from array and display it?
  const getRandomGame = (data) => {
    // set var to pass into random number func
    const max = 100;
    // const tempArray = [];
    const randomArrayNumber = getRandomNumber(max);
    const singleRandomGame = data[randomArrayNumber];
    // tempArray.push(singleRandomGame);

    setRandomGame(singleRandomGame);
  };

  return (
    <div className="App wrapper">
      <h1>Random Speedgame Selector</h1>
      {/* put form/button in its own compontent? or conditional render if data is in array? */}
      <form onSubmit={getData}>
        <button type="submit">Get new speedgame!</button>
      </form>

      <div className="game-info">
        {Object.keys(randomGame).length ? (
          <Game randomGame={randomGame} />
        ) : (
          <p className="introText">
            Hello friend! The point of this application is to help you find a
            new speedgame. All you have to do is hit the button above and a
            random game will be selected for you.
          </p>
        )}
      </div>

      {/* <h2>Test</h2>
      <ul>
        {dataArray.map((game) => {
          return <li>{game.name}</li>;
        })}
      </ul> */}
    </div>
  );
}

export default App;
