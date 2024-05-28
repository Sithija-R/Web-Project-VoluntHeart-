import React from "react";
import { Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch } from "react-redux";
import { likePost } from "../../Storage/Posts/Action";

const Postcontainer = ({item}) => {
  const navigate = useNavigate();
  const dispatch=useDispatch();

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
    console.log("deleted (only for publisher)");
    handleClose();
  };

  const handleChatReply = () => {
    console.log("open chat");
  };

  const handleLike = () => {
    dispatch(likePost(item.uniqueKey))
  };
  
  const handleShare = () => {
    console.log("handle share");
  };



  return (
    <div className=" bg-slate-200 w-full px-3 py-3 min-h-40 rounded-3xl">
      <div className="flex items-center justify-between font-semibold text-gray-500 px-2">
        <div className="flex items-center space-x-3">
          <Avatar >
            <img
              src={item.createdBy.profilePic}
              alt="profile pic"
            />
          </Avatar>
          <p>{item.createdBy.fullName}</p>
         
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
      <div className="mt-2 p-1 space-y-2 mx-2 px-3 bg-lime-300 rounded-lg">
        <p className="py-1 px-5">
          {item.content}
        </p>
        <img
          className="w-10/12 border border-gray-600 p-1 rounded-md m-auto"
          src={item.image}
          alt="uploded image"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
       <video
        className="w-10/12 border border-gray-600 p-1 rounded-md m-auto"
        controls
        onError={(e) => { e.target.style.display = 'none'; }}
        src={item.video}
      />
    
      </div>
      <div className=" py-4 px-14 flex flex-wrap justify-between items-center text-gray-500">
        <div
          className={`${
            item.liked? "text-pink-500" : "text-gray-600"
          } space-x-3 flex cursor-pointer`}
        >
          <FavoriteIcon onClick={handleLike} />
          <p className="font-medium"> {item.totalLikes}</p>
        </div>
        <ChatBubbleIcon className="cursor-pointer" onClick={handleChatReply} />
        <ShareIcon className="cursor-pointer" onClick={handleShare} />
      </div>
    </div>
  );
};

export default Postcontainer;
