import React from 'react';

import '../styles/reviewWindow.css';

const ReviewWindow = props => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        <h2 style={{color: 'tomato'}}>Review</h2>
        <div className="review-content">
          {props.content}
        </div>
      </div>
    </div>
  );
};
 
export default ReviewWindow;