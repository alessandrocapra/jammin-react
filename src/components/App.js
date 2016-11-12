import React, {Component} from 'react';
import NavLink from './NavLink';

// Example to import element from React-Bootstrap
import { Grid, Row, Col } from 'react-bootstrap';

class App extends Component {

    render() {
        return(
            <Grid className="contenitore" fluid={true}>
                <header>
                    <Row>
                        <Col xs={5}>
                            <div className="title">
                                <NavLink to="/"><h1>Jammin</h1></NavLink>
                            </div>
                            <div className="subtitle">
                                <h2>Where musicians meet!</h2>
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
                <footer>
                    <Row>
                        <Col xs={6}>
                            <h2>Some content here?</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis deserunt dignissimos distinctio, dolor ea exercitationem inventore ipsa perferendis ullam. Debitis dignissimos dolorum eum laudantium nisi omnis, perferendis quis recusandae sit.</p>
                        </Col>
                        <Col xs={6}>
                            <h2>Somethin also here?</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus dolorum ipsa laborum nam? Accusantium adipisci explicabo facilis fuga labore, laudantium nemo odit possimus quae recusandae, repellat similique velit vero voluptates?</p>
                        </Col>
                    </Row>
                </footer>
            </Grid>
        );
    }
}

export default App;
