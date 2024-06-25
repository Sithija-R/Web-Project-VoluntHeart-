import React from 'react';

const CustomArrow = ({ className, style, onClick, type }) => {
  return (
    <div
      className={`absolute top-[40%] text-2xl font-bold  text-white ${type === 'prev' ? 'left-2' : 'right-2'}`}
      style={{ ...style,background: 'rgba(0, 0, 0, 0.5)', borderRadius: '20%', padding: '5px', zIndex: 1 }}
      onClick={onClick}
    >
      {type === 'prev' ? '<' : '>'}
    </div>
  );
};

export const PrevArrow = (props) => <CustomArrow {...props} type="prev" />;
export const NextArrow = (props) => <CustomArrow {...props} type="next" />;

