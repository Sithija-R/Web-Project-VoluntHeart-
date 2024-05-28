import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import Navigation from "../Navigation/Navigation";
import Homesection from "../Homesection/Homesection";
import { Hidden } from "@mui/material";
import Rightsection from "../RightSection/Rightsection"
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Route, Routes } from "react-router-dom";
import Profile from "../Profile/Profile";
const HomePage = () => {


const handleTheme=()=>{
  console.log('handle theme');
}
useEffect(() => {
 
}, []);


  return (
    <>
      <header className=" fixed w-full bg-gray-500 h-16 py-1 px-14 flex items-center justify-between">
        <div className="py-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-11.5 -10.23174 23 20.46348"
            width="50"
          >
            <title>React Logo</title>
            <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
            <g stroke="#61dafb" stroke-width="1" fill="none">
              <ellipse rx="11" ry="4.2" />
              <ellipse rx="11" ry="4.2" transform="rotate(60)" />
              <ellipse rx="11" ry="4.2" transform="rotate(120)" />
            </g>
          </svg>
        </div>
        <div className="cursor-pointer">
          <DarkModeIcon onClick={handleTheme}/>
        </div>
      </header>

      <Grid
        container
        xs={12}
        className="fixed top-16  px-5 lg-10 flex-column justify-between bg-slate-200 -z-10"
      >
        <Grid item xs={0} lg={2} className="  max-w-10  bg-lime-100 hidden-xs">
          <Hidden lgDown>
            <Navigation />
          </Hidden>
        </Grid>

        <Grid item xs={10} lg={6} className="  bg-amber-100 " sx={{height:'92vh'}}>

          <Routes>
            <Route path="/" element={ <Homesection />}></Route>
            <Route path="/home/" element={ <Homesection />}></Route>
            <Route path="/profile/" element={ <Profile/>}></Route>
          </Routes>
         
        </Grid>

        <Grid item xs={0} lg={3} className="  bg-red-100">
          <Hidden lgDown>
            <Rightsection/>
          </Hidden>
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
