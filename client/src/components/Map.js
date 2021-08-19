import React, { useState } from 'react';
import ReactMapGL, { Marker } from "react-map-gl";

export default function Map() {
  const [viewport, setViewport] = useState({
    width:400,
    height:400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });
    return(
      <div className="Map">
        <ReactMapGL 
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
          onViewportChange={(viewport) => setViewport(viewport)}
          mapStyle= "mapbox://styles/jo123123/cksjio8yr846a17pdl08fxf6y"
        >
          
        </ReactMapGL>
      </div>
    );
}