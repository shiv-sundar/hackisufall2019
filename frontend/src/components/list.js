import React, { Component } from 'react';
import ListItem from "./listItem";

class List extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        console.log(this.props.data);
        console.log("info");
        let data = this.props.data;
        console.log(data);
        return (
            <ul style={styles.list}>
                {data.map((item, index) => (
                    <ListItem key={index} 
                        name={item.name} 
                        phone={item.phone}
                        needs={item.needs} 
                        lat={item.lat}
                        lng={item.lng}
                        map={this.props.map}/>
                ))}
            </ul>
        )
    }
}
var styles = {
    list: {
        paddingLeft: 0,
    }
}
export default List;