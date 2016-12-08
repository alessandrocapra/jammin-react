import React, {Component} from 'react';
import NavLink from './NavLink';
import firebase from 'firebase';

// Example to import element from React-Bootstrap
import { Grid, Row, Col } from 'react-bootstrap';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentUser: {}
        };

        this.user = {};
        this.auth = firebase.auth();
        this.db = firebase.database();
    }

    componentDidMount() {
        this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));

        /* hide logout menu */
        let logout = document.getElementById('logout-li').parentNode;
        logout.style.display = 'none';
    }

    onAuthStateChanged(user) {
        if (user) {
            this.saveUserData(user);
            this.setState({
                currentUser: {
                    id: user.uid
                }
            });
        }
    }

    saveUserData(user) {
        let username = 'No.Name.Set';
        let name = "";
        let surname = "";

        if (user.displayName && user.displayName.length) {
            name = user.displayName.split(" ")[0];
            surname = user.displayName.split(" ")[1];
            username = user.displayName.replace(/\s+/g, '').toLowerCase();
        } else {
            username = user.email.split('@')[0];
        }
        this.user = {
            name: name,
            surname: surname,
            username: username,
            image: user.photoURL
        };
        this.db.ref(`users/${user.uid}`).update(this.user);

        // Store a local copy of the full user object
        this.user.id = user.uid;
    }

    userLogout(){
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            console.log('Signout successfull');
            let logout = document.getElementById('logout-li').parentNode;
            logout.style.display = 'none';

            let register = document.getElementById('register-li').parentNode;
            logout.style.display = 'inline';

        }, function(error) {
            // An error happened.
        });
    }

    checkUser(){
        let user = firebase.auth().currentUser;

        if(user){
            return true;
        } else {
            return false;
        }
    }

    render() {

        this.checkUser ? console.log("Logged in") : console.log("Not logged");

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
                                    <li><NavLink to={`/profile/${this.state.currentUser.id}`}>Profile</NavLink></li>
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
