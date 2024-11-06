import React from "react";
import "./Landing.css";
import darkArrow from "../Resources/assets/dark-arrow.png";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="hero " id="heroId">
      <header className="w-full min-h-16 bg-[#302c34] absolute top-0 flex justify-end">
      <div className=" flex items-center justify-between text-white text-xl space-x-14 px-10">

          <p className="cursor-pointer hover:text-green-500" onClick={()=>navigate("welcome/help")}>Help</p>
          <p className="cursor-pointer hover:text-green-500" onClick={()=>navigate("authentication/login")}>SignIn</p>
          <p className="cursor-pointer hover:text-green-500" onClick={()=>navigate("authentication/signup")}>Sign-Up</p>
      </div>
       
      </header>
      <div className="heroText">
        <h1>
          Embark On A Journey <br />
          Spread Joy, Ignite Dreams
        </h1>
        <p>
          Our volunteer platform invites you on a transformative journey, where
          every act of kindness sparks ripples of joy and possibility.
          Volunteers offer support to those in need, creating smiles and
          fostering hope. Whether lending a hand or seeking assistance, our
          community is here to uplift and empower, igniting dreams and changing
          lives.
        </p>
        <button
          className="btn"
          onClick={() => navigate("/authentication/login")}
        >
          Explore More <img src={darkArrow} alt="" />
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
