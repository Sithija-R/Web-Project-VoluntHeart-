import React, { useEffect, useState } from "react";

import Postcontainer from "./Postcontainer";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../Storage/Posts/Action";

const Homesection = () => {
  const distpatch = useDispatch();
  const {post} = useSelector(store=>store)
  
  

  useEffect(() => {
    distpatch(getAllPosts());
  }, [post.like]);
  

  return (
    <>
      <div className="p-1">
        <div className=" py-5 px-3 pb-2 bg-lime-100 rounded-xl mb-2">
          <section className="">
            <h1 className=" text-lg font-bold opacity-90">Home</h1>
          </section>
        </div>
        <div
          className="hideScrollBar overflow-y-scroll px-3 space-y-2 "
          style={{ height: "86vh" }}
        >
          {post.posts?.map((item) => (<Postcontainer item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Homesection;
