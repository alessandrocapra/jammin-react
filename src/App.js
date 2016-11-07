import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// Example to import element from React-Bootstrap
import { Grid, Row, Col, Button } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <Grid fluid="true" className="main-container">
        <header>
          <Row>
            <Col xs={5}>
              <h1>Jammin</h1>
              <div className="subtitle">
                <h2>Where musicians meet</h2>
              </div>
            </Col>
            <Col xs={7}>
              <nav className="main-menu">
                <ul>
                  <li>Venues</li>
                  <li>Profile</li>
                  <li>FAQ</li>
                </ul>
              </nav>
            </Col>
          </Row>
        </header>
      </Grid>
      // <div className="App">
      //   <div className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h2>Welcome to React</h2>
      //   </div>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      //   <Button bsStyle="primary">NOOO</Button>
      //   <Grid fluid="true">
      //      <Row>
      //          <Col xs={4}><p>Nessun rimorso</p></Col>
      //          <Col xs={4}><div>LOL</div></Col>
      //          <Col xs={4}><p>PRRRRRRRRRRRRRRRR</p></Col>
      //      </Row>
      //       <Row>
      //           <Col xs={4}><p>Nessun rimorso</p></Col>
      //           <Col xs={4}><div>LOL</div></Col>
      //           <Col xs={4}><div>PRRRRRRRRRRRRRRRR</div></Col>
      //       </Row>
      //   </Grid>
      // </div>
    );
  }
}

export default App;
