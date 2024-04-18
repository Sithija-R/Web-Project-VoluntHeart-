import React from "react";
import Postform from "./Postform";
import Postcontainer from "./Postcontainer";

const Homesection = () => {
  return (
    <>
    <div className="p-1">


   <div className=" py-5 px-3 pb-2 bg-lime-100 rounded-xl mb-2">
      <section className="">
        <h1 className="pb-2 text-lg font-bold opacity-90">Home</h1>
      </section>

      <section className=" top-8 w-full pb-1 pt-1">
       
          <Postform />
      
      </section>

    </div>
    <div className=" overflow-y-scroll px-3 space-y-2 " style={{height:'75vh'}}>
      
      {[1,2,3,4,].map((item)=><Postcontainer/>)}
      
    </div>
    </div>
    </>
  );
};

export default Homesection;
