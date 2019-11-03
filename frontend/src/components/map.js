import React, { Component } from 'react';
import GoogleMapReact from "google-map-react";
import MarkerClusterer from "@google/markerclustererplus"
import InfoSheet from './infosheet'; 

var mockData =[
  {
    name: "chaz c",
    phone: "609-867-5309",
    needs: ["help with 311", "toilet paper", "floss", "heartburn medicine"],
    lat: 37.782, 
    lng: -122.447
  },
  {
    name: "chaz q",
    phone: "609-867-5308",
    needs: ["help with 311", "toilet paper", "floss"],
    lat: 37.782, lng: -122.443
  },
  {
    name: "chaz p",
    phone: "609-867-5307",
    needs: ["help with 311", "toilet paper", "floss"],
    lat: 37.782, lng: -122.439
  },

  {
    name: "helen d",
    phone: "609-867-5307",
    needs: ["cheez its", "toilet paper", "floss"],
    lat: 41.619549, lng: -93.598
  },
  {
    name: "helen p",
    phone: "609-867-5307",
    needs: ["towels", "toilet paper", "floss"],
    lat: 41.619549, lng: -93.594
  },
  {
    name: "helen g",
    phone: "609-867-5307",
    needs: ["food", "toilet paper", "floss"],
    lat: 41.619549, lng: -93.590
  },

]

class Map extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            data: [],
            maps: null
        }
    }
    componentWillMount(){
      
    }
    static defaultProps = {
        center: {
          lat: 37.0902,
          lng: -95.712
        },
        zoom: 5
      };

      
      handleMarkers(map,maps){
        
        this.setState({map: map});
        let latlngarr = [];
        mockData.forEach((d)=>{
          let o = new maps.LatLng(d.lat, d.lng);
          latlngarr.push(o);
        });
        const heatmap = new maps.visualization.HeatmapLayer({
            data: latlngarr,
            options: {
              radius: 20
            }
          });
        var markers = [];
        mockData.forEach((d) => {
            let o = new maps.Marker({
              position: new maps.LatLng(d.lat, d.lng),
              info: d
            });
            o.setOpacity(0.9);
            markers.push(o);
        });
        heatmap.setMap(map);
        var markerCluster = new MarkerClusterer(map, markers,
        {
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
        });

        this.setState({data: this.parseDataDefault(mockData)});

        maps.event.addListener(markerCluster, 'click', function(cluster) {
            let clusterMarkers = cluster.getMarkers();
            let dataToDisplay = [];
            clusterMarkers.forEach((a)=>{
              dataToDisplay.push(a);
            });
            this.setState({data: this.parseData(dataToDisplay)});
        }.bind(this))
      }
      
      handleApiLoaded = (map, maps) => {
        this.handleMarkers(map,maps);
      };
      parseDataDefault(data){
        let objs = [];
        data.forEach((d)=>{
          let obj = {
            lat: d.lat,
            lng: d.lng,
            name: d.name,
            phone: d.phone,
            needs: d.needs
          }
          objs.push(obj);
        });
        return objs;
      }
      parseData(data){
        let objs = [];
        data.forEach((d)=>{
          let obj = {
            lat: d.info.lat,
            lng: d.info.lng,
            name: d.info.name,
            phone: d.info.phone,
            needs: d.info.needs
          }
          objs.push(obj);
        });
        return objs;
      }
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
                    options={
                      {styles: styles.mapOverlay}
                    }
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
      background: '#181727',
      overflowY: 'scroll',
      color: 'white',
      fontFamily: 'monospace'
    },
    mapOverlay: [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#212121"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#212121"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "administrative.country",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "administrative.neighborhood",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.business",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#181818"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1b1b1b"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#2c2c2c"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8a8a8a"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#373737"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#3c3c3c"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#4e4e4e"
          }
        ]
      },
      {
        "featureType": "road.local",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "transit",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#000000"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#3d3d3d"
          }
        ]
      }
    ]
  }
  export default Map;