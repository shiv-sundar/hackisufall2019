import React, { Component } from 'react';
import GoogleMapReact from "google-map-react";


class Map extends React.Component {
    static defaultProps = {
        center: {
          lat: 37.7749,
          lng: -122.4194
        },
        zoom: 11
      };
    
      render() {
        return (
          // Important! Always set the container height explicitly
          <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyC8UnL3b9xpThNLJoaO4F7TeTRhFFhIlsI' }}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
            >
             
            </GoogleMapReact>
          </div>
        );
      }
    
  }
  
  export default Map;