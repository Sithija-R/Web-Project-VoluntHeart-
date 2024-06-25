import React, { useState } from "react";
import { Grid, Hidden } from "@mui/material";

import Homesection from "../Homesection/Homesection";
import Rightsection from "../RightSection/Rightsection";

import { Route, Routes } from "react-router-dom";
import Profile from "../Profile/Profile";
import UserProfile from "../UserUtilities/UserProfile";
import Chat from "../Chat/Chat";


import About from "../About/About";

import Navbar from "./Navbar";
import LeftSection from "../LeftSection/LeftSection";

const HomePage = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);

  const handleTheme = () => {
    console.log('handle theme');
  };



  return (
    <>
      <header className="fixed w-full px-4 z-10">
        <Navbar/>
      </header>

      <Grid
        container
        className="fixed top-16 w-full flex justify-between bg-slate-0 bg-slate-100 "
      >
       


        <Grid
        xs={0}
         sm={0}
          md={0}
          lg={2.5}
          className={` py-5 pl-3`}
         
        >
          <Hidden lgDown>
          <LeftSection/>

          </Hidden>

        </Grid>
       
      
       
        <Grid
         
          xs={11.5}
          sm={11.5}
          md={8}
          lg={6.5}
          className={`  `}
          sx={{ height: '92vh' }}
        >
          <Routes>
            <Route path="/" element={<Homesection />} />
            <Route path="/home" element={<Homesection />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:userSecret" element={<UserProfile />} />
            <Route path="/messages" element={<Chat />} />
            <Route path="/messages/:userSecret" element={<Chat />} />
            <Route path="/about" element={<About />} />

          </Routes>
        </Grid>

        <Grid
          item
          xs={0}
          sm={0}
           md={3.5}
          lg={2.7}
          className=""
          sx={{ height: '92vh' }}
        >
         
            <Rightsection />
         
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
