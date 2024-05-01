import React, { useContext } from "react";
import '../styles/Home.css';
import BoxMusic from '../components/BoxMusic';
import singersData from '../Data/SingerData.json'; 
import { ThemeContext } from "../routes/MyRoutes";


export default function Home() {
  const theme = useContext(ThemeContext);

  return (
    <div className={`home-container ${theme.isDarkTheme?"dark":"light"}-theme`}>
      {singersData.map((singer) => (
        <BoxMusic key={singer.id} singer={singer} />
      ))}
    </div>
  );
}
