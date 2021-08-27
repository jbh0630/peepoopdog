import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

import axios from 'axios';
import '../styles/addnew.css';

export default function AddNew({ position, addNewLocation}) {

  const [location, setLocation] = useState('');
  const storage = window.sessionStorage;
  let points = storage.getItem('points');

  const submitNewLocation = () => {
    axios.post("/washrooms", {
      name: location,
      lat: position[0],
      lng: position[1]
    }).then(res => {
      addNewLocation(res.data);
    });

    points = Number(points) + 3;
    storage.setItem('points', points);
  }

  return (
    <>
      <div className="new-washroom">
        <h4>Share the location that you discovered!</h4>
        <Form 
        className="new-washroom-form" onSubmit={(e) => {e.preventDefault();}}>
            <div className="location">
              <label class="location-label">Location</label>
              <div className="location-text">
                <input type="text" className="location-input" id="colFormLabel" placeholder="Location Name"  onChange={(e) => setLocation(e.target.value)}/>
              </div>
            </div>
            <div className="footer">
              <button className="submit" type="submit" onClick={submitNewLocation} variant="primary">Submit</button>
              <span>To get 3 points!</span>
            </div>
        </Form>
      </div>
    </>
  );
}