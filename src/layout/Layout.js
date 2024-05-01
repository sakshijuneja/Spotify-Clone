import React, { useContext, useState } from "react";
import SideNav from "../components/SideNav";
import Header from "../components/Header";
// import Content from "../pages/Home";
// import SongPlayingBottomBar from "../components/SongPlayingBottomBar"
import { Outlet } from "react-router-dom";
import "../styles/Layout.css";
// import Home from "../pages/Home";
// import Profile from "../pages/Profile";
import SongPlayingBottomBar from "../components/SongPlayingBottomBar";
import { ThemeContext } from "../routes/MyRoutes";

function Layout({isSongPlay}) {
  const [currentSong, setCurrentSong] = useState(null);
  console.log(currentSong, "currentSongggggggggggggggggggggg");


  const togglePlay = (song) => {
    console.log("Toggling play for song:", song);
    setCurrentSong(currentSong === song ? null : song);
    console.log(currentSong, "currentSongg in bottom");

  };
  const theme = useContext(ThemeContext);


  return (
    <>
      <div className={`layout-wrapper ${theme.isDarkTheme?"dark":"light"}-theme`}>
        <div className="layout-sidenav">
          <SideNav />
        </div>
        <div className="layout-other-section">
          <header>
            <Header />
          </header>
          <div className="content">
            {/* <Home/> */}
            {/* <Profile/> */}

            <div>
              <Outlet />
            </div>
          </div>
        </div>

        <footer>
          <SongPlayingBottomBar
            currentSong={currentSong}
            togglePlay={togglePlay}
            isSongPlay={isSongPlay}
          />
        </footer>
      </div>
    </>
  );
}

export default Layout;
