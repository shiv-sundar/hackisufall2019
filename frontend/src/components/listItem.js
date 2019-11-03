import React, { Component } from 'react';


class ListItem extends React.Component {
    constructor(props){
        super(props);
    }
    getDirections(lat,lng) {
        if ("geolocation" in navigator){
            navigator.geolocation.getCurrentPosition(function(position){ 
                var currentLatitude = position.coords.latitude;
                var currentLongitude = position.coords.longitude;
                let url = 'https://www.google.com/maps/dir/?api=1&origin='+currentLatitude+','+currentLongitude+'&destination='+lat+','+lng+'&travelmode=driving';
                window.open(url);
            });
        }        
    }
    render() {
        return (
            <div style={styles.ListItem}>
                <h5 style={styles.name}>Name: {this.props.name}</h5>
                <h5 style={styles.phone}>Contact: {this.props.phone}</h5>
                <h5 style={styles.needs}>Needs: </h5>
                <ul style={styles.needs}>
                    {this.props.needs.map(item => (
                        <li style={styles.needItem}>{item}</li>
                    ))}
                </ul>
                <button style={styles.helpButton} onClick={()=>this.getDirections(this.props.lat,this.props.lng)}>Get Directions</button>
            </div>
        )
    }
}
var styles = {
    ListItem: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.16)',
        paddingBottom: '15px',
        textAlign: 'left'
    },
    name: {
        padding: 5,
        margin: 5 
    },
    phone: {
        padding: 5,
        margin: 5 
    },
    needs: {
        padding: 5,
        margin: 5 
    },
    needItem: {
        paddingLeft: 5,
        marginLeft: 5,
        listStyleType: 'none'
    },
    helpButton: {
        paddingLeft: 5,
        marginLeft: 15,
        background: 'transparent',
        border: 'none',
        color: '#069',
        textDecoration: 'underline',
        cursor: 'pointer'
        
    }
}
export default ListItem;