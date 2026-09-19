import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-md overflow-hidden card-hover ${className}`}>
      {children}
    </div>
  );
};

export default Card;