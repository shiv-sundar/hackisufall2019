import React, { Component } from 'react';
import GoogleMapReact from "google-map-react";
import InfoSheet from "./infosheet";

var points = [
    {lat: 37.782, lng: -122.447},
    {lat: 37.782, lng: -122.443},
    {lat: 37.782, lng: -122.441},
    {lat: 37.782, lng: -122.439},
]

const handleApiLoaded = (map, maps) => {
    const heatmap = new maps.visualization.HeatmapLayer({
        data: points.map(point => (
          {location: new maps.LatLng(point["lat"], point["lng"], 10)}))
      });
      heatmap.setMap(map);
    
  };


class Map extends React.Component {
    static defaultProps = {
        center: {
          lat: 37.0902,
          lng: -95.712
        },
        zoom: 5
      };
    
      
      render() {
        return (
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyC8UnL3b9xpThNLJoaO4F7TeTRhFFhIlsI', libraries: 'visualization', }}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => {handleApiLoaded(map,maps)}}
            >
            </GoogleMapReact>
            
        );
      }
    
  }
  
  export default Map;