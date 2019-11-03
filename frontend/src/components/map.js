import React, { Component } from 'react';
import GoogleMapReact from "google-map-react";
import MarkerClusterer from "@google/markerclustererplus"
import InfoSheet from './infosheet'; 
import Store from './../Store';
import ReactDOMServer from 'react-dom/server';

class Map extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            data: [],
            maps: null
        }
        this.store = new Store();
    }
    static defaultProps = {
        center: {
          lat: 37.0902,
          lng: -95.712
        },
        zoom: 5
      };

      handleHeatMap(requestData,map,maps){
        let latlngarr = [];
        requestData.forEach((d)=>{
          let o = new maps.LatLng(d.lat, d.lng);
          latlngarr.push(o);
        });
        const heatmap = new maps.visualization.HeatmapLayer({
            data: latlngarr,
            options: {
              radius: 20
            }
        });
        heatmap.setMap(map);
      }
      getInfoWindowContent(name){
        const content = (<p>{name}</p>);
        return content;
      }
      handleMarkerClusters(requestData,map,maps){
        var that = this;
        var markers = [];
        requestData.forEach((d) => {
            let m = new maps.Marker({
              position: new maps.LatLng(d.lat, d.lng),
              info: d
            });
            var infowindow = new maps.InfoWindow({content: ""});

            m.addListener('click', function() {
              const windowContent = (
                <div>
                  <h3>{d.name}</h3>
                  <h3>{d.phone}</h3>
                </div>
              );
              map.setZoom(10);
              map.panTo(m.position);
              const content = ReactDOMServer.renderToString(windowContent);
              infowindow.setContent(content);
              infowindow.open(map, m);
              let single = [];
              single.push(m);
              that.setState({data: that.parseData(single)});
            });
            m.setOpacity(0.9);
            markers.push(m);

        });

        
        var markerCluster = new MarkerClusterer(map, markers,
        {
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
        });

        this.setState({data: this.parseDataDefault(requestData)});

        maps.event.addListener(markerCluster, 'click', function(cluster) {
            let clusterMarkers = cluster.getMarkers();
            let dataToDisplay = [];
            clusterMarkers.forEach((a)=>{
              dataToDisplay.push(a);
            });
            this.setState({data: this.parseData(dataToDisplay)});
        }.bind(this))
      }

      async handleMap(map,maps){
        this.setState({map: map});
        let requestData = await this.store.getAllRequests();
        this.handleHeatMap(requestData,map,maps);
        this.handleMarkerClusters(requestData,map,maps);
      }
      
      handleApiLoaded = (map, maps) => {
        this.handleMap(map,maps);
      };

      /* All data */
      parseDataDefault(data){
        let objs = [];
        data.forEach((d)=>{
          let obj = {
            id: d.id,
            rev: d.rev,
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

      /* Clustered data */
      parseData(data){
        let objs = [];
        data.forEach((d)=>{
          let obj = {
            marker: d,
            id: d.info.id,
            rev: d.info.rev,
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
        "featureType": "administrative.land_parcel",
        "elementType": "labels",
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
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8a8a8a"
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
        "elementType": "labels",
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