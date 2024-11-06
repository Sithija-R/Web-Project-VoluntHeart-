import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo3 from "../../Resources/assets/logo3.png";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNavicon, faX } from "@fortawesome/free-solid-svg-icons";
import { Avatar, Box, Modal, Tab } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { findUserByName, logOut } from "../../Storage/Auth/Action";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import Talk from "talkjs";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { findPostByContent, getSuggestions } from "../../Storage/Posts/Action";
import Postcontainer from "../Homesection/Postcontainer";
import ProfileCards from "../RightSection/ProfileCards";
import SuggestionCard from "../RightSection/SuggestionCard";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth, post } = useSelector((store) => store);
  const [menuPosition, setmenuPosition] = useState(-250);
  const [unreads, setUnreads] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleKeyword = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  useEffect(() => {
    dispatch(findPostByContent(searchTerm));
  }, [searchTerm, post.like, post.delete]);

  useEffect(() => {
    dispatch(findUserByName(searchTerm));
    dispatch(getSuggestions(searchTerm));
  }, [searchTerm]);

  const modelstyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "98%",
    height: "85%",
    bgcolor: "background.paper",
    outline: "none",
    boxShadow: 24,
    p: 1,
    borderRadius: "12px",
  };

  const [tabvalue, setTabValue] = React.useState("1");
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const showMenu = () => {
    setmenuPosition(0);
  };

  const hideMenu = () => {
    setmenuPosition(-250);
  };

  const handleLogout = () => {
    dispatch(logOut());
    console.log("logout");
    navigate(`/`);
  };

  const [isNavVisible, setIsNavVisible] = useState(false);
  const toggleNavigation = () => {
    setIsNavVisible(!isNavVisible);
  };

  useEffect(() => {
    let session;

    const initializeTalk = async () => {
      await Talk.ready;

      if (!auth.user) {
        console.error("User data is missing");
        return;
      }

      const me = new Talk.User({
        id: auth.user?.userSecret,
        name: auth.user?.fullName,
      });

      session = new Talk.Session({
        appId: "tdjK1fO6",
        me: me,
      });

      let conversation;
      const inbox = session.createInbox();

      if (auth.anotherUser) {
        const other = new Talk.User({
          id: auth.anotherUser.userSecret,
          name: auth.anotherUser.fullName,
          photoUrl: auth.anotherUser.profilePic,
        });

        conversation = session.getOrCreateConversation(
          Talk.oneOnOneId(me, other)
        );

        conversation.setParticipant(me);
        conversation.setParticipant(other);
      } else {
        conversation = session.getOrCreateConversation(Talk.oneOnOneId(me));
        conversation.setParticipant(me);
      }

      inbox.select(conversation);

      session.unreads.onChange((unreadConversations) => {
        const amountOfUnreads = unreadConversations.length;
        console.log("unreads ", amountOfUnreads);
        setUnreads(amountOfUnreads);
      });
    };

    initializeTalk();

    return () => {
      if (session) {
        session.destroy();
      }
    };
  }, []);

  return (
    <nav className="px-5 py-1">
      <img src={logo3} className="logo" id="logo" alt="" />

      <ul id="navLinks" style={{ left: menuPosition + "px" }}>
        <li>
          <FontAwesomeIcon
            icon={faX}
            className="cut"
            id="cut"
            onClick={hideMenu}
          />
        </li>
        <li className="profile " onClick={() => navigate("/Profile")}>
          <Avatar
            src={auth.user?.profilePic}
            sx={{ width: "3rem", height: "3rem", border: "1px solid white" }}
          />
          <div>
            <p className="ml-2">{auth.user?.fullName}</p>
            <p className="ml-2 text-xs text-[#0cac74]">{auth.user?.email}</p>
          </div>
        </li>

        <li>
          <Link
            smooth={true}
            offset={0}
            duration={500}
            className="scrollLiink"
            onClick={() => navigate("/Home")}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            smooth={true}
            offset={-100}
            duration={500}
            className="scrollLiink"
            onClick={() => navigate("/About")}
          >
            About Us
          </Link>
        </li>
        <li>
          <Link
            smooth={true}
            offset={-100}
            duration={500}
            className="scrollLiink"
            onClick={() => navigate("/Messages")}
          >
            <div
              className={` ${
                unreads > 0 ? "block" : "hidden"
              } bg-[#0cac74] w-2 h-2 rounded-full absolute left-[4.3rem]`}
            ></div>
            Messages
          </Link>
        </li>
        <li>
        <Link
            smooth={true}
            offset={-100}
            duration={500}
            className="scrollLiink"
            onClick={() => navigate("/Help")}
          >
            Help
          </Link>

        </li>

        <li className="profilePic " onClick={toggleNavigation}>
          <Avatar src={auth.user?.profilePic} />
        </li>

        <div
          id="toggleProfileDiv"
          className={`min-w-40 absolute top-[7vh] right-[-2.5vw] pt-5 h-24 bg-[#302c34] -z-10 ${
            isNavVisible ? "block" : "hidden"
          } rounded-lg`}
        >
          <ul id="toggleProfile">
            <li
              onClick={() => {
                navigate("/Profile");
                setIsNavVisible();
              }}
            >
              View Profile
            </li>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        </div>

        <li className="logoutBtn">
          <button className="btn w-30" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>

      <FontAwesomeIcon icon={faNavicon} className="menu" onClick={showMenu} />
      <SearchIcon
        fontSize="large"
        id="searchButton"
        onClick={handleOpen}
        className="absolute right-6"
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modelstyle}>
          <div className="flex justify-end text-slate-600 mb-4">
            <CloseIcon onClick={handleClose} className="cursor-pointer" />
          </div>

          <div className=" flex justify-around items-center px-3 h-">
            <input
              type="text"
              value={searchTerm}
              placeholder="Search"
              onChange={handleKeyword}
              className="py-3 rounded-full text-gray-600 w-9/12 px-3 text-md border-2"
            />
            <SearchIcon fontSize="large" sx={{ color: "#2b2b2b" }} />
          </div>

          <div className="mt-2">
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
                    <Tab label="Users" value="2" />
                    <Tab label="Suggestions" value="3" />
                  </TabList>
                </Box>
                <TabPanel
                  value="1"
                  className="hideScrollBar overflow-y-scroll space-y-2"
                  sx={{ height: "60vh" }}
                >
                  {post.postSearchResult?.map((item) => (
                    <Postcontainer item={item} />
                  ))}
                </TabPanel>

                <TabPanel
                  value="2"
                  className="hideScrollBar overflow-y-scroll space-y-2"
                  sx={{ height: "60vh" }}
                >
                  {auth.findUser?.map((item) =>
                    item.userSecret == auth.user.userSecret ? (
                      ""
                    ) : (
                      <ProfileCards item={item} />
                    )
                  )}
                </TabPanel>

                <TabPanel
                  value="3"
                  className="hideScrollBar overflow-y-scroll space-y-2"
                  sx={{ height: "60vh" }}
                >
                  {post.suggestion?.map((item) => (
                    <SuggestionCard item={item} />
                  ))}
                </TabPanel>
              </TabContext>
            </Box>
          </div>
        </Box>
      </Modal>
    </nav>
  );
};

export default Navbar;
