import "./App.css";
import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "render-smooth-image-react/build/style.css";

function App() {
  const [gameData, setgameData] = useState({});
  useEffect(() => {
    fetch("https://rawg-video-games-database.p.rapidapi.com/games", {
      method: "GET",
      headers: {
        "x-rapidapi-key": "59d0b2c3c0msh86e340ae9c71bb8p13d7cbjsn0c90670232b6",
        "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
      },
    })
      .then((resp) => resp.json())
      .then(({ results, next, previous }) => {
        setgameData({
          games: results,
          next,
          previous,
        });
        console.log(results, next, previous);
      });
  }, []);
  const generateNewResult = (link) => {
    fetch(link)
      .then((resp) => resp.json())
      .then(({ results, next, previous }) => {
        const newGames = gameData.games;
        newGames.push(results);
        setgameData({
          games: results,
          next,
          previous,
        });
        console.log(results, next, previous);
      });
  };
  return (
    <div className="App">
      <div className="">
        {gameData.games
          ? gameData.games.map((game) => {
              console.log(game, gameData);
              return (
                <div className="">
                  <h1>{game.name}</h1>

                  <LazyLoadImage
                    alt={game.name}
                    width={100}
                    src={game.background_image} // use normal <img> attributes as props
                  />
                </div>
              );
            })
          : null}
        {gameData.next ? (
          <button onClick={() => generateNewResult(gameData.next)}>Next</button>
        ) : null}
        {gameData.previous ? (
          <button onClick={() => generateNewResult(gameData.previous)}>
            previous
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default App;
