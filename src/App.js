import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// Example to import element from React-Bootstrap
import { Grid, Row, Col, Button } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Button bsStyle="primary">NOOO</Button>
        <Grid fluid="true">
           <Row>
               <Col xs={6}><p>Nessun rimorso</p></Col>
               <Col xs={6}><div>LOL</div></Col>
           </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
