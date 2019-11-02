import React, { Component } from 'react';




class InfoSheet extends React.Component {
    constructor(props){
        super(props);

    }
    render() {
        return (
          <div>
              {this.props.data.toString()}
         </div>
        )}
}

export default InfoSheet;