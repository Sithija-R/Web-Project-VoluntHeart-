import React, { useEffect, useState } from "react";

import Postcontainer from "./Postcontainer";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../Storage/Posts/Action";

import {  Box, Hidden, Modal } from '@mui/material'
import CloseIcon from "@mui/icons-material/Close";
import Postform from "./Postform";

import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';

const Homesection = () => {
  const distpatch = useDispatch();
  const {post} = useSelector(store=>store)
  const {auth} = useSelector(store=>store)
  



  
const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

const modelstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '90%',
  bgcolor: "background.paper",
  outline: 'none',
  boxShadow: 24,
  p: 4,
  borderRadius: '12px',
};

  useEffect(() => {
    distpatch(getAllPosts());
  }, [post.like,post.delete, auth.jwt,post.comment]);
  



  return (
    
     <div className="p-1 relative">
  <div className="pt-3 px-3 pb-1 rounded-xl">
    <section>
      <h1 className="text-lg font-bold opacity-90">Posts</h1>
    </section>
  </div>
  <div className="absolute  w-fit bottom-16 right-5 z-50 text-[#0ca916]  cursor-pointer" onClick={handleOpen}>
    
    <Hidden lgUp>

      <AddCircleSharpIcon sx={{  fontSize: '5rem' }} />
    </Hidden>
  </div>
  <div className="hideScrollBar overflow-y-scroll px-3 space-y-5" style={{ height: "86vh" }}>
    {post.postSearchResult ? (
      post.postSearchResult.map((item) => (<Postcontainer item={item} />))
    ) : (
      post.posts?.map((item) => (<Postcontainer item={item} />))
    )}
  </div>



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

    
  );
};

export default Homesection;
