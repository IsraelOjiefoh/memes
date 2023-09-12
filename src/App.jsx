import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [displayedMemes, setDisplayedMemes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios
      .get("https://api.imgflip.com/get_memes")
      .then((response) => {
        const memeData = response.data.data.memes;
        setIsLoading(false);
        const shuffledMemes = shuffleArray(memeData);
        setDisplayedMemes(shuffledMemes);
      })
      .catch(() => {
        console.log("Failed to generate memes");
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (currentIndex >= displayedMemes.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, displayedMemes]);

  const nextMeme = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h3 className="text-center m-5 r text-muted  ">MEMES</h3>
        </div>
      </div>
      {isLoading ? (
        <p>Memes Loading...</p>
      ) : (
        <div className="container my-5">
          <div className="card">
            <img
              src={displayedMemes[currentIndex].url}
              alt="meme"
              className="img-fluid"
            />
            <div className="card-body">
              <h5 className="card-title">
                {displayedMemes[currentIndex].name}
              </h5>
              <button onClick={nextMeme}>Next Meme</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export default App;
