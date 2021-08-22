import React from 'react';
import '../styles/reviewList.css';

export default function ReviewList(props) {
  console.log('propssssss:::  ', props);
  return(
    <>
    <div className="review-box">
      <div className="review-date">
        <strong>Date:</strong> {new Date(props.date).toDateString()}
      </div>
      <div className="review-rating">
      <strong>Rating:</strong> {props.rating}
      </div>
      {props.comment && (<div className="review-comment">
      <strong>Comment:</strong> {props.comment}
      </div>)}
    </div>
    </>
  );
}