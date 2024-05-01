import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from 'react-router-dom';
import "../styles/SideNav.css";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import GridViewIcon from "@mui/icons-material/GridView";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import CloseIcon from "@mui/icons-material/Close";
import "../styles/SongTile.css";
// import SongTile from "./SongTile";
// import YourLibraryWithoutLogin from "../components/YourLibraryWithoutLogin"
import Modal from "react-modal";
import { ThemeContext } from "../routes/MyRoutes";



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
    backgroundColor: "rgba(0, 0, 0, 0.8  )",
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



const SideNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = useState("");
  const [playlistNames, setPlaylistNames] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [activeLink, setActiveLink] = useState(location.pathname);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "white";
  }

  function closeModal() {
    setIsOpen(false);
  }

  // Function to handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length <= 20) {
      setInputValue(value);
      setShowMessage(false);
    } else {
      setInputValue(value.slice(0, 20));
      setShowMessage(true);
    }
  };

  // Function to handle form submission
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const userDetailsSpotify = JSON.parse(localStorage.getItem("userDetailsSpotify")) || [];

  const playlists = loggedInUser.Playlists;
  // console.log(playlists, "playlistssss")


  // Function to load playlist names from localStorage
  const loadPlaylistNames = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser && loggedInUser.Playlists) {
      return loggedInUser.Playlists;
    }
    return [];
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    setPlaylistNames([...playlistNames, inputValue]);
    setInputValue(""); // Clear input value after form submission
    closeModal(); // Close modal after form submission
    const generateRandomId = () => {
      return Math.random().toString(36).substr(2, 9); // Random alphanumeric ID
    };
    
    const playlistId = generateRandomId();

    const newPlaylist = { id: playlistId, name: inputValue, savedSongs:[] ,};

    // Add playlist name to the user's playlist array
    const updatedUserDetails = {
      ...loggedInUser,
      Playlists: [...loggedInUser.Playlists,  newPlaylist],
    };
 

    // Update user details in localStorage
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUserDetails));


    // Find the index of the current user in userDetailsSpotify array
    const userIndex = userDetailsSpotify.findIndex(
      (user) => user.Email === loggedInUser.Email
    );
    if (userIndex !== -1) {
      userDetailsSpotify[userIndex] = updatedUserDetails;
    } else {
      userDetailsSpotify.push(updatedUserDetails);
    }

    // Update userDetailsSpotify in localStorage
    localStorage.setItem(
      "userDetailsSpotify",
      JSON.stringify(userDetailsSpotify)
    );
  };

  const handleDeletePlaylist = (index,event) => {
    event.stopPropagation(); // Prevent event propagation
    const updatedPlaylists = [...loadPlaylistNames()];
    updatedPlaylists.splice(index, 1);
  
    // Update playlists in localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const updatedUserDetails = {
      ...loggedInUser,
      Playlists: updatedPlaylists,
    };
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUserDetails));
  
    // Update local state
    setPlaylistNames(updatedPlaylists);
    
    // Find the index of the current user in userDetailsSpotify array
    const userIndex = userDetailsSpotify.findIndex(
      (user) => user.Email === loggedInUser.Email
    );
    if (userIndex !== -1) {
      userDetailsSpotify[userIndex] = updatedUserDetails;
    } else {
      userDetailsSpotify.push(updatedUserDetails);
    }

    // Update userDetailsSpotify in localStorage
    localStorage.setItem(
      "userDetailsSpotify",
      JSON.stringify(userDetailsSpotify)
      );
      
      navigate('/layout');


  };

  const handleSearch =() =>{
    navigate("/layout/search");
    setActiveLink("/layout/search");
  }
  const handleHomeClick = ()=>{
    setActiveLink("/layout");
  }

  const handlePlaylistClick =(playlist)=>{
    navigate(`/layout/playlist/${playlist.id}`);
    setActiveLink(`/layout/playlist/${playlist.id}`);


  }


  const theme = useContext(ThemeContext);

  
  return (

    <>
      <div className={`Side-nav ${theme.isDarkTheme?"dark":"light"}-theme`}>
        <div className="Side-nav-container">
          <ul className="Side-nav-list">
            <Link
              to="/layout"
              style={{ textDecoration: "none", color: " #a7a7a7" }}
            >
              {/* <li className="Home-icon" onClick={handleHomeClick}> */}
              <li className={`Home-icon ${activeLink === "/layout"? "active-link":""}`} onClick={handleHomeClick}>

                <HomeIcon sx={{ fontSize: 30 }} />
                Home
              </li>
            </Link>
            {/* <li className="Search-icon" onClick={handleSearch}> */}
            <li  className={`Search-icon ${activeLink === "/layout/search"? "active-link":""}`} onClick={handleSearch}>
              <SearchIcon sx={{ fontSize: 30 }} />
              Search 
            </li>
          </ul>
        </div>
        <div className="Your-library">
          <div className="Your-library-container-1">
            <button className="Your-library-btn">
              <GridViewIcon />
              <span style={{ fontSize: "1rem" }}>Your Library</span>
            </button>
            <button
              className="btnBg"
              style={{ color: "#a7a7a7" }}
              onClick={openModal}
            >
              {" "}
              <AddIcon />
            </button>
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={theme.isDarkTheme ? customStyles : customStylesLight}
              contentLabel="Example Modal"
            >
              <div
                style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}
              >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                  Enter Your Playlist Name
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
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  style={{ fontSize: "1rem" }}
                />{" "}
                {showMessage && (
                  <div style={{ color: "red" }}>
                    Input must not exceed 20 characters
                  </div>
                )}
                <button
                  className="log-in-btn"
                  style={{ width: "40%", padding: "0.5rem 0" }}
                >
                  CREATE
                </button>
              </form>
            </Modal>
            {/* <button className="btnBg" style={{ color: "#a7a7a7" }}>
              <ArrowForwardIcon />
            </button> */}
          </div>

          {/* <div className="Your-library-container-2">
            <button className="Header-All-btn Your-library-2-btn">All</button>
            <button className="Header-music-btn Your-library-2-btn">
              Music
            </button>
            <button className="Header-podcasts-btn Your-library-2-btn">
              Podcasts
            </button>
          </div> */}

          <div className="Your-library-container-4">
            <div
              className="Your-library-songs-scrollbar"
              style={{ color: "white" }}
            >
              <ul>
                {/* <h3 style={{color:"#a7a7a7"}}>Your Playlist</h3> */}
                {loadPlaylistNames().map((playlist, index) => (
                  <li
                    className="Your-playlist"
                    // className={`Your-playlist ${activeLink === navigate(`/layout/playlist/${playlist.id}`) ? "active-link":""}`}
                    key={index}
                    // onClick={() => navigate(`/layout/playlist/${playlist.id}`)}
                    onClick = { ()=>handlePlaylistClick(playlist)}
                  >
                     {playlist.name}
                    <button onClick={(event) => handleDeletePlaylist(index, event)}>
                      <RemoveCircleIcon
                        sx={{
                          color: "white",
                          marginRight: "1rem",
                          cursor: "pointer",
                          "&:hover": {
                            color: "#E7E9EB", // Pink color on hover
                          },
                          
                        }}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNav;
