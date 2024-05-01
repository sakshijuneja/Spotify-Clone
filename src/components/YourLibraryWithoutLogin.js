import React from "react";
import "../styles/YourLibraryWithoutLogin.css";

export default function YourLibraryWithoutLogin() {
  return (
    <>
      <div className="YourLibraryWithoutLogin-box">
        <div className="YourLibraryWithoutLogin-box-container">
          <h3 className="YourLibraryWithoutLogin-box-heading">
            Create your first playlist
          </h3>
          <p className="YourLibraryWithoutLogin-box-dec">
            It's east, we'll help you
          </p>
          <button className="white-outside-black-inside-btn">
            Create Playlist
          </button>
        </div>
      </div>
      <div className="YourLibraryWithoutLogin-box">
        <div className="YourLibraryWithoutLogin-box-container">
          <h3 className="YourLibraryWithoutLogin-box-heading">
            Let's find some podcasts to follow
          </h3>
          <p className="YourLibraryWithoutLogin-box-dec">
            We'll keep you updated on new episodes
          </p>
          <button className="white-outside-black-inside-btn">
            Browse podcasts
          </button>
        </div>
      </div>
    </>
  );
}
