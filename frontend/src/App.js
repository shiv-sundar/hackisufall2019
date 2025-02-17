import React from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './components/map';
import InfoSheet from './components/infosheet';

class App extends React.Component {
  
  componentDidMount(){

  }
  getData = (data) => {
    this.setState({supplies: data});
  }
  render(){
    return (
      <div className="App" style={styles.container}>
        <Map/>
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
export default App;
