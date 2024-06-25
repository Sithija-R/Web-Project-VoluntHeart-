import React, { useEffect, useState } from "react";
import { navigation } from "./Navigationbar";
import { useNavigate } from "react-router-dom";
import { Avatar, Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Postform from "../Homesection/Postform";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from "../../Storage/Auth/Action";

import Talk from 'talkjs';

const Navigation = () => {
  const { auth } = useSelector(store => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);



  const handleLogout = () => {
    dispatch(logOut());
    navigate(`/`);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const modelstyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    bgcolor: "background.paper",
    outline: 'none',
    boxShadow: 24,
    p: 4,
    borderRadius: '12px',
  };

  return (
    <div className="">
      <div className="px-5 py-5">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Avatar>
              <img src={auth.user?.profilePic} alt="profile pic" />
            </Avatar>
            <div>
              <p>{auth.user?.fullName}</p>
              <p className="opacity-60 text-green-500">{auth.user?.donor ? "donor" : "fundraiser"}</p>
            </div>
          </div>
          <div>
            <Button
              sx={{
                width: "120px",
                borderRadius: "30px",
                py: "10px",
                backgroundColor: "green",
                "&:hover": { bgcolor: "darkgreen" },
                lg: "2",
                xs: "0",
              }}
              variant="contained"
              onClick={handleLogout}
            >
              log out
            </Button>
          </div>
        </div>

        <div className="space-y-5 py-6">
          {navigation.map((item, index) => (
            <div
              key={index}
              className="cursor-pointer flex space-x-3 max-w-10"
              onClick={() => navigate(item.title)}
            >
              {item.icon}
              <p className="text-xl" style={{ color: "black" }}>
                {item.title}
              </p>
            </div>
          ))}
        </div>
        <div className="py-6">
          <Button
            onClick={handleOpen}
            sx={{
              width: "120px",
              borderRadius: "20px",
              py: "10px",
              backgroundColor: "green",
              "&:hover": { bgcolor: "darkgreen" },
              lg: "2",
              xs: "0",
            }}
            variant="contained"
          >
            Post
          </Button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modelstyle}>
              <div className="flex justify-between text-slate-600 mb-4">
                <h4 className="font-semibold">Create Post</h4>
                <CloseIcon onClick={handleClose} className="cursor-pointer" />
              </div>
              <Postform handleModalClose={handleClose} />
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
