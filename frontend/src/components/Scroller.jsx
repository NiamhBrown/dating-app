import React from 'react';
import './Scroller.css';

const Scroller = ({ children }) => {
  return (
    <div className="scroller">
      {children}
    </div>
  );
};

export default Scroller;