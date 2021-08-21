import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import WcIcon from '@material-ui/icons/Wc';
import axios from 'axios';

import '../styles/map.css';

export default function Map() {

  const [currentWashroomId, setCurrentWashroomId] = useState(null);
  const [washrooms, setWashrooms] = useState([]);
  const [viewport, setViewport] = useState({
    width: 600,
    height: 600,
    latitude: 49.288635,
    longitude: -123.111119,
    zoom: 8
  });

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


  

  const handleWashroomClick = (id) => {
    setCurrentWashroomId(id);
  }

    return(
      <div className="Map">
        <ReactMapGL 
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
          onViewportChange={(viewport) => setViewport(viewport)}
          mapStyle= "mapbox://styles/jo123123/cksjio8yr846a17pdl08fxf6y"
        >
          {washrooms.map(washroom => (
                 
          
          <Marker 
            latitude={Number(washroom.latitude)} 
            longitude={Number(washroom.longitude)}
            offsetLeft={-20} 
            offsetTop={-10}
          >
            <WcIcon 
              style={{fontSize: viewport.zoom * 2, color:"blue"}}
              onClick={() => handleWashroomClick(washroom.id)}
            />
          </Marker>
           ))}
           {/* <Popup
            latitude={49.288635} 
            longitude={-123.111119}
            closeButton={true}
            closeOnClick={false}
            anchor="top"
          >
            <div className="card">
              <label>Location</label>
              <h4 className="location">Canada Place</h4>
              <label className="rating">Rating</label>
              <p>Good</p>
              <label className="comments">Comments</label>
              <p>sss</p>
            </div>
          </Popup>
            ))} */}
        </ReactMapGL>
      </div>
    );
}