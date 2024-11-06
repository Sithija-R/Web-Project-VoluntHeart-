import React from "react";

const SuggestionCard = ({ item }) => {
  const handleSuggestions = () => {
    console.log("handle sugge");
  };

  return (
    <div
      className=" p-3 rounded-lg shadow-md border-[px] "
      onClick={handleSuggestions}
    >
      <p className="mb-1">{item.title}</p>
    </div>
  );
};

export default SuggestionCard;
