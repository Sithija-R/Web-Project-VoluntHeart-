import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkIcon from "@mui/icons-material/Link";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Postcontainer from "../Homesection/Postcontainer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

import ProfileModal from "./ProfileModal";
import { getUsersLikedPosts, getUsersPosts } from "../../Storage/Posts/Action";
import ProfileCards from "../RightSection/ProfileCards";

const Profile = () => {
  const { auth } = useSelector((store) => store);
  const { post } = useSelector((store) => store);
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  console.log("auth ", auth.user);

  const modelstyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    height: 500,
    bgcolor: "background.paper",
    outline: "none",
    boxShadow: 24,
    p: 4,
    borderRadius: "12px",
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersPosts(auth.user?.userSecret));
    dispatch(getUsersLikedPosts(auth.user?.userSecret));
  }, [post.like, post.delete, post.posts]);

  const [openProfileModal, setOpenProfileModal] = useState(false);
  const handleEditProfile = () => setOpenProfileModal(true);
  const handleClose = () => setOpenProfileModal(false);
  const [tabvalue, setTabValue] = React.useState("1");

  const [modalopen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleWebsiteClick = (event) => {
    event.preventDefault();
    const url = auth.user?.website;
    if (url) {
      const formattedUrl =
        url.startsWith("http://") || url.startsWith("https://")
          ? url
          : `http://${url}`;
      window.open(formattedUrl, "_blank");
    } else {
      console.error("Website URL Is Not Defined");
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const locationurl = `https://maps.google.com/maps?q=${auth.user.userLocation?.lat},${auth.user.userLocation?.lng}&hl=es;&output=embed`;

  return (
    <div className=" bg-white rounded-xl mt-5">
      <div className="flex items-center sticky top-5 bg-opacity-95 mt-3 mb-1 bg-white  ">
        <ArrowBackIcon className="cursor-pointer" onClick={handleBack} />
        <h1
          className="text-lg opacity-90 ml-5 cursor-pointer"
          onClick={handleBack}
        >
          Back
        </h1>
      </div>
      <div
        className="hideScrollBar overflow-y-scroll px-2 bg-white "
        style={{ height: "88vh" }}
      >
        <section>
          <img
            className="w-[100%] h-[15rem] object-cover"
            src={
              auth.user?.coverImage
                ? auth.user?.coverImage
                : `https://hds.hel.fi/images/foundation/visual-assets/placeholders/image-m@2x.png`
            }
            alt="cover photo"
          />
        </section>
        <section className="pl-6 flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className=" transform -translate-y-24"
            src={auth.user?.profilePic}
            sx={{ width: "10rem", height: "10rem", border: "4px solid white" }}
          />

          <Button
            sx={{
              borderRadius: "20px",
              backgroundColor: "#0ca916",
              "&:hover": { bgcolor: "darkgreen" },
            }}
            onClick={handleEditProfile}
            variant="contained"
          >
            Edit Profile
          </Button>
        </section>
        <section>
          <div className="flex items-center justify-between px-12">
            <div>
              <h3 className="font-bold text-lg opacity-80">
                {auth.user?.fullName}
              </h3>
              <p className="text-sm text-gray-500">{auth.user?.email}</p>
            </div>
            <div className=" text-right">
              <p className="text-sm  font-semibold  pt-1 opacity-80 text-green-500">
                {auth.user?.donor ? "Donor" : "Fundraiser"}
              </p>
              {auth.user?.regNumber ? (
                <p className="text-xm text-gray-500">
                  Reg. No: {auth.user?.regNumber}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        </section>
        <section className="px-12 mt-4 opacity-80 py-2 mx-2 border-y-[1px]">
          <p>{auth.user?.about}</p>
        </section>
        <section className="flex items-center space-x-6  text-gray-500 mt-6 pl-12 mb-2 ">
          <div className="cursor-pointer flex" onClick={handleModalOpen}>
            <LocationOnIcon className="text-blue-400" />
            <p>Location</p>
          </div>
          <div
            className="cursor-pointer flex space-x-1"
            onClick={handleWebsiteClick}
          >
            <LinkIcon className="text-blue-400" />
            <p>Website</p>
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
                  <Tab label="Likes" value="2" />
                  <Tab label="Followers" value="3" />
                  <Tab label="Following" value="4" />
                </TabList>
              </Box>
              <TabPanel
                value="1"
                className="hideScrollBar overflow-y-scroll space-y-2"
                sx={{ height: "75vh" }}
              >
                {post.usersPosts?.map((item) => (
                  <Postcontainer item={item} />
                ))}
              </TabPanel>

              <TabPanel
                value="2"
                className="hideScrollBar overflow-y-scroll space-y-2"
                sx={{ height: "75vh" }}
              >
                {post.likedPosts?.map((item) => (
                  <Postcontainer item={item} />
                ))}
              </TabPanel>

              <TabPanel
                value="3"
                className="hideScrollBar overflow-y-scroll space-y-2"
                sx={{ height: "75vh" }}
              >
                {auth.user.followers?.map((item) => (
                  <ProfileCards item={item} />
                ))}
              </TabPanel>
              <TabPanel
                value="4"
                className="hideScrollBar overflow-y-scroll space-y-2"
                sx={{ height: "75vh" }}
              >
                {auth.user.following?.map((item) => (
                  <ProfileCards item={item} />
                ))}
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
              <CloseIcon
                onClick={handleModalClose}
                className="cursor-pointer"
              />
            </div>
            <iframe
              id="iframeId"
              src={locationurl}
              height="400px"
              width="100%"
            ></iframe>
          </Box>
        </Modal>
      </div>
      <ProfileModal handleClose={handleClose} open={openProfileModal} />
    </div>
  );
};

export default Profile;
