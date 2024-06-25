import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo3 from "../../Resources/assets/logo3.png";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNavicon, faX } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../Storage/Auth/Action";

import Talk from 'talkjs';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const [menuPosition, setmenuPosition] = useState(-250);
  const [unreads, setUnreads] = useState("")

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
        appId: "tUOECsOe",
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
        console.log("unreads ",amountOfUnreads)
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
            sx={{ width: "3rem", height: "3rem", border: "1px solid white" }}
            src={auth.user?.profilePic}
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
            <div className={` ${
            (unreads>0) ? "block" : "hidden"
          } bg-[#0cac74] w-2 h-2 rounded-full absolute left-[4.3rem]` }></div>
            Messages
          </Link>
        </li>

        <li className="profilePic " onClick={toggleNavigation}>
          <Avatar src={auth.user?.profilePic} />
        </li>

        <div
          id="toggleProfileDiv"
          className={`w-40 absolute top-[3.2rem] left-[91rem] pt-5 h-24 bg-[#302c34] -z-10 ${
            isNavVisible ? "block" : "hidden"
          } rounded-lg`}
        >
          <ul id="toggleProfile">
            <li onClick={() => {navigate("/Profile");
                                setIsNavVisible();  }}>View Profile</li>
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
    </nav>
  );
};

export default Navbar;
