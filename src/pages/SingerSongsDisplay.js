import React, { useState, useContext } from "react";
import "../styles/SingerSongsDisplay.css";
import { useParams } from "react-router-dom";
import Profile from "./Profile"; // Import the Profile component
import singersData from "../Data/SingerData.json"; // Import your JSON data
import songsData from "../Data/Songs.json"; // Import your songs data
import SongTile from "../components/SongTile";
import { ThemeContext } from "../routes/MyRoutes";

export default function SingerSongsDisplay({setIsSongPlay}) {
  const theme = useContext(ThemeContext);

  const [currentSong, setCurrentSong] = useState(null);
  // console.log(currentSong, "currentSongggggggggggggggggggggg");

//FIND SINGER
  // const location = useLocation();
  // console.log(location, "locationnnnnn") ;
  const { id } = useParams(); // Get the singer ID from the URL params
  // console.log(id,"idddddddddddddddddd")
  // Convert the id parameter to a number
  const singerId = parseInt(id);
  // Find the singer in your JSON data array by ID
  const singer = singersData.find((singer) => singer.id === singerId);
  // console.log(singer);
  if (!singer) {
    return <div>Singer not found</div>;
  }

  // Filter songs based on the singer's ID
  const singerSongs = songsData.filter((song) => song.singer_id === singerId);
  // const selectedSingerId = singerSongs[0].singer_id;
  const topTracks = singerSongs[0].top_tracks;
  // console.log(selectedSingerId, "selectedSingerId")
  // // console.log(singer, "singer");
  // console.log("singerSongs", singerSongs);
  // // console.log("topTRACKS", topTracks);
  
  // const topTracks = singerSongs[0].top_tracks.map(track => ({
  //   ...track,
  //   singer_id: selectedSingerId
  // }));
  
  // console.log("Top Tracks with Singer ID:", topTracks) c;
  const handleSongClick = (song) => {
    if (currentSong === song) {
      setCurrentSong(null); // Pause the current song if it's clicked again
    } else {
      setCurrentSong(song); // Set the new current song
    }
    // console.log(currentSong, "currentsong")
  };



  // Pass the singer prop to the Profile component
  return (
    <div className={`song-display-container ${theme.isDarkTheme?"dark":"light"}-theme`}>
      {/* <Profile singer={singer} /> */}
      <Profile singer={singer} playlistTitle="Playlist" />
      <div className="song-tiles">
        {topTracks.map((song, index) => (
         <SongTile
         key={index}
         song={song}
         songNumber={index + 1}
         isPlaying={currentSong === song}
         togglePlay={() => handleSongClick(song)}
        setIsSongPlay={setIsSongPlay}   
       />
        ))}
      </div>
    </div>
  );
}
