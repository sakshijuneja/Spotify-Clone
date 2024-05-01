import React, { useState } from "react";
import Songs from "../Data/Songs.json";
import SingerData from "../Data/SingerData.json";
import BoxMusic from "../components/BoxMusic";
import SongTile from "../components/SongTile";

export default function Search({ setIsSongPlay }) {
  const [value, setValue] = useState("");
  const [filteredSongs, setfilteredSongs] = useState([]);
  const [filteredSingers, setfilteredSingers] = useState([]);
  // const singerSongs = Songs;

  // const topTracks = singerSongs[0].top_tracks;
  const [currentSong, setCurrentSong] = useState(null);

  const handleSongClick = (song) => {
    if (currentSong === song) {
      setCurrentSong(null); // Pause the current song if it's clicked again
    } else {
      setCurrentSong(song); // Set the new current song
    }
  };
  // let filteredSongsArray = [];
  let filteredSingersArray = [];

  const handleSearchInput = (event) => {
    const inputValue = event.target.value.toLowerCase();
    setValue(inputValue);

    if (inputValue === "") {
      setfilteredSongs([]);
      setfilteredSingers([]);
    } else {
      let filteredSongs = [];
      for (let singer of SingerData) {
        if (singer.name.toLowerCase().includes(inputValue)) {
          filteredSingersArray.push(singer);
        }
      }

      for (let song of Songs) {
        const filteredTracks = song.top_tracks.filter((el) =>
          el.title.toLowerCase().includes(inputValue)
        );
        if (filteredTracks.length > 0) {
          filteredSongs.push({
            singer: song.singer, // Assuming there's a singer property in your song object
            tracks: filteredTracks,
          });
        }
      }

      setfilteredSongs(filteredSongs);
      setfilteredSingers(filteredSingersArray);
    }
  };

  return (
    <div >
      <input
        type="search"
        placeholder="Search songs"
        value={value}
        onChange={handleSearchInput}
        style={{
          width: "40%",
          padding: "1rem 0.5rem",
          border: "none",
          textDecoration: "none",
      position:"absolute",
      left:"35%",
      top:"5%"
          
        }}
      />

      <div style={{ display: "flex" }}>
        <div style={{}}>
          {filteredSingers &&
            filteredSingers.map((singer, index) => (
              <BoxMusic key={singer.id} singer={singer} />
            ))}
        </div>

        <div style={{ width: "100%" }}>
          {filteredSongs &&
            filteredSongs.map((songGroup, index) => (
              <div key={index}>
                <h3>{songGroup.singer}</h3>
                {songGroup.tracks.map((track, idx) => (
                  <SongTile
                    key={idx}
                    song={track}
                    // songNumber={idx + 1}
                    isPlaying={currentSong === track}
                    togglePlay={() => handleSongClick(track)}
                    setIsSongPlay={setIsSongPlay}
                  />
                ))}
              </div>
            ))}
        </div>


      </div>
    </div>
  );
}
