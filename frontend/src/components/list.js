import React, { Component } from 'react';
import ListItem from "./listItem";

class List extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        let data = this.props.data;
        return (
            <ul style={styles.list}>
                {data.map((item, index) => (
                    <ListItem key={index} 
                        id={item.id}
                        rev={item.rev}
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
        background: '#33353e'
    }
}
export default List;