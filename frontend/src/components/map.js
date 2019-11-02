import React, { Component } from 'react';
import GoogleMapReact from "google-map-react";
import MarkerClusterer from "@google/markerclustererplus"
import InfoSheet from './infosheet'; 

var points = [
    {lat: 37.782, lng: -122.447},
    {lat: 37.782, lng: -122.443},
    {lat: 37.782, lng: -122.441},
    {lat: 37.782, lng: -122.439},
]


class Map extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            data: []
          }
        //   this.handleApiLoaded.bind(this);
    }
    static defaultProps = {
        center: {
          lat: 37.0902,
          lng: -95.712
        },
        zoom: 5
      };

      handleApiLoaded = (map, maps) => {
        const heatmap = new maps.visualization.HeatmapLayer({
            data: points.map(point => (
              {location: new maps.LatLng(point["lat"], point["lng"], 10)}))
          });
          const markers = points.map(point => (
              new maps.Marker({position: point})
          ));
          heatmap.setMap(map);
          var markerCluster = new MarkerClusterer(map, markers,
            {
                imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
            });
           
          maps.event.addListener(markerCluster, 'click', function(cluster) {
            let arr = cluster.getMarkers();
            console.log(arr);
            this.setState({data: arr});
          }.bind(this))
          
      };

      render() {
          
        return (
            <div>
            <div style={styles.map}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyC8UnL3b9xpThNLJoaO4F7TeTRhFFhIlsI', libraries: 'visualization', }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => {this.handleApiLoaded(map,maps)}}
                    
                    >
                </GoogleMapReact>
                </div>

                <div style={styles.info}>
                    <InfoSheet data={this.state.data}/>
                </div>
            </div>
            
        );
      }
    
  }
  
  var styles = {
    container: {
      display: 'inline'
    },
    map: { height: '100vh', width: '75%' },
    info: {
      width: '25%',
      position: 'fixed',
      top: 0,
      right: 0,
      height: '100vh',
      zindex: '999',
      background: 'whitesmoke',
    }
  }
  export default Map;