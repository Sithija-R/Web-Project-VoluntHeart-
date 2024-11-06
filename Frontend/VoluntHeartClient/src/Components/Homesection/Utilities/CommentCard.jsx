import React from "react";

const CommentCard = ({ comment }) => {
  return (
    <div className="border-b-[1px] ">
      <p className="text-blue-600 ">{comment.userName}</p>
      <p className="px-5 "> {comment.comment}</p>
    </div>
  );
};

export default CommentCard;
