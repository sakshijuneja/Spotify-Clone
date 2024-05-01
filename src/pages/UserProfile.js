
import React, {useContext, useState} from 'react';
import Avatar from "@mui/material/Avatar";

import "../styles/Profile.css";
import { ThemeContext } from '../routes/MyRoutes';

export default function UserProfile() {
  const theme = useContext(ThemeContext);

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const [initialLetter, setInitialLetter] = useState('');

  // Retrieve user details from localStorage on component mount
  if (!initialLetter) {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser && loggedInUser.Name) {
      // Extract the initial letter from the user's name after trimming any leading or trailing spaces
      const name = loggedInUser.Name.trim();
      setInitialLetter(name.charAt(0).toUpperCase());
      console.log("Initial letter set:", name.charAt(0).toUpperCase());
    }
  }
  

  return (
    <div className={`profile ${theme.isDarkTheme?"dark":"light"}-theme`}>
      <div className='profile-container'>
        <div className='' ><Avatar sx={{width: 120, height: 120, fontSize: 60
                }}>  {initialLetter}
                </Avatar></div>
        <div className='profile-details'>
            <div className='profile-details-name'><h1>{loggedInUser.Name}</h1></div>
            <div className='profile-details-mail'>{loggedInUser.Email}</div>
        </div>
      </div>
    </div>
  )
}