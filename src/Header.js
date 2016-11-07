import React, {Component} from 'react';
import './Header.css';

// Example to import element from React-Bootstrap
import { Row, Col } from 'react-bootstrap';

class Header extends Component {
  render() {
    return(
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
    );
  }
}

export default Header;
