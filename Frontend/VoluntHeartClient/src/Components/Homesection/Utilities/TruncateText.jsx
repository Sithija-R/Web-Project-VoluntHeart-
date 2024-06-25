import React, { useState } from 'react';

const TruncateText = ({ text, maxLength }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  const truncatedText = text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  return (
    <div>
      <p className="py-1 px-5">
        {isTruncated ? truncatedText : text}
        {text.length > maxLength && (
          <span onClick={toggleTruncate} className='text-cyan-600 cursor-pointer'>
            {isTruncated ? ' See More' : ' See Less'}
          </span>
        )}
      </p>
    </div>
  );
};

export default TruncateText;
