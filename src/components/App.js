import React, {Component} from 'react';
import NavLink from './NavLink';

// Example to import element from React-Bootstrap
import { Grid, Row, Col } from 'react-bootstrap';

class App extends Component {

    render() {
        return(
            <Grid fluid={true} className="container">
                <header>
                    <Row>
                        <Col xs={5}>
                            <NavLink to="/"><h1>Jammin</h1></NavLink>
                            <div className="subtitle">
                                <h2>Where musicians meet</h2>
                            </div>
                        </Col>
                        <Col xs={7}>
                            <nav className="main-menu">
                                <ul>
                                    <li><NavLink to="/venues">Venues</NavLink></li>
                                    <li><NavLink to="/profile">Profile</NavLink></li>
                                    <li><NavLink to="/faq">FAQ</NavLink></li>
                                </ul>
                            </nav>
                        </Col>
                    </Row>
                </header>
                <main>
                    { this.props.children }
                </main>
            </Grid>
        );
    }
}

export default App;
