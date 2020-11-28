import "./App.css";
import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "render-smooth-image-react/build/style.css";

function App() {
  const [games, setgames] = useState([]);
  useEffect(() => {
    fetch("https://rawg-video-games-database.p.rapidapi.com/games", {
      method: "GET",
      headers: {
        "x-rapidapi-key": "59d0b2c3c0msh86e340ae9c71bb8p13d7cbjsn0c90670232b6",
        "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setgames(data.results);
        console.log(data.results);
      });
  }, []);
  return (
    <div className="App">
      <div className="">
        {games.map((game) => (
          <div className="">
            <h1>{game.name}</h1>

            <LazyLoadImage
              alt={game.name}
              width={100}
              src={game.background_image} // use normal <img> attributes as props
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
