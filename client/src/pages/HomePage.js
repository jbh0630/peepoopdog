import React, { useState } from 'react';

import Map from '../components/Map';

export default function HomePage() {
 
    return(
      <div>
        <div className="initMap">
          <Map />
        </div>
      </div>
    );
}