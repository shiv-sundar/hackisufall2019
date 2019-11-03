import React, { Component } from 'react';
import Modal from 'react-modal';
import Store from '../Store';

class ListItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            cardStyle: {borderBottom: '2px solid rgb(33, 33, 33)',
                paddingBottom: '15px',
                paddingLeft: '12px',
                paddingTop: '5px',
                textAlign: 'left',
            }
        }

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.store = new Store();
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
    handleHover(marker,maps){
        if(marker!=undefined){
            // new maps.event.trigger( marker, 'click' );
        }
        
        let cstyle = {
            borderBottom: '2px solid rgb(33, 33, 33)',
            paddingBottom: '15px',
            paddingLeft: '12px',
            paddingTop: '5px',
            textAlign: 'left',
            background: 'rgb(33, 33, 33)'
        };
        this.setState({cardStyle: cstyle});
    }
    toggleHover(){
        let cstyle = {
            borderBottom: '2px solid rgb(33, 33, 33)',
            paddingBottom: '15px',
            paddingLeft: '12px',
            paddingTop: '5px',
            textAlign: 'left',
        };
        this.setState({cardStyle: cstyle});
    }
    openModal() {
        this.setState({modalIsOpen: true});
    }
    
    afterOpenModal() {
    }
    
    closeModal() {
        this.setState({modalIsOpen: false});
    }
    
    async handleSubmit(id,rev,data){
        await this.store.deleteRequest(id,rev);
    }
    render() {
        return (
            <div style={this.state.cardStyle} onMouseLeave={()=>this.toggleHover()} onMouseOver={()=>this.handleHover(this.props.marker,this.props.maps)}>
                <h5 style={styles.name}>Name: {this.props.name}</h5>
                <h5 style={styles.phone}>Contact: {this.props.phone}</h5>
                <h5 style={styles.needsTitle}>Needs: </h5>
                <ul style={styles.needs}>
                    {this.props.needs.map(item => (
                        <li style={styles.needItem}> {item}</li>
                    ))}
                </ul>
                <button style={styles.helpButton} onClick={()=>this.getDirections(this.props.lat,this.props.lng)}>Get Directions</button>
                <button style={styles.helpButton} onClick={()=>this.openModal()}>Assist</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={styles.modal}
                    contentLabel="Example Modal"
                    >

                    <h3 style={styles.name}>Connect with {this.props.name}</h3>
                    <h3 style={styles.phone}>Contact: {this.props.phone}</h3>
                    <h3 style={styles.needsTitle}>Needs: </h3>
                    <ul style={styles.needs}>
                        {this.props.needs.map(item => (
                            <li style={styles.needItem}> {item}</li>
                        ))}
                    </ul>
                    <button style={styles.helpButton} onClick={()=>this.getDirections(this.props.lat,this.props.lng)}>Get Directions</button>
                    <h3>Please enter</h3>
                    <form onSubmit={(data)=>this.handleSubmit(this.props.id,this.props.rev,data)}>
                        <div>
                            <p>Name:</p>
                            <input style={styles.inputBox} type="text" name="name" />
                        </div>
                        <div>
                            <p>Phone:</p>                       
                            <input style={styles.inputBox} type="text" name="phone" />
                        </div>
                        
                        <input style={styles.submit} type="submit" value="Submit" />
                    </form>
                    <button onClick={this.closeModal} style={styles.closeBtn}>close</button>
                    </Modal>
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
        marginLeft: 5,
        background: 'transparent',
        border: 'none',
        color: 'rgb(75, 160, 232)',
        textDecoration: 'underline',
        cursor: 'pointer'
        
    },
    modal: {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgb(33, 33, 33)',
            color: 'white',
            fontSize: '15px',
            fontFamily: 'monospace'
        }  
    },
    closeBtn:{
        border: 0,
        marginTop: 10,
        boxShadow: 'none',
        borderRadius: '0px',
    },
    inputBox:{
        borderRadius: '5px',
        border: 0,
        width: '100%',
        height: '25px',
        paddingLeft: '5px'
    },
    submit: {
        marginTop: '10px'
    }
}
export default ListItem;