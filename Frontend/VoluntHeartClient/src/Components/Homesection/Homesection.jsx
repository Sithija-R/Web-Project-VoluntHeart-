import React from "react";
import Postform from "./Postform";
import Postcontainer from "./Postcontainer";

const Homesection = () => {
  return (
    <>
    <div className="p-1">


   <div className=" py-5 px-3 pb-2 bg-lime-100 rounded-xl mb-2">
      <section className="">
        <h1 className=" text-lg font-bold opacity-90">Home</h1>
      </section>

   

    </div>
    <div className="hideScrollBar overflow-y-scroll px-3 space-y-2 " style={{height:'86vh'}}>
      
      {[1,2,3,4,].map((item)=><Postcontainer/>)}
      
    </div>
    </div>
    </>
  );
};

export default Homesection;
