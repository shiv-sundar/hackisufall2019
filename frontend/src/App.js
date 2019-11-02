import React from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './components/map';
import InfoSheet from './components/infosheet';

function App() {
  return (
    <div className="App" style={styles.container}>
      <div style={styles.map}>
        <Map/>
      </div>
      <div style={styles.info}>
        <InfoSheet/>
      </div>
    </div>
  );
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
