import React, { useContext } from "react";
import { Link } from "react-router-dom"; // Corrected import statement

import "../styles/BoxMusic.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SingerSongsDisplay from "../pages/SingerSongsDisplay";
import { ThemeContext } from "../routes/MyRoutes";

export default function BoxMusic({ singer }) {
  const theme = useContext(ThemeContext);

  // console.log(singer.image_url)
  return (
    <div className={`box-music-container  ${theme.isDarkTheme?"dark":"light"}-theme`}>
      <div className="box-music-box">
        <div className="box-music-img">
          <img
            src={singer.image_url}
            alt={singer.name}
            className="singer-image"
          />
          <Link to={`/layout/singer/${singer.id}`}>
            <button className="playCircleFilledIcon">
              <PlayArrowIcon
                sx={{
                  fontSize: 30,
                  color: "black",
                }}
              />
            </button>
          </Link>
        </div>
        <div className="box-music-title ">
          <h3>{singer.name}</h3>
        </div>
        <div className="box-music-desc">{singer.description}</div>
      </div>
    </div>
  );
}
