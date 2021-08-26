import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

import '../styles/review.css';

const axios = require('axios');

export default function Review ({ addReview, washroom_id}) {

  const [comment, setComment] = useState(null);
  const [rating, setRating] = useState('');

  const submitReview = () => {
    axios.post("/reviews", {
      date: new Date().toDateString(),
      rating: rating,
      comment: comment,
      user_id: null,
      washroom_id: washroom_id
    }).then(res => {
      addReview(res.data);
    });
  }

  const handleOptionChange = (value) => {
    setRating(value);
  }


  return (
    <div className="review-container">
      <Form 
        className="review-form" onSubmit={(e) => {e.preventDefault();}}>
          <div class="radios">
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio"
                name="inlineRadioOptions" id="inlineRadio1"
                value="Good" 
                onChange={(e) => handleOptionChange(e.target.value)}  
              />
              <label class="form-check-label">
                Good
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio"
                name="inlineRadioOptions" id="inlineRadio2"  
                value="Not Bad" 
                onChange={(e) => handleOptionChange(e.target.value)}
              />
              <label class="form-check-label">
                Not Bad
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio"
                name="inlineRadioOptions" id="inlineRadio3" 
                value="Bad" 
                onChange={(e) => handleOptionChange(e.target.value)}
              />
              <label class="form-check-label">
                Bad
              </label>
            </div>
          </div>
          <label className="comment">Comment (Optional)</label>
          <textarea placeholder="Share your experience with us" onChange={(e) => setComment(e.target.value)}></textarea>
          <div className="footer">
            <button className="submitreview" type="submit" onClick={submitReview} variant="primary"><b>Submit Review</b></button>
          </div>
      </Form>
    </div>
  );

}