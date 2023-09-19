import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [displayedMemes, setDisplayedMemes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

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
    setImageLoaded(false);
  }, [currentIndex, displayedMemes]);

  const prevMeme = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? displayedMemes.length - 1 : prevIndex - 1
    );
    setImageLoaded(false);
  };

  const nextMeme = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === displayedMemes.length - 1 ? 0 : prevIndex + 1
    );
    setImageLoaded(false);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h3 className="text-center m-5 r text-muted">MEMES</h3>
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
              className={`img-fluid ${imageLoaded ? "show" : "hide"}`}
              onLoad={handleImageLoad}
            />
            {imageLoaded && (
              <div className="card-body">
                <h5 className="card-title">
                  {displayedMemes[currentIndex].name}
                </h5>
              </div>
            )}
            <div className="button-container d-flex justify-content-around ">
              <button  onClick={prevMeme}>Previous Meme</button>
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
