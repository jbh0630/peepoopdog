import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker, Popup, GeolocateControl } from "react-map-gl";
import WcIcon from '@material-ui/icons/Wc';
import axios from 'axios';

import ReviewList from './ReviewList';
import '../styles/map.css';

export default function Map() {

  const [currentReview, setCurrentReview] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [currentWashroomId, setCurrentWashroomId] = useState(null);
  const [washrooms, setWashrooms] = useState([]);
  const [viewport, setViewport] = useState({
    width: 600,
    height: 600,
    latitude: 49.288635,
    longitude: -123.111119,
    zoom: 12
  });
  const geolocateControlStyle = {
    right: 10,
    top: 10
  };

  useEffect(() => {
    const getWashrooms = async () => {
      try {
        const res = await axios.get("/washrooms");
        setWashrooms(res.data.rows);
      } catch (err) {
        console.log(err);
      }
    };
    getWashrooms();
  }, []);


  useEffect(() => {
    const getReviews = async () => {
      try {
        const res = await axios.get("/reviews");
        setReviews(res.data.rows);
      } catch (err) {
        console.log(err);
      }
    };
    getReviews();
  }, []);

  const handleWashroomClick = (id) => {
    setCurrentWashroomId(id);
  }

  const getFilterReviews = (id) => {
    let result = [];
    for (let review of reviews) {
      if (review.washroom_id === id) {
        result.push(review);
      }
    }
    setCurrentReview(result);
  }
  
   const reviewList = currentReview.length > 0 ? currentReview.map((review) => {
      return <ReviewList 
      date={review.date}
      rating={review.rating}
      comment={review.comment}
    />
    }) : null;

    

    return(
      <div className="Map">
        <ReactMapGL 
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
          onViewportChange={(viewport) => setViewport(viewport)}
          mapStyle= "mapbox://styles/jo123123/cksjio8yr846a17pdl08fxf6y"
          
        >
          <GeolocateControl
            onViewportChange={(viewport) => {
              viewport.zoom = 12.5;
              setViewport(viewport);
            }}
            style={geolocateControlStyle}
            positionOptions={{enableHighAccuracy: true}}
            trackUserLocation={true}
            auto={false}
          />
          {washrooms.map(washroom => (
            <>
              <Marker 
                latitude={Number(washroom.latitude)} 
                longitude={Number(washroom.longitude)}
                offsetLeft={-20} 
                offsetTop={-10}
              >
                <WcIcon 
                  style={{fontSize: viewport.zoom * 2, color:"blue"}}
                  onClick={() => {
                    handleWashroomClick(washroom.id); getFilterReviews(washroom.id);
                  }}
                />
              </Marker>
              {washroom.id === currentWashroomId && (
              <Popup
                className="popup"
                latitude={Number(washroom.latitude)} 
                longitude={Number(washroom.longitude)}
                closeButton={true}
                closeOnClick={false}
                anchor="top"
              >
                <div className="card">
                  <label>Location</label>
                  <h4 className="location">{washroom.name}</h4>
                </div>
              </Popup>
              )}
            </>
          ))}
        </ReactMapGL>
        <div>{reviewList}</div>
      </div>
    );
}
