import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SuggestionCard from "./SuggestionCard";
import ProfileCards from "./ProfileCards";
import { useDispatch, useSelector } from "react-redux";
import { findUserByName } from "../../Storage/Auth/Action";
import { findPostByContent, getSuggestions } from "../../Storage/Posts/Action";

const Rightsection = () => {
  const dispatch = useDispatch();
  const { auth, post } = useSelector((store) => store);

  const [searchTerm, setSearchTerm] = useState("");
  const [hasDispatchedSuggestions, setHasDispatchedSuggestions] = useState(false);




  const handleKeyword = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

useEffect(()=>{
  if(searchTerm==""){
    dispatch(getSuggestions("Senior"));
    setHasDispatchedSuggestions(true);
  }
},[searchTerm, dispatch, hasDispatchedSuggestions])

  useEffect(() => {
    
      dispatch(findUserByName(searchTerm));
      dispatch(getSuggestions(searchTerm));

   
  }, [searchTerm]);

  useEffect(() => {
    dispatch(findPostByContent(searchTerm));
  }, [searchTerm, post.like, post.delete]);

  return (
    <div className="">
      <div className="py-5  sticky mt-2 top-4 h-20 rounded-lg ">
        <div className=" flex justify-around items-center px-3 h-">
          <input
            type="text"
            value={searchTerm}
            placeholder="Search"
            onChange={handleKeyword}
            className="py-3 rounded-full text-gray-600 w-9/12 px-3 text-md border-2"
          />
          <SearchIcon fontSize="large" sx={{ color: "#2b2b2b" }} />
        </div>

        <div className="mt-5 min-h-16  rounded-xl">
          {(auth.findUser?.length > 0)?(
          <div>

          <h2 className="px-2 text-[#0cac74] mb-3 font-semibold">Users</h2>
          <div className="hideScrollBar max-h-[30vh] overflow-y-scroll px-3 space-y-2  py-2 ">
          {auth.findUser?.map((item) =>
                  item.userSecret == auth.user.userSecret ? (
                    ""
                  ) : (
                    <ProfileCards item={item} />
                  )
                )}
                </div>
          </div>

          ):("")

          }
         <div>

          
         </div>

              <h2 className="px-2 text-[#0cac74] mb-3 font-semibold ">Suggestions</h2>
            <div className="hideScrollBar max-h-[40vh] overflow-y-scroll px-3 space-y-2 py-2 ">
              {post.suggestion?.map((item) => (
                <SuggestionCard item={item} />
              ))}
            </div>
       
        </div>
      </div>
    </div>
  );
};

export default Rightsection;
