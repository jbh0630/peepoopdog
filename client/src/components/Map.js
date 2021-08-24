import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker, Popup, GeolocateControl, Source, Layer } from "react-map-gl";
import WcIcon from '@material-ui/icons/Wc';
import axios from 'axios';

import ReviewList from './ReviewList';
import ReviewWindow from './ReviewWindow';
import Review from '../pages/Review';

import '../styles/map.css';

export default function Map() {

  const layer = {
    'id': 'route',
            'type': 'line',
            'source': 'route',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
              'line-color': '#3887be',
              'line-width': 5,
              'line-opacity': 0.75
            }
  };
  const [showPopup, togglePopup] = useState(false);
  const [showAddReview, setShowAddReview] = useState(false);
  const [instructions, setInstructions] = useState([]);
  const [geojson, setGeojson] = useState({});
  const [currentUserPos, setCurrentUserPos] = useState({});
  const [currentReview, setCurrentReview] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [currentWashroomId, setCurrentWashroomId] = useState(null);
  const [washrooms, setWashrooms] = useState([]);
  const [viewport, setViewport] = useState({
    width: 600,
    height: 600,
    latitude: 49.229575,
    longitude: -122.974397,
    zoom: 9.5
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
    togglePopup(true);
  }

  const getFilterReviews = (id) => {
    let result = [];
    for (let review of reviews) {
      if (review.washroom_id === id) {
        result.push(review);
      }
    }
    setCurrentReview(result);
    document.getElementById('addReview-button').style.display = "block";
  }
  
   const reviewList = currentReview.length > 0 ? currentReview.map((review) => {
      return <ReviewList 
      date={review.date}
      rating={review.rating}
      comment={review.comment}
    />
    }) : null;


    const handleGetRouteClick = (lat, lng) => {
      getDirections(lat, lng);
    }
   
    const getDirections = (lat, lng) => {
      
      const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${currentUserPos.longitude},${currentUserPos.latitude};${lng},${lat}?geometries=geojson&steps=true&access_token=pk.eyJ1Ijoiam8xMjMxMjMiLCJhIjoiY2tzNTB6d2Z4MTJzdjJ2bXQxMzh3MWk5MyJ9.tWNPHTDSuM0tYWtUabUm9A`;

      const req = new XMLHttpRequest();
      req.open('GET', url, true);
      req.onload = () => {
        const json = JSON.parse(req.response);
        const data = json.routes[0];
        const route = data.geometry.coordinates;
        setGeojson({
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: route
          }
        });

        setInstructions(instructionsList(data.legs[0].steps, data));

      }
      req.send();

      document.getElementById("instructions").style.display = "block";
    };

    const instructionsList = (steps, data) => {
      let ins = [];

      for (let i = 0; i < steps.length; i++) {
        ins.push(<li>{steps[i].maneuver.instruction}</li>);
      }

      return (
        <>
        <br></br><span class="duration">Trip duration:  {Math.floor(data.duration / 60)} min </span> {ins}
        </>
      );
    }

    const addReview = (newReview) => {
      handleCloseToggle();
      setCurrentReview(prev => ([ ...prev, newReview]));
    }

    const handleCloseToggle = () => {
      setShowAddReview(!showAddReview);
    }
      
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
              setCurrentUserPos(viewport);
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
                showPopup && <Popup
                  className="popup"
                  latitude={Number(washroom.latitude)} 
                  longitude={Number(washroom.longitude)}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() =>togglePopup(false)}
                  anchor="left"
                >
                  <div className="card">
                    <label>Location</label>
                    <h4 className="location">{washroom.name}</h4>
                  </div>
                  <div className="getRoute">
                    <button onClick={() => 
                      handleGetRouteClick(Number(washroom.latitude), Number(washroom.longitude))}>Directions</button>
                  </div>
                </Popup>
              )}
            </>
          ))}
          <Source id="my-data" type="geojson" data={geojson}>
            <Layer {...layer} />
          </Source>
          <div id="instructions">
            {instructions}
          </div>
        </ReactMapGL>
        <div id="reviewList">
          {reviewList}
          <div>
            {showAddReview && <ReviewWindow 
              content={
                <Review washroom_id={currentWashroomId} addReview={addReview}/>
              }
                handleClose={handleCloseToggle}
            />}
            <button 
              id="addReview-button" 
              onClick={() => { 
                setShowAddReview(!showAddReview);
                togglePopup(false);
                }}
            >
              Add Review
            </button>
          </div>
        </div>
      </div>
    );
}
