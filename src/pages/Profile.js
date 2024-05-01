import React, { useContext } from 'react';
import "../styles/Profile.css";
import { ThemeContext } from '../routes/MyRoutes';

export default function Profile({singer, playlistTitle}) {
  const theme = useContext(ThemeContext);

  // console.log(singer)
  return (
    <div className={`profile ${theme.isDarkTheme?"dark":"light"}-theme`}>
      <div className='profile-container'>
        <div className='profile-image'>
        <img src={singer.image_url} alt={singer.name} />
        </div>
        <div className='profile-details'>
          <div className='what-details'><p>{playlistTitle}</p></div>
            <div className='profile-details-name'><h1>{singer.name}</h1></div>
            <div className='profile-details-desc'> {singer.description}</div>
        </div>
      </div>
    </div>
  )
}
