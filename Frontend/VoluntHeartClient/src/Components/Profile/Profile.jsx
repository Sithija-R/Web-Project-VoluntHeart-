import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkIcon from "@mui/icons-material/Link";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Postcontainer from "../Homesection/Postcontainer";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'

import ProfileModal from "./ProfileModal";
import { getUsersLikedPosts, getUsersPosts } from "../../Storage/Posts/Action";

const Profile = () => {

  const {auth}=useSelector(store=>store)
  const {post} = useSelector(store=>store)
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  const dispatch = useDispatch();
   
  useEffect(() => {
    dispatch(getUsersPosts());
    dispatch(getUsersLikedPosts());
  }, [post.like]);

 
  const [openProfileModal,setOpenProfileModal] = useState(false);
  const handleEditProfile = () => setOpenProfileModal(true);
  const handleClose = () => setOpenProfileModal(false);
  const [tabvalue, setTabValue] = React.useState("1");

  



  const handleProfileFollowing = () => {
    console.log("Profile Following");
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <div className="flex items-center sticky top-5 bg-opacity-95 mt-3 mb-1 ">
        <ArrowBackIcon className="cursor-pointer" onClick={handleBack} />
        <h1
          className="text-lg opacity-90 ml-5 cursor-pointer"
          onClick={handleBack}
        >
          Back
        </h1>
      </div>
      <div className="hideScrollBar overflow-y-scroll px-2" style={{ height: "88vh" }}>
        <section>
          <img
            className="w-[100%] h-[15rem] object-cover"
            src="https://heatherimacleod.files.wordpress.com/2014/03/space-facebook-cover.jpg"
            alt="cover photo"
          />
        </section>
        <section className="pl-6 flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="bg-red-100 transform -translate-y-24"
            src={auth.user?.profilePic}
            sx={{ width: "10rem", height: "10rem", border: "4px solid white" }}
          />
           
        
           

          {true ? (
            <Button
              sx={{
                borderRadius: "20px",
                backgroundColor: "green",
                "&:hover": { bgcolor: "darkgreen" },
              }}
              onClick={handleEditProfile}
              variant="contained"
            >
              Edit Profile
            </Button>
          ) : (
            <Button
              sx={{
                borderRadius: "20px",
                backgroundColor: "green",
                "&:hover": { bgcolor: "darkgreen" },
                lg: "2",
                xs: "0",
              }}
              onClick={handleProfileFollowing}
              variant="contained"
            >
              {true ? "Follow" : "Unfollow"}
            </Button>
          )}
        </section>
        <section>
          <div className="flex items-center justify-between px-12">
            <div>
              <h3 className="font-bold text-lg opacity-80">{auth.user?.fullName}</h3>
              <p className="text-sm text-gray-500">{auth.user?.email}</p>
            </div>

            <p className="text-sm  font-semibold  pt-1 opacity-80 text-green-500">
              {auth.user?.donor?"Donor": "Fundraiser"}
            </p>
          </div>
        </section>
        <section className="px-12 mt-2 opacity-80">
          <p>
            Exploring the intersections of technology, culture, and creativity.
            | Writer | Thinker | Coffee enthusiast | Let's dive into the world
            of ideas together! 🚀✨ #Tech #Culture #Creativity
          </p>
        </section>
        <section className="flex items-center space-x-6  text-gray-500 mt-6 pl-12 mb-2">
          <div className="cursor-pointer flex">
            <LocationOnIcon />
            <p>Location</p>
          </div>
          <div
            className="cursor-pointer flex space-x-1"
            onClick={() => window.open(auth.user?.website, "_blank")}
          >
            <LinkIcon />
            <p>Website</p>
          </div>
          <div className="cursor-pointer flex space-x-1">
            <CalendarMonthIcon />
            <p>Joined April 2024</p>
          </div>
        </section>
        <section>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={tabvalue}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleTabChange}
                  aria-label="tabs"
                  textColor="primary"
                  TabIndicatorProps={{ style: { backgroundColor: "green" } }}
                >
                  <Tab label="Posts" value="1" />
                  <Tab label="Replies" value="2" />
                  <Tab label="Likes" value="3" />
                </TabList>
              </Box>
              <TabPanel
                value="1"
                className="hideScrollBar overflow-y-scroll space-y-2"
                sx={{ height: "75vh" }}
              >
               {post.usersPosts?.map((item) => (<Postcontainer item={item} />))}

              </TabPanel>

              <TabPanel value="2" 
              className="hideScrollBar overflow-y-scroll space-y-2"
              sx={{ height: "75vh" }}>Item Two</TabPanel>

              <TabPanel value="3" 
              className="hideScrollBar overflow-y-scroll space-y-2"
              sx={{ height: "75vh" }}>
              
              {post.likedPosts?.map((item) => (<Postcontainer item={item} />))}
                
                </TabPanel>
            </TabContext>
          </Box>
        </section>
        
          
       

      </div>
      <ProfileModal handleClose={handleClose} open={openProfileModal}/>
    </>
  );
};

export default Profile;
