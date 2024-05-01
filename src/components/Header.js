import React, { useState,useContext } from "react";
import { Link , NavLink, useNavigate} from "react-router-dom"; // Corrected import statement

import "../styles/Header.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Avatar from "@mui/material/Avatar";
import Logout from "../components/Logout";
import Profile from "../pages/Profile";
import { ThemeContext } from "../routes/MyRoutes";

const Header = () => {
  let navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [initialLetter, setInitialLetter] = useState('');

  // Retrieve user details from localStorage on component mount
  if (!initialLetter) {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser && loggedInUser.Name) {
      // Extract the initial letter from the user's name after trimming any leading or trailing spaces
      const name = loggedInUser.Name.trim();
      setInitialLetter(name.charAt(0).toUpperCase());
      // console.log("Initial letter set:", name.charAt(0).toUpperCase());
    }
  }
  

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  //TO HANDLE CLICK OUTSIDE THE BOX
  const handleClickOutside = (event) => {
    if (showDropdown && !event.target.closest(".avatar-dropdown")) {
      setShowDropdown(false);
    }
  };
  document.addEventListener("click", handleClickOutside);

  const theme = useContext(ThemeContext);

  return (
    <div className={`Header ${theme.isDarkTheme?"dark":"light"}-theme`}>
      <div className="Header-container-1">
        <div className="Header-left-section">
        <button onClick={() => navigate(-1)}> 
          <ArrowBackIosNewIcon/>
          </button>
          <button onClick={() => navigate(1)}> 
          <ArrowForwardIosIcon/>
          </button>
        </div>
        <div className="Header-right-section">
          <Link to="https://www.spotify.com/us/download/windows/"  target="_blank" style={{textDecoration:"none"}}><button className="Install-app Header-btn-right">
            <ArrowCircleDownIcon/>
            Install App
          </button></Link>
          {/* <NotificationsNoneOutlinedIcon
            sx={{
              bgcolor: "#000000B3",
              borderRadius: "50%",
              padding: "5px",
              fontSize: "40px",
            }}
          /> */}
          <div className="avatar-dropdown" onClick={toggleDropdown}>
            <Avatar
              sx={{
                bgcolor: "rgb(180, 155, 200)",
                width: 24,
                height: 24,
                boxSizing: "content-box",
                border: theme.isDarkTheme ? "8px solid black" : "8px solid white", // Adjusted border based on the theme
                cursor: "pointer",
              }}
            >
               {initialLetter}
            </Avatar>
            {showDropdown && (
              <div className="dropdown-content">
                {/* <button className="profile-btn"> <Link to="about">Profile</Link></button> */}
               <Link to="/layout/user-profile" className="profile-btn"><button type="">Profile</button> </Link>
                <Logout onClick={Logout}/>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
