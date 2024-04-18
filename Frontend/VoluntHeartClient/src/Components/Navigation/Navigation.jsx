import React from "react";
import { navigation } from "./Navigationbar";
import { useNavigate } from "react-router-dom";
import { Avatar, Button } from "@mui/material";

const Navigation = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("logout");
  };
  return (
    <div className="">
      <div className="px-5 py-5 ">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Avatar>
              <img
                src="https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg"
                alt="profile pic"
              />
            </Avatar>
            <div>
              <p>Full Name</p>
              <p className="opacity-70">@username</p>
            </div>
          </div>
          <div>
            <Button
              sx={{
                width: "65%",
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
          {navigation.map((item) => (
            <div
              className="cursor-pointer flex  space-x-3  max-w-10  "
              onClick={() => item.title === "Profile"? navigate("/profile/${}"): navigate(item.path) }>
              {item.icon}
              <p className="text-xl " style={{ color: "black" }}>
                {item.title}
              </p>
            </div> 
          ))}
        </div>
        <div className="py-6">
          <Button
            sx={{
              width: "75%",
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
        </div>
      </div>
    </div>
  );
};

export default Navigation;
