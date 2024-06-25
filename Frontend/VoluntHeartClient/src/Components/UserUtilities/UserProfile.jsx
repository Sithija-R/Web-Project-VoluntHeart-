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
import { useNavigate, useParams } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import ChatIcon from '@mui/icons-material/Chat';

import { getUsersLikedPosts, getUsersPosts } from "../../Storage/Posts/Action";
import { followUserProfile, getUserByEmail } from "../../Storage/Auth/Action";

const UserProfile = () => {


  
  const {auth}=useSelector(store=>store)
  const {post} = useSelector(store=>store)
  const { userSecret } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [tabvalue, setTabValue] = React.useState("1");
  const [modalopen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
    
  };
  const handleBack = () => navigate(-1);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const modelstyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    height:500,
    bgcolor: "background.paper",
   outline:'none',
    boxShadow: 24,
    p: 4,
    borderRadius:'12px',
   
  };


  useEffect(() => {
    dispatch(getUsersPosts(userSecret));
    dispatch(getUsersLikedPosts(userSecret));
  }, [post.like,post.delete,auth.userfetch]);

  useEffect(()=>{
    dispatch(getUserByEmail(userSecret))
  },[auth.followUser,userSecret])



  const handleWebsiteClick = (event) => {
    event.preventDefault();
    const url = auth.anotherUser?.website;
    if (url) {
      const formattedUrl = url.startsWith('http://') || url.startsWith('https://') ? url : `http://${url}`;
      window.open(formattedUrl, "_blank");
    } else {
      console.error("Website URL is not defined");
    }
  };

  const handleProfileFollowing = () => {
    dispatch(followUserProfile(userSecret))
  
  };
 const handleChat =()=>{
  navigate(`/messages/${userSecret}`)
 }


  const locationurl = `https://maps.google.com/maps?q=${auth.anotherUser?.userLocation?.lat},${auth.anotherUser?.userLocation?.lng}&hl=es;&output=embed`

  return (
    <div className="bg-white mt-6">
      <div className="flex items-center sticky top-5 bg-opacity-95 mt-3 mb-1 bg-white">
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
            src={auth.anotherUser?.coverImage?(auth.anotherUser?.coverImage):(`https://hds.hel.fi/images/foundation/visual-assets/placeholders/image-m@2x.png`)
            
            }
            alt="cover photo"
          />
        </section>
        <section className="pl-6 flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className=" transform -translate-y-24"
            src={auth.anotherUser?.profilePic}
            sx={{ width: "10rem", height: "10rem", border: "4px solid white" }}
          />
           

        
        

       
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
              {auth.anotherUser?.followed? "Unfollow" : "Follow"}
            </Button>
        
        </section>
        <section>
          <div className="flex items-center justify-between px-12">
            <div>
              <h3 className="font-bold text-lg opacity-80">{auth.anotherUser?.fullName}</h3>
             
            </div>
              <div className=" text-right">

            <p className="text-sm  font-semibold  pt-1 opacity-80 text-green-500">
              {auth.anotherUser?.donor?"Donor": "Fundraiser"}
            </p>
            {auth.anotherUser?.regNumber?( <p className="text-xm text-gray-500">Reg. No: {auth.anotherUser?.regNumber}</p>):(""
            )}
           
              </div>
          </div>
        </section>
        <section className="px-12 mt-2 opacity-80">
          <p>
            {auth.anotherUser?.about}
          </p>
        </section>
        <section className="flex items-center space-x-6  text-gray-500 mt-6 pl-12 mb-2">
          <div className="cursor-pointer flex" onClick={handleModalOpen}>
            <LocationOnIcon />
            <p>Location</p>
          </div>
          <div
            className="cursor-pointer flex space-x-1"
            onClick={handleWebsiteClick}
          >
            <LinkIcon />
            <p>Website</p>
          </div>
          <div className="cursor-pointer flex space-x-1" onClick={handleChat}>
            <ChatIcon/>
            <p>Chat</p>
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
        
        <Modal
            open={modalopen}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modelstyle}>
              <div className="flex justify-between text-slate-600 mb-4">
                <h4 className="font-semibold">location</h4>
                <CloseIcon onClick={handleModalClose} className="cursor-pointer"/>
              </div>
              <iframe id="iframeId" src={locationurl} height="400px" width="100%"></iframe>
            </Box>
          </Modal>
       

      </div>
     
    </div>
  );
};

export default UserProfile;
