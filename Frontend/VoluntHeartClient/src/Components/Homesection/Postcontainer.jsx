import React, { useEffect, useState } from "react";
import { Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { addComment, deletePost, getAllPosts, getUsersLikedPosts, getUsersPosts, likePost } from "../../Storage/Posts/Action";
import TruncateText from "./Utilities/TruncateText";
import MediaCarousel from "./Utilities/MediaCarousel";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import CommentCard from "./Utilities/CommentCard";
import { useFormik } from "formik";

const Postcontainer = ({item}) => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const {auth}= useSelector(store=>store);

  const [openComment , setOpenComment]= useState(false);
  const [comment,setComment] = useState("");

  const handleAddComment=(values)=>{
    console.log("comm ",values)
    dispatch(addComment(values))
  }


  const commentformik = useFormik({
    initialValues: {
      comment: "",
      postKey: item.uniqueKey
    },
    onSubmit: handleAddComment,
    
  });

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
  const [modalopen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
    
  };

  //menu handling
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    dispatch(deletePost(item.uniqueKey))

    handleClose();
  };

  const togggleComment = () => {
   setOpenComment(!openComment);
  };

 
  const handleLike = () => {
    dispatch(likePost(item.uniqueKey))
  };
  
  const handleShare = () => {
    console.log("handle share");
  };

  const handleCommentChange=(e)=>{
   
    setComment(e.target.value);
  }

  const handleProfileNavigate=()=>{
    
    (item.createdBy.userId==auth.user.userId)?(navigate(`/profile`)):(navigate(`/profile/${item.createdBy?.userSecret}`))

  }

const locationurl = `https://maps.google.com/maps?q=${item.location?.lat},${item.location?.lng}&hl=es;&output=embed`



  return (
    <div className="  w-full px-3 py-3 min-h-40 rounded-3xl shadow-lg border-t-[1px] bg-white">
      <div className="flex items-center justify-between font-semibold text-gray-500 px-2">
        <div className="flex items-center space-x-3"  onClick={handleProfileNavigate}>
          <Avatar >
            <img
              src={item.createdBy.profilePic}
              alt="profile pic"
            />
          </Avatar>
          <div>

          <p>{item.createdBy.fullName}</p>
          <p className="text-xs text-green-500 ">{item.createdBy.donor?"donor":"fundraiser"}</p>
          </div>
          
         
        </div>
        <div className="">
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreHorizIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {item.creator?(
              <MenuItem onClick={() => { handleDelete(); handleClose(); }}>delete</MenuItem>
            ):(
              <MenuItem onClick={() => { handleShare(); handleClose(); }}>Share</MenuItem>
            )

            }

           
          </Menu>
        </div>
      </div>
      <div className="px-14 pt-2 text-sm text-blue-500 cursor-pointer">  {item.location?(
      
        <div className="flex w-fit" onClick={handleModalOpen}>
          <LocationOnIcon fontSize="small"/>
          <p>See Location</p>
        </div>):""}

      
      </div>

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

      <div className="mt-3 p-1 pt-2 space-y-2 mx-2 px-3  border-t-2">
         <TruncateText  text={item.content} maxLength={100} />
         <MediaCarousel mediaItems={item.mediaList}  />
    
      </div>
      
   
      <div className="mt-4 py-4 px-14 flex flex-wrap justify-between items-center text-gray-500 ">
        <div
          className={`${
            item.liked? "text-pink-500" : "text-gray-600"
          } space-x-3 flex cursor-pointer`}
        >
          <FavoriteIcon onClick={handleLike} />
          <p className="font-medium"> {item.totalLikes}</p>
        </div>
        <ChatBubbleIcon className="cursor-pointer" onClick={togggleComment} />
        {/* <ShareIcon className="cursor-pointer" onClick={handleShare} /> */}

       
      
      </div>
      <div className={`px-10 ${openComment?"block":"hidden"}`}>
        <div className={`flex justify-end  py-2 border-t-[1px] `}>

      
      <CloseFullscreenIcon onClick={togggleComment} className="cursor-pointer "/>

      
        </div>
        <div>
          <p>add comment</p>
            <form onSubmit={commentformik.handleSubmit}>
              
          <div className="mt-1 flex justify-between">
          <input type="text" className="border-2 w-9/12 h-10 rounded-md" id="comment"
          name="comment"
          
          value={commentformik.values.comment}
          onChange={commentformik.handleChange}/>  
          <Button
            type="submit"
            sx={{
              width: "15%",
              borderRadius: "20px",
              py: "8px",
              backgroundColor: "#0ca916",
              "&:hover": { bgcolor: "darkgreen" },
              lg: "2",
              xs: "0",
            }}
            variant="contained"
          >
            Comment
          </Button>

          </div>
            </form>
        </div>
        <p className="mt-2">Comments</p>
        <div className="mt-3 border-t-2 space-y-2 h-[50vh] overflow-y-scroll hideScrollBar">
        {item.comments.slice().sort((a, b) => new Date(b.commentAt) - new Date(a.commentAt)).map((comment) => (<CommentCard  comment={comment} />))}

       

        </div>


      </div>
    </div>
  );
};

export default Postcontainer;
