import React from "react";
import { Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Postcontainer = () => {
  const navigate = useNavigate();

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
    console.log("implement liked");
  };
  const handleShare = () => {
    console.log("handle share");
  };
  return (
    <div className=" bg-slate-200 w-full px-3 py-3 min-h-40 rounded-3xl">
      <div className="flex items-center justify-between font-semibold text-gray-500 px-2">
        <div className="flex items-center space-x-3">
          <Avatar onClick={() => navigate(`/profile/{6}`)}>
            <img
              src="https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg"
              alt="profile pic"
            />
          </Avatar>
          <p>Full Name</p>
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
            
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {true?(
              <MenuItem onClick={() => { handleDelete(); handleClose(); }}>delete</MenuItem>
            ):(
              <MenuItem onClick={() => { handleShare(); handleClose(); }}>Share</MenuItem>
            )

            }

            {/* implement only for publisher, use username */}
          </Menu>
        </div>
      </div>
      <div className="mt-2 p-1 space-y-2 mx-2 px-3 bg-lime-300 rounded-lg">
        <p className="py-1 px-5">
          If you need a custom SVG icon (not available in the Material Icons)
          you can use the SvgIcon wrapper. This component extends the native
          element: It comes with built-in accessibility.
        </p>
        <img
          className="w-10/12 border border-gray-600 p-1 rounded-md m-auto"
          src="data:image/png;base64,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"
          alt="uploded image"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
       <video
        className="w-10/12 border border-gray-600 p-1 rounded-md m-auto"
        controls
        onError={(e) => { e.target.style.display = 'none'; }}
        src="https://cdn.pixabay.com/video/2021/01/11/61695-499594106_tiny.mp4"
      />
    
      </div>
      <div className=" py-4 px-14 flex flex-wrap justify-between items-center text-gray-500">
        <div
          className={`${
            true ? "text-pink-500" : "text-gray-600"
          } space-x-3 flex cursor-pointer`}
        >
          <FavoriteIcon onClick={handleLike} />
          <p className="font-medium">54</p>
        </div>
        <ChatBubbleIcon className="cursor-pointer" onClick={handleChatReply} />
        <ShareIcon className="cursor-pointer" onClick={handleShare} />
      </div>
    </div>
  );
};

export default Postcontainer;
