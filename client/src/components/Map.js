import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker, Popup, GeolocateControl, Source, Layer } from "react-map-gl";

import WcIcon from '@material-ui/icons/Wc';
import CommentIcon from '@material-ui/icons/Comment';
import axios from 'axios';

import ReviewList from './ReviewList';
import Window from './Window';
import Review from './Review';
import AddNew from './AddNew';

import '../styles/map.css';

export default function Map() {

  let layer = {
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
  const [showAddNewLocation, setShowAddNewLocation] = useState(false);
  const [showPopup, togglePopup] = useState(false);
  const [showAddReview, setShowAddReview] = useState(false);
  const [instructions, setInstructions] = useState([]);
  const [geojson, setGeojson] = useState({});
  const [currentUserPos, setCurrentUserPos] = useState({});
  const [currentReview, setCurrentReview] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [currentWashroomId, setCurrentWashroomId] = useState(null);
  const [washrooms, setWashrooms] = useState([]);
  const [showReview, setShowReview] = useState(false);
  const [viewport, setViewport] = useState({
    width: 1800,
    height: 800,
    latitude: 49.229575,
    longitude: -122.974397,
    zoom: 11,
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
  }
  
   const reviewList = currentReview.length > 0 ? currentReview.map((review) => {
      return <ReviewList 
      date={review.date}
      rating={review.rating}
      comment={review.comment}
    />
    }) : <>
          <h3><CommentIcon />&ensp;No reviews yet!</h3>
          <p>Add your first review now</p>
        </>;


    const handleGetRouteClick = (lat, lng) => {
      getDirections(lat, lng);
    }

    const handleShowReview = () => {
      setShowReview(true);
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
      document.getElementById("instructions").style.display = "none";
      handleCloseToggle();
      setCurrentReview(prev => ([ ...prev, newReview]));
    }

    const addNewLocation = (newLocation) => {
      handleCloseAddNew();
      setWashrooms(prev => ([ ...prev, newLocation]));
    }

    const handleCloseToggle = () => {
      setShowAddReview(!showAddReview);
    }

    const handleCloseAddNew = () => {
      setShowAddNewLocation(!showAddNewLocation);
    }

    return(
      <>
      <div className="Map">
        <ReactMapGL 
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
          onViewportChange={(viewport) => setViewport(viewport)}
          mapStyle= "mapbox://styles/jo123123/cksuq5h5r9t6817rwj9zoqsrw"
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
                  style={{fontSize: viewport.zoom * 2, color:"#0585f5"}}
                  onClick={() => {
                    handleWashroomClick(washroom.id); getFilterReviews(washroom.id);
                    handleShowReview();
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
          <div className="addnew">
              {showAddNewLocation && <Window 
                content={
                  <>
                  <h2>Add New Location</h2>
                  <AddNew position={[currentUserPos.latitude, currentUserPos.longitude]} addNewLocation={addNewLocation} />
                  </>
                }
                  handleClose={handleCloseAddNew}
              />}
              <button 
                id="addNewLocation-button"
                onClick={() => {
                  setShowAddReview(false);
                  setShowAddNewLocation(!showAddNewLocation);
                }}
              >
                Add New Location
              </button>
            </div>
        </ReactMapGL>
        
           <div id="review">
           <div class="review-header">
           <h1>Reviews</h1>
           <button 
               id="addReview-button" 
               onClick={() => { 
                 setShowAddReview(!showAddReview);
                 togglePopup(false);
                 }}
             >
              +
             </button>
             </div>
           {showReview && (
             <div id="review-part">
           <div id="reviewList">
             {reviewList}
           </div>
           <div>
             {showAddReview && <Window 
               content={
                 <>
                 <h2>Review</h2>
                 <Review washroom_id={currentWashroomId} addReview={addReview}/>
                 </>
               }
                 handleClose={handleCloseToggle}
             />}
             
           </div>
           </div>
          )}
           
         </div>
      </div>
      
      </>
    );
}
