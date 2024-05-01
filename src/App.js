import React, { useContext } from "react";

// import SideNav from "./components/SideNav";
import './App.css';
// import Header from "./components/Header";
// import SongPlayingBottomBar from "./components/SongPlayingBottomBar";
import Layout from "./layout/Layout";
import Login from "./app/auth/Login";
import SignUp from './app/auth/SignUp';
import MyRoutes from './routes/MyRoutes';
import HookLearning from './components/HookLearning';

import { Link} from 'react-router-dom';
import Profile from './pages/Profile';

function App() {

  return (    
    <>
    <div className='App'>

    {/* <Layout/> */}
    {/* <Login/> */}
    {/* <SignUp/> */}
    <MyRoutes/>
    {/* <HookLearning/> */}
    {/* <Profile/> */}
    </div>  
    </>
  );
}

export default App;
