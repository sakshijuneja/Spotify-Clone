import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

import Avatar from "@mui/material/Avatar";
import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
import songsData from "../Data/Songs.json"; // Import songs JSON file
import AddBoxIcon from "@mui/icons-material/AddBox";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import SongTile from "../components/SongTile";
import { ThemeContext } from "../routes/MyRoutes";

export default function Playlist({ setIsSongPlay }) {
  const { id } = useParams();
  // const navigate = useNavigate();
  const [currentSong, setCurrentSong] = useState(null);

  // console.log(songsData);
  // console.log(id, "playlist idd");

  // Retrieve playlist name based on id
  const getPlaylistName = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const playlist = loggedInUser?.Playlists?.find(
      (playlist) => playlist.id === id
    );
    return playlist?.name || "";
  };
  const playlistName = getPlaylistName();

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  // const [showMessage, setShowMessage] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [songs, setSongs] = useState([]); // State to hold songs data
  // const [selectedSongs, setSelectedSongs] = useState([]); // State to hold selected songs

  // CSS for modal content
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#292929",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
  };
  const customStylesLight = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#a7a7a7",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7  )",
    },
  };
  // Fetch songs data when modal is opened
  useEffect(() => {
    if (modalIsOpen) {
      // Initialize an array to hold all top tracks

      let allTopTracks = [];
      // Iterate over each artist in songsData and add their top tracks to allTopTracks
      songsData.forEach((artist) => {
        // console.log(artist.top_tracks)
        for (let i = 0; i < artist.top_tracks.length; i++) {
          console.log("object");
          let obj = { ...artist.top_tracks[i], singer_id: artist.singer_id };
          allTopTracks.push(obj); // Push each obj into the allTopTracks array
          // console.log(obj)
        }
        // console.log(allTopTracks, "allTop")
      });
      // Set allTopTracks in the state
      setSongs(allTopTracks);
    }
  }, [modalIsOpen]);

  const loadSavedSongs = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser && loggedInUser.Playlists) {
      const playlist = loggedInUser.Playlists.find(
        (playlist) => playlist.id === id
      );
      return playlist ? playlist.savedSongs : [];
    }
    return [];
  };

  // const handleAddSong = (song) => {
  //   // Clone the selected song object
  //   const selectedSong = { ...song };

  //   // Retrieve user data from localStorage
  //   let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  //   let userDetailsSpotify = JSON.parse(
  //     localStorage.getItem("userDetailsSpotify")
  //   );

  //   // If user data doesn't exist or is null, initialize with default values
  //   if (!loggedInUser || loggedInUser === null) {
  //     loggedInUser = { Playlists: [] }; // Assuming Playlists is an array
  //   }
  //   if (!userDetailsSpotify || userDetailsSpotify === null) {
  //     userDetailsSpotify = []; // Assuming userDetailsSpotify is an array of users
  //   }

  //   // Find the index of the playlist in loggedInUser
  //   const playlistIndex = loggedInUser?.Playlists.findIndex(
  //     (playlist) => playlist.id === id
  //   );

  //   if (playlistIndex !== -1) {
  //     // Check if playlist exists
  //     // Clone the playlist object to avoid mutating the original state
  //     const updatedPlaylist = { ...loggedInUser.Playlists[playlistIndex] };

  //     // Check if the song already exists in saved songs
  //     const isSongExists = updatedPlaylist.savedSongs.some(
  //       (savedSong) => savedSong.singer_id === selectedSong.singer_id
  //     );

  //     if (!isSongExists) {
  //       // Push the selected song to the savedSongs array of the playlist
  //       updatedPlaylist.savedSongs.push(selectedSong);

  //       // Update the playlist in loggedInUser
  //       loggedInUser.Playlists[playlistIndex] = updatedPlaylist;

  //       // Update the user data in localStorage for loggedInUser
  //       localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

  //       console.log(
  //         selectedSong,
  //         "added to playlist",
  //         updatedPlaylist.name,
  //         "for loggedInUser"
  //       );
  //     } else {
  //       // Check if the song already exists for the specific singer
  //       const singerIndex = updatedPlaylist.savedSongs.findIndex(
  //         (savedSong) =>
  //           savedSong.singer_id === selectedSong.singer_id &&
  //           savedSong.song_id === selectedSong.song_id
  //       );

  //       if (singerIndex === -1) {
  //         // Push the selected song to the savedSongs array of the playlist
  //         updatedPlaylist.savedSongs.push(selectedSong);

  //         // Update the playlist in loggedInUser
  //         loggedInUser.Playlists[playlistIndex] = updatedPlaylist;

  //         // Update the user data in localStorage for loggedInUser
  //         localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

  //         console.log(
  //           selectedSong,
  //           "added to playlist",
  //           updatedPlaylist.name,
  //           "for loggedInUser"
  //         );
  //       } else {
  //         console.log("Song already exists in the playlist");
  //         // You may want to show a message to the user that the song already exists
  //       }
  //     }
  //   } else {
  //     console.log("Playlist not found for loggedInUser");
  //   }

  //   // Find the index of the loggedInUser in userDetailsSpotify array
  //   const userIndex = userDetailsSpotify.findIndex(
  //     (user) => user.Email === loggedInUser.Email
  //   );

  //   if (userIndex !== -1) {
  //     // Clone the updated user details object to avoid mutating the original state
  //     const updatedUserDetails = { ...loggedInUser };

  //     // Update userDetailsSpotify
  //     userDetailsSpotify[userIndex] = updatedUserDetails;
  //   } else {
  //     // Add loggedInUser to userDetailsSpotify if not found
  //     userDetailsSpotify.push(loggedInUser);
  //   }

  //   // Update userDetailsSpotify in localStorage
  //   localStorage.setItem(
  //     "userDetailsSpotify",
  //     JSON.stringify(userDetailsSpotify)
  //   );
  // };
  const handleSongClick = (song) => {
    if (currentSong === song) {
      setCurrentSong(null); // Pause the current song if it's clicked again
    } else {
      setCurrentSong(song); // Set the new current song
    }
    console.log(currentSong, "currentsong");
  };

  const handleAddSong = (song) => {
    // Clone the selected song object
    const selectedSong = { ...song };

    // Retrieve user data from localStorage
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    let userDetailsSpotify = JSON.parse(
      localStorage.getItem("userDetailsSpotify")
    );

    // If user data doesn't exist or is null, initialize with default values
    if (!loggedInUser || loggedInUser === null) {
      loggedInUser = { Playlists: [] }; // Assuming Playlists is an array
    }
    if (!userDetailsSpotify || userDetailsSpotify === null) {
      userDetailsSpotify = []; // Assuming userDetailsSpotify is an array of users
    }

    // Find the index of the playlist in loggedInUser
    const playlistIndex = loggedInUser?.Playlists.findIndex(
      (playlist) => playlist.id === id
    );

    if (playlistIndex !== -1) {
      // Check if playlist exists
      // Clone the playlist object to avoid mutating the original state
      const updatedPlaylist = { ...loggedInUser.Playlists[playlistIndex] };

      // Check if the song already exists in saved songs
      const isSongExists = updatedPlaylist.savedSongs.some(
        (savedSong) => savedSong.singer_id === selectedSong.singer_id
      );

      if (!isSongExists) {
        // Push the selected song to the savedSongs array of the playlist
        updatedPlaylist.savedSongs.push(selectedSong);

        // Update the playlist in loggedInUser
        loggedInUser.Playlists[playlistIndex] = updatedPlaylist;

        // Update the user data in localStorage for loggedInUser
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

        // Update the UI state to reflect that the song has been saved
        setSongs((prevSongs) =>
          prevSongs.map((prevSong) => {
            if (prevSong.song_id === selectedSong.song_id) {
              return { ...prevSong, isSaved: true };
            }
            return prevSong;
          })
        );

        console.log(
          selectedSong,
          "added to playlist",
          updatedPlaylist.name,
          "for loggedInUser"
        );
      } else {
        // Check if the song already exists for the specific singer
        const singerIndex = updatedPlaylist.savedSongs.findIndex(
          (savedSong) =>
            savedSong.singer_id === selectedSong.singer_id &&
            savedSong.song_id === selectedSong.song_id
        );

        if (singerIndex === -1) {
          // Push the selected song to the savedSongs array of the playlist
          updatedPlaylist.savedSongs.push(selectedSong);

          // Update the playlist in loggedInUser
          loggedInUser.Playlists[playlistIndex] = updatedPlaylist;

          // Update the user data in localStorage for loggedInUser
          localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

          // Update the UI state to reflect that the song has been saved
          setSongs((prevSongs) =>
            prevSongs.map((prevSong) => {
              if (prevSong.song_id === selectedSong.song_id) {
                return { ...prevSong, isSaved: true };
              }
              return prevSong;
            })
          );

          console.log(
            selectedSong,
            "added to playlist",
            updatedPlaylist.name,
            "for loggedInUser"
          );
        } else {
          console.log("Song already exists in the playlist");
          // You may want to show a message to the user that the song already exists
        }
      }
    } else {
      console.log("Playlist not found for loggedInUser");
    }

    // Find the index of the loggedInUser in userDetailsSpotify array
    const userIndex = userDetailsSpotify.findIndex(
      (user) => user.Email === loggedInUser.Email
    );

    if (userIndex !== -1) {
      // Clone the updated user details object to avoid mutating the original state
      const updatedUserDetails = { ...loggedInUser };

      // Update userDetailsSpotify
      userDetailsSpotify[userIndex] = updatedUserDetails;
    } else {
      // Add loggedInUser to userDetailsSpotify if not found
      userDetailsSpotify.push(loggedInUser);
    }

    // Update userDetailsSpotify in localStorage
    localStorage.setItem(
      "userDetailsSpotify",
      JSON.stringify(userDetailsSpotify)
    );
  };

  const handleDeleteSong = (index) => {
    // Clone the array of saved songs
    const updatedSavedSongs = [...loadSavedSongs()];

    // Remove the song at the specified index
    updatedSavedSongs.splice(index, 1);

    // Update the saved songs in the playlist
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const playlistIndex = loggedInUser?.Playlists.findIndex(
      (playlist) => playlist.id === id
    );
    if (playlistIndex !== -1) {
      const updatedPlaylist = { ...loggedInUser.Playlists[playlistIndex] };
      updatedPlaylist.savedSongs = updatedSavedSongs;
      loggedInUser.Playlists[playlistIndex] = updatedPlaylist;
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

      // Update the state to reflect the changes in UI
      setSongs(updatedSavedSongs);
    }

    // Optionally, you can also update the state to reflect the changes in UI
    // setSavedSongs(updatedSavedSongs);
  };

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "white";
  }

  function closeModal() {
    setIsOpen(false);
  }



  const handleSubmit = (event) => {
    event.preventDefault();
    setInputValue(""); // Clear input value after form submission
    closeModal(); // Close modal after form submission
  };

  const theme = useContext(ThemeContext);

  return (
    <div
      className={`playlist-container ${theme.isDarkTheme?"dark":"light"}-theme`}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/*---------------------------- SECTION-1 ---------------------------- */}
      <div
        className="profile-container"
        style={{ width: "100%", position: "relative" }}
      >
        <div className="">
          <Avatar sx={{ width: 120, height: 120, fontSize: 70 }}>
            {playlistName[0]}
          </Avatar>
        </div>
        <div className="profile-details">
          <div className="what-details">
            <p>Your Playlist</p>
          </div>
          <div className="profile-details-name">
            <h1>{playlistName}</h1>
          </div>

          {/* <div className='profile-details-mail'>nothing</div> */}
        </div>
        <button
          onClick={openModal}
          className="log-in-btn"
          type=""
          style={{
            color: "white",
            width: "15%",
            padding: "1rem",
            position: "absolute",
            right: "2rem",
            bottom: "0",
          }}
        >
          Add Songs
        </button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={theme.isDarkTheme ? customStyles : customStylesLight}
          contentLabel="Add Songs Modal"
        >
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
              Let's find something for your playlist {playlistName}
            </h2>
            <button
              style={{ backgroundColor: "transparent", border: "none" }}
              onClick={closeModal}
            >
              <CloseIcon sx={{ color: "red", cursor: "pointer" }} />
            </button>
          </div>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
          
          </form>
          {/* Render list of songs */}
          <div
            style={{
              maxHeight: "60vh",
              overflowY: "auto",
              position: "relative",
            }}
          >
            {songs.map((song, index) => {
              // Check if the song is already saved in the playlist
              const isSongSaved = loadSavedSongs().some(
                (savedSong) => savedSong.song_id === song.song_id
              );

              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    gap: "1rem",
                    color: "white",
                    marginBottom: "1rem",
                  }}
                >
                  <div className="Song-numbering">{index + 1}</div>
                  <div
                    style={{
                      backgroundImage: `url(${song.image_url})`,
                      height: "10%",
                      width: "10%",
                      aspectRatio: "1/1",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                    alt={song.title}
                  ></div>
                  <div style={{ overflow: "hidden" }}>
                    <h3>{song.title}</h3>
                    <p>{song.album}</p>
                  </div>
                  {/* Render tick sign if the song is already saved, otherwise render the add button */}
                  {isSongSaved ? (
                    <CheckBoxIcon
                      sx={{
                        color: "#1ed760",
                        position: "absolute",
                        right: 15,
                        transition: "color 0.3s",
                      }}
                    />
                  ) : (
                    <button
                      className="song-tile-add-btn"
                      style={{
                        height: "100%",
                        backgroundColor: "transparent",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => handleAddSong(song)}
                    >
                      <AddBoxIcon
                        sx={{
                          color: "white",
                          position: "absolute",
                          right: 15,
                          transition: "color 0.3s",
                        }}
                      />

                      <style>
                        {`.song-tile-add-btn:hover .MuiSvgIcon-root {color: #1ed760;}`}
                      </style>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </Modal>
      </div>

      {/*---------------------------- SECTION-2 ---------------------------- */}
      <div className="Your-library-container-4" style={{ width: "100%" }}>
        <div className="song-tiles">
          {loadSavedSongs().map((song, index) => (
            <div
              key={index}
              className="song-tile"
              style={{ position: "relative", width: "100%" }}
            >
              <SongTile
                song={song}
                songNumber={index + 1}
                setIsSongPlay={setIsSongPlay}
                togglePlay={() => handleSongClick(song)}

                //  isPlaying={currentSong === song}
              />
              <button
                onClick={() => handleDeleteSong(index)}
                style={{
                  position: "absolute",
                  border: "none",
                  backgroundColor: "transparent",
                  top: "50%",
                  right: "1rem",
                  transform: "translateY(-50%)",
                }}
              >
                <RemoveCircleIcon
                  sx={{
                    color: "#a7a7a7",
                    marginRight: "1rem",
                    cursor: "pointer",
                  }}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
