import React from 'react';

import '../styles/reviewWindow.css';

const Window = props => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        <div className="review-content">
          {props.content}
        </div>
      </div>
    </div>
  );
};
 
export default Window;