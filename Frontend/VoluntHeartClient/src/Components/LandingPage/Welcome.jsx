import React from "react";
import "./Welcome.css";
import darkArrow from "../../Resources/assets/dark-arrow.png";
import LandingNavbar from "./LandingNavBar";
const Hero = () => {
  return (
    <div className="hero " id="heroId">
      <LandingNavbar />
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
        <button className="btn">
          Explore More <img src={darkArrow} alt="" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
