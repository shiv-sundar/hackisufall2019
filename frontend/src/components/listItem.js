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
                <h5 style={styles.needsTitle}>Needs: </h5>
                <ul style={styles.needs}>
                    {this.props.needs.map(item => (
                        <li style={styles.needItem}> {item}</li>
                    ))}
                </ul>
                <button style={styles.helpButton} onClick={()=>this.getDirections(this.props.lat,this.props.lng)}>Get Directions</button>
            </div>
        )
    }
}
var styles = {
    ListItem: {
        borderBottom: '2px solid rgb(33, 33, 33)',
        paddingBottom: '15px',
        paddingLeft: '12px',
        paddingTop: '5px',
        textAlign: 'left',
        
    },
    name: {
        padding: 5,
        margin: 5,
        paddingTop: 0,
        fontSize: '20px'
    },
    phone: {
        padding: 5,
        margin: 5,
        paddingTop: 0,
        fontSize: '20px'
    },
    needsTitle: {
        fontSize: '20px',
        padding: 5,
        margin: 5,
        paddingTop: 0
    },
    needs: {
        padding: 5,
        margin: 5,
        paddingTop: 0
    },
    needItem: {
        paddingLeft: 5,
        marginLeft: 5,
        listStyleType: 'none'
    },
    helpButton: {
        marginLeft: ,
        background: 'transparent',
        border: 'none',
        color: 'rgb(75, 160, 232)',
        textDecoration: 'underline',
        cursor: 'pointer'
        
    }
}
export default ListItem;