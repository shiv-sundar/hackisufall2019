import React, { Component } from 'react';
import List from "./list";



class InfoSheet extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items: []
        }
    }
    componentDidMount(){
        this.setState({items: this.props.data});
    }
    render() {
        console.log("look for rev!");
        console.log(this.props.data);
        return (
          <div>
              <h1 style={styles.title}>Disaster Dash</h1>
              <List data={this.props.data} maps={this.props.maps}/>
         </div>
        )}
}

var styles = {
    title: {
        fontSize: '40px',
    }
}
export default InfoSheet;