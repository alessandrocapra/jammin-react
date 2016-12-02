import React, {Component} from 'react';
import NavLink from './NavLink';
import firebase from 'firebase';

// Example to import element from React-Bootstrap
import { Grid, Row, Col } from 'react-bootstrap';

class App extends Component {
    userLogout(){
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            console.log('Signout successfull');
            let logout = document.getElementById('logout-li').parentNode;
            logout.style.display = 'none';

        }, function(error) {
            // An error happened.
        });
    }

    checkUser(){

    }

    render() {

        if(user){
            console.log('user: ' + user.displayName);
        }

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
                                    <li><NavLink to="/profile/">Profile</NavLink></li>
                                    <li><NavLink to="/register" id="register-li">Register</NavLink></li>
                                    <li><a href="#0" id="logout-li" onClick={this.userLogout}>Logout</a></li>
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
