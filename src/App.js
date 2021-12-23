// 'external' imports
import { useState } from 'react';
// internal imports
import Game from './Game';
import Loader from './Loader';

import './App.css';

function App() {
  // Create state for a single random game and loading state
  const [randomGame, setRandomGame] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Helper Functions
  // random number generator
  function getRandomNumber(upperLimit) {
    const randomNum = Math.floor(Math.random() * upperLimit);
    return randomNum;
  }

  // create a random offset value to use as a param in fetch call
  const getRandomOffset = () => {
    // number of games returned from api (snes)
    const max = 1778;
    const randomOffset = getRandomNumber(max);
    return randomOffset;
  };

  // create function to fetch data
  const getData = async (e) => {
    // prevent default form function
    e.preventDefault();
    // update state so loader shows
    setIsLoading(true);
    setRandomGame({});
    // create a randomOffset value
    const randomOffsetValue = getRandomOffset();
    // NOTE: The API is limited to pull in 100 items max at a time, so I came up with a way to randomize the offset value and limit it to 1 game per call. This allows the app to select from all 1779 results, BUT it has to call the API every time. Not ideal, but I don't see an efficient way to pull in all of the games and store them in state.

    // creating proxy
    const proxiedUrl = 'https://www.giantbomb.com/api/games/';
    const url = new URL('https://proxy.hackeryou.com');
    url.search = new URLSearchParams({
      xmlToJSON: true,
      reqUrl: proxiedUrl,
      'params[api_key]': '0a88b2981b009c7b2ccd0dc9eed28515c39fc609',
      'params[platforms]': '9',
      // params for expanding game selection to max (1779)
      'params[offset]': randomOffsetValue,
      'params[limit]': 1,
    });

    const response = await fetch(url);
    const games = await response.json();
    // Not sure if this await actually does anything v
    const gamesArray = await games.response.results.game;

    setRandomGame(gamesArray);
  };

  return (
    <div className="App">
      <header>
        <h1>Random Speedgame Selector</h1>
      </header>

      <div className="wrapper">
        <section className="container">
          {/* check id the game data has returned, if not check loading status */}
          {Object.keys(randomGame).length ? (
            // once data is loaded, display Game component
            <Game randomGame={randomGame} />
          ) : isLoading ? (
            // nested conditional rendering :3
            <Loader />
          ) : (
            <p className="introText card">
              Hello friend! The point of this application is to help you find a
              new speedgame. All you have to do is hit the button below and a
              random game will be selected for you. As of now it only selects
              from the SNES library (which is objectively the best console
              anyways), but it may support other platforms in the future. Are
              you ready to find your new speedgame?
            </p>
          )}
        </section>

        <section className="submit">
          <form onSubmit={getData} name="gameForm">
            <button type="submit" className="getGame">
              Get new speedgame!
            </button>
          </form>
        </section>
      </div>
      <footer>
        Created at{' '}
        <a href="https://junocollege.com/" target="_blank" rel="noreferrer">
          Juno College
        </a>{' '}
        by{' '}
        <a
          href="https://github.com/AHeroOfTime"
          target="_blank"
          rel="noreferrer"
        >
          AER
        </a>
      </footer>
    </div>
  );
}

export default App;
