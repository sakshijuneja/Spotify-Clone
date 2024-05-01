import React, { createContext, useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import SignUp from "../app/auth/SignUp";
import Layout from "../layout/Layout";
import Login from "../app/auth/Login";
// import Profile from '../pages/Profile';
import Home from "../pages/Home";
import SingerSongsDisplay from "../pages/SingerSongsDisplay";
import UserProfile from "../pages/UserProfile";
import Playlist from "../pages/Playlist";
import Search from "../pages/Search";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";

export const ThemeContext = createContext();

export default function MyRoutes() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  // Load theme preference from local storage on initial render
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setIsDarkTheme(storedTheme === "dark");
    }
  }, []);

  // Save theme preference to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
  }, [isDarkTheme]);

  const [isSongPlay, setIsSongPlay] = useState(null);
  // Retrieve token from localStorage
  const token = JSON.parse(localStorage.getItem("token"));

  // Private Route component
  function PrivateRoute({ isAuthenticated }) {
    if (!isAuthenticated) return <Navigate to="/" />;
    return <Outlet />;
  }

  // Public Route component
  function PublicRoute({ isAuthenticated }) {
    if (isAuthenticated) {
      return <Navigate to="/layout" replace />;
    }
    return <Outlet />;
  }

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      <BrowserRouter>
        <button
          onClick={toggleTheme}
          className={isDarkTheme ? "dark-theme" : "light-theme"}
          style={{
            // backgroundColor: "transparent",
            border: "none",
            position: "absolute",
            right: "2rem",
            top: "1.5rem",
            zIndex: "1",
            backgroundColor: isDarkTheme ? "#000000B3" : "white", // Black background for dark theme, white background for light theme
            borderRadius: "50%",
            padding: "0.35rem 0.45rem",
          }}
        >
          {isDarkTheme
            ? ((() => console.log("dark"))(),
              (<ToggleOnIcon sx={{ color: "white" }} />))
            : ((() => console.log("light"))(),
              (<ToggleOffIcon sx={{ color: "black" }} />))}
        </button>

        <div className={isDarkTheme ? "dark-theme" : "light-theme"}>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<PublicRoute isAuthenticated={token} />}>
              <Route path="/" element={<Login />} />

              <Route path="signup" element={<SignUp />} />
            </Route>

            {/* Private routes */}
            <Route
              path="/layout"
              element={<PrivateRoute isAuthenticated={token} />}
            >
              <Route element={<Layout isSongPlay={isSongPlay} />}>
                <Route index element={<Home />} />
                <Route path="user-profile" element={<UserProfile />} />
                <Route
                  path="singer/:id"
                  element={<SingerSongsDisplay setIsSongPlay={setIsSongPlay} />}
                />
                <Route
                  path="playlist/:id"
                  element={<Playlist setIsSongPlay={setIsSongPlay} />}
                />
                <Route
                  path="search"
                  element={<Search setIsSongPlay={setIsSongPlay} />}
                />
              </Route>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}
