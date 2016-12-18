import React, {Component} from 'react';
import NavLink from './NavLink';
import firebase from 'firebase';

// Example to import element from React-Bootstrap
import { Grid, Row, Col } from 'react-bootstrap';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {}
        };

        // this.user = {};
        this.auth = firebase.auth();
        this.db = firebase.database();
    }

    componentDidMount() {
        this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));

        let register_li = document.getElementById('register-li').parentElement;
        let logout_li = document.getElementById('logout-li').parentElement;
        let profile_li = document.getElementById('profile-li').parentElement;

        if(firebase.auth().currentUser){
            register_li.style.display = 'none';
            logout_li.style.display = 'inline';
        } else {
            profile_li.style.display = 'none';
            register_li.style.display = 'inline';
            logout_li.style.display = 'none';
        }
    }

    onAuthStateChanged(user) {
        let register_li = document.getElementById('register-li').parentElement;
        let logout_li = document.getElementById('logout-li').parentElement;
        let profile_li = document.getElementById('profile-li').parentElement;


        if (user) {
            // Change main menu
            register_li.style.display = 'none';
            logout_li.style.display = 'inline';
            profile_li.style.display = 'inline';

            // this.saveUserData(user);
            this.setState({
                user: { user }
            });
            this.setState({user: {id: user.uid}});
        }
    }

    userLogout(){
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            console.log('Signout successfull');

        }, function(error) {
            // An error happened.
        });
    }


    render() {

        return(
            <Grid className="contenitore" fluid={true}>
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
                                    <li><NavLink id="profile-li" to={`/profile/${this.state.user.id}`}>Profile</NavLink></li>
                                    <li><a href="/" id="logout-li" onClick={this.userLogout}>Logout</a></li>
                                    <li><NavLink to="/register" id="register-li">Sign in</NavLink></li>
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
