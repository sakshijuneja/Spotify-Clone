import React, { useContext } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
// import SongPlayingBottomBar from "./SongPlayingBottomBar";

// import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { ThemeContext } from "../routes/MyRoutes";

const SongTile = ({ song, songNumber, isPlaying, togglePlay, setIsSongPlay }) => {

  const theme = useContext(ThemeContext);

   if (!song) {
    return null; // or render a placeholder or loading state
  }

  const { title, album, image_url } = song;
   // console.log(song, "songggggg");
  //  localStorage.setItem('currentSongCLicked', JSON.stringify(song));

 
   const handlePlayPause = () => {
    // Remove previously stored song from local storage
    // localStorage.removeItem('currentSong');
    localStorage.setItem('currentSong', JSON.stringify(song));
    setIsSongPlay(song)

    // Toggle play/pause
    togglePlay(song);

  };


  return (
    <div className={`Song-tile-box ${theme.isDarkTheme?"dark":"light"}-theme`} onClick={handlePlayPause}>
      <div className="Song-numbering">{songNumber}</div>
      <div
        className="Song-tile-img"
        style={{ backgroundImage: `url(${image_url})` }}
        alt={title}
      ></div>
      <div className="Song-tile-content" style={{ overflow: "hidden" }}>
        <h3 className="Song-tile-content-title Song-tile-content-text">
          {title}
        </h3>
        <p className="Song-tile-content-desc Song-tile-content-text">{album}</p>
      </div>

      <button
        className="song-tile-play-btn"
        style={{
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
        }}
      >
        {isPlaying ? (
          <>
            {/* {console.log("pause")} */}
            <PauseIcon
              sx={{
                fontSize: 30,
                color: "#1ED760",
              }}
            />
          </>
        ) : (
          <>
            {/* {console.log("play")} */}
            <PlayArrowIcon
              sx={{
                fontSize: 30,
                color: "white",
                ":hover": {
                  color: "#1ED760",
                },
              }}
            />
          </>
        )}
      </button>
     
      {/* {isPlaying && <AudioPlayer
        autoPlay
        src={song_url}
        onPlay={e => console.log("onPlay")}
        // other props here
      />} */}
      {/* {!isPlaying && <audio src={song_url} />} */}
    </div>
  );
};

export default SongTile;
