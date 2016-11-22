import React, {Component} from 'react';
import NavLink from './NavLink';

// Example to import element from React-Bootstrap
import { Grid, Row, Col } from 'react-bootstrap';

class App extends Component {
    render() {
        return(
            <Grid className="contenitore">
                <header>
                    <Row>
                        <Col xs={12} sm={5}>
                            <div className="title">
                                <NavLink to="/"><h1>Jammin</h1></NavLink>
                            </div>
                            <div className="subtitle">
                                <h2>Where musicians meet!</h2>
                            </div>
                        </Col>
                        <Col xs={12} sm={7}>
                            <nav className="main-menu">
                                <ul>
                                    <li><NavLink to="/venues">Venues</NavLink></li>
                                    <li><NavLink to="/profile/aleborgo">Profile</NavLink></li>
                                    <li><NavLink to="/faq">FAQ</NavLink></li>
                                </ul>
                            </nav>
                        </Col>
                    </Row>
                </header>
                <main>
                    { this.props.children }
                </main>
                <footer>
                    <Row>
                        <Col xs={12}>
                            <h4>Jammin</h4>
                            <p>All rights reserved.</p>
                        </Col>
                    </Row>
                </footer>
            </Grid>
        );
    }
}

export default App;
