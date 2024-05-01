import React, { useContext, useEffect } from "react";
import "../styles/SongPlayingBottomBar.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { ThemeContext } from "../routes/MyRoutes";

const SongPlayingBottomBar = ({ togglePlay, isSongPlay }) => {
  console.log(isSongPlay, "isSongPlayisSongPlay");
  // Retrieve the current song from local storage
  const storedSong = JSON.parse(localStorage.getItem("currentSong"));
  const [currentSong, setCurrentSong] = React.useState(storedSong);

  // // Function to handle song tile click
  // const handleSongTileClick = (song) => {
  //   setCurrentSong(song); // Update current song state
  //   localStorage.setItem("currentSong", JSON.stringify(song)); // Update local storage
  //   togglePlay(song); // Toggle play/pause
  // };

  // Update current song state when the stored song changes
  useEffect(() => {
    setCurrentSong(storedSong);
  }, [storedSong]);

  const theme = useContext(ThemeContext);


  return (
    <div className={`Bottom-bar ${theme.isDarkTheme?"dark":"light"}-theme`} style={{ width: "100%" }}>
      {isSongPlay && (
        <>
        
          <div className="song-info">
            <img
              src={isSongPlay.image_url}
              alt=""
              width={"40px"}
              height={"40px"}
              style={{ borderRadius: "8px" }}
            />
            <p className="song-name ">{isSongPlay.title}</p>
            {/* You can add more song information here */}
          </div>
          <AudioPlayer className="audio-player"
            autoPlay
            src={isSongPlay.song_url}
            onPlay={(e) => console.log("onPlay")}
          />
        </>
      )}
    </div>
  );
};

export default SongPlayingBottomBar;
