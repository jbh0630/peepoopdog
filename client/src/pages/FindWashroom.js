import React from 'react';

import Map from '../components/Map';
import Header from '../components/partials/Header';

export default function FindWashroom() {
 
    return(
      <div>
        <Header />
        <div className="initMap">
          <Map />
        </div>
      </div>
    );
}