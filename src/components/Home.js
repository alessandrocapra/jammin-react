import React, { Component } from 'react';
import firebase from 'firebase';

// Example to import element from React-Bootstrap
import { Row, Col } from 'react-bootstrap';

// Components
import SearchForm from './SearchForm';

class Home extends Component {

    render() {
        let homeContent = null;

        if(!firebase.auth().currentUser){
            // user not logged in
            homeContent =
                <div>
                    <Row>
                        <Col xs={12} className="h3homepageclass">
                            <h2 className="text-center"> How Jammin works </h2>
                        </Col>
                    </Row>
                    <Row className="facts">
                        <Row>
                            <Col xs={12} className="imageclass">
                                <div className="module">
                                    <h3>About Jammin</h3>
                                    <p>Jammin is a community of musicians and musical artists.</p> <p> Joining Jammin is free and always will be.</p>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} className="imageclass">
                                <div className="module two">
                                    <h3>Find musicians</h3>
                                    <p>Create a free profile, find musicians, contact them, form or join jammer groups to play music together.</p>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} className="imageclass">
                                <div className="module three">
                                    <h3>Meet and Play</h3>
                                    <p>Find a venue suggestion on our website, contact them, meet up, play and enjoy!</p>
                                </div>
                            </Col>
                        </Row>
                    </Row>;
                </div>
        } else {
            homeContent =
                <div>
                    <Row>
                        <Col xs={12} className="h3homepageclass">
                            <h2 className="text-center"> Groups of Jammers you could join </h2>
                        </Col>
                    </Row>
                    <Row className="groups">
                        <Col xs={12} sm={3}>
                            <div className="profile-pic">
                                <div className="image" style={{'background' : 'url(img/bonham.jpg)', 'backgroundSize' : 'cover', 'backgroundRepeat' : 'no-repeat'}}/>
                            </div>
                            <h3>John Bonham</h3>
                            <div className="container-elements">
                                <img src="img/instruments/drum-set.svg" alt="Drums"/>
                                <div style={{"display" : "inline-block"}}>
                                    <h4>Drums</h4>
                                    <p>9 years of experience</p>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} sm={3}>
                            <div className="profile-pic">
                                <div className="image" style={{'background' : 'url(img/hendrix.jpeg)', 'backgroundSize' : 'cover', 'backgroundRepeat' : 'no-repeat'}}/>
                            </div>
                            <h3>Jimi Hendrix</h3>
                            <div className="container-elements">
                                <img src="img/instruments/electric-guitar-1.svg" alt="Electric guitar"/>
                                <div style={{"display" : "inline-block"}}>
                                    <h4>Electric guitar</h4>
                                    <p>11 years of experience</p>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} sm={3}>
                            <div className="profile-pic">
                                <div className="image" style={{'background' : 'url(img/entwistle.jpg)', 'backgroundSize' : 'cover', 'backgroundRepeat' : 'no-repeat'}}/>
                            </div>
                            <h3>John Entwistle</h3>
                            <div className="container-elements">
                                <img src="img/instruments/electric-guitar.svg" alt="Bass guitar"/>
                                <div style={{"display" : "inline-block"}}>
                                    <h4>Bass guitar</h4>
                                    <p>5 years of experience</p>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} sm={3}>
                            <div className="profile-pic">
                                <div className="image" style={{'background' : 'url(img/avatar.png)', 'backgroundSize' : 'cover', 'backgroundRepeat' : 'no-repeat'}}/>
                            </div>
                            <h3>This could be you!</h3>
                            <button>Join this group</button>
                        </Col>
                        <Col xs={12}>
                            <h4>Genres they want to play</h4>
                            <a href="#0" className="tag">Hard Rock</a>
                            <a href="#0" className="tag">Classic Rock</a>
                            <a href="#0" className="tag">Metal</a>
                        </Col>
                    </Row>
                    <Row className="groups">
                        <Col xs={12} sm={3}>
                            <div className="profile-pic">
                                <div className="image" style={{'background' : 'url(https://firebasestorage.googleapis.com/v0/b/jammin-e10be.appspot.com/o/profile-pictures%2Fixk00r6dcYYh3e9Lua5PYZuJlnj1?alt=media&token=8f5598d0-92b9-4c9d-b153-9edc20d5d919)', 'backgroundSize' : 'cover', 'backgroundRepeat' : 'no-repeat'}}/>
                            </div>
                            <h3>Jesse Rauhama</h3>
                            <div className="container-elements">
                                <img src="img/instruments/piano.svg" alt="Piano"/>
                                <div style={{"display" : "inline-block"}}>
                                    <h4>Piano</h4>
                                    <p>3 years of experience</p>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} sm={3}>
                            <div className="profile-pic">
                                <div className="image" style={{'background' : 'url(https://firebasestorage.googleapis.com/v0/b/jammin-e10be.appspot.com/o/profile-pictures%2FJqESd5auZhZNoK5XinYhcWnpLC53?alt=media&token=6b815464-0e8c-4ef8-810d-45d9d57a5115)', 'backgroundSize' : 'cover', 'backgroundRepeat' : 'no-repeat'}}/>
                            </div>
                            <h3>Tatiana Karpenko</h3>
                            <div className="container-elements">
                                <img src="img/instruments/harmonica.svg" alt="Harmonica"/>
                                <div style={{"display" : "inline-block"}}>
                                    <h4>Harmonica</h4>
                                    <p>3 years of experience</p>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} sm={3}>
                            <div className="profile-pic">
                                <div className="image" style={{'background' : 'url(https://firebasestorage.googleapis.com/v0/b/jammin-e10be.appspot.com/o/profile-pictures%2FfpgDZoGro4gz9XzAP5qzD0vR9mA2?alt=media&token=63660295-af7f-425a-a2d1-3a8f95b691fc)', 'backgroundSize' : 'cover', 'backgroundRepeat' : 'no-repeat'}}/>
                            </div>
                            <h3>Stefan Krawblowski</h3>
                            <div className="container-elements">
                                <img src="img/instruments/electric-guitar-1.svg" alt="Electric guitar"/>
                                <div style={{"display" : "inline-block"}}>
                                    <h4>Electric guitar</h4>
                                    <p>2 years of experience</p>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} sm={3}>
                            <div className="profile-pic">
                                <div className="image" style={{'background' : 'url(img/avatar.png)', 'backgroundSize' : 'cover', 'backgroundRepeat' : 'no-repeat'}}/>
                            </div>
                            <h3>This could be you!</h3>
                            <button>Join this group</button>
                        </Col>
                        <Col xs={12}>
                            <h4>Genres they want to play</h4>
                            <a href="#0" className="tag">Jazz</a>
                            <a href="#0" className="tag">Blues</a>
                            <a href="#0" className="tag">Rockabilly</a>
                        </Col>
                    </Row>
                </div>
        }

        return (
            <div>
                <Row>
                    <Col xs={12} className="headline">
                        <h2>Find some talents to jam with in your area!</h2>
                        <SearchForm instruments={this.props.route.instruments} />
                    </Col>
                </Row>
                {homeContent}
            </div>
        );
    }
}

export default Home;
