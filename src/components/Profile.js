import React, {Component} from 'react';
import { Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import firebase from 'firebase';
import {browserHistory} from 'react-router';
import InstrumentList from '../data/instruments';

// import components
import Review from './Review';
import Instrument from './Instrument';
import Video from './Video';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {}
        };

        this.checkUser = this.checkUser.bind(this);
        this.handleEditButton = this.handleEditButton.bind(this);
    }

    componentWillMount() {
        // Load user data
        let profileId = this.props.params.userId;
        let USER_DB = firebase.database().ref('users/' + profileId);

        return USER_DB.once('value').then(function (snapshot) {
            let user = snapshot.val();
            console.log(user);
            this.setState({user: user});
        }.bind(this));
    }

    checkUser(){
        let user = firebase.auth().currentUser;

        if(user){
            return user.uid;
        }
    }

    handleEditButton(){
        browserHistory.push('/profile/edit/' + firebase.auth().currentUser.uid);
    }

    render(){

        let instruments = InstrumentList.map((instrument) => {
            return <Instrument name={instrument.label}
                               image={instrument.image}
                               key={instrument.value} />
        });

        return(
            <Row>
                <Col xs={12} sm={4}>
                    <Row>
                        <Col xs={12} className="left-sidebar">
                            <img src={this.state.user.image} alt={this.state.user.name + this.state.user.surname}/>
                            <h2 className="name">{this.state.user.name} {this.state.user.surname}</h2>
                            <h4>{this.state.user.gender}, {this.state.user.age} years old</h4>
                            <h4> <FontAwesome name='globe' /> {this.state.user.location} </h4>
                            <section>
                                <h3>Availability</h3>
                                <p>{this.state.user.availability} times per week</p>
                            </section>
                            <section className="reviews">
                                <h3>Reviews</h3>
                                <Review name="Eric Cartman" title="Amazing performance!" rating="rocket" instrument="Electric guitar" />
                                <Review name="Stan Marsh" title="Ok-ish" rating="thumbs-up" instrument="Drums" />
                                <Review name="Kyle Broflovski" title="WOW, just wow!" rating="rocket" instrument="Electric guitar" />
                            </section>
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} sm={8} className="profile_content">
                    <section>
                        <div>
                            <h3>About me</h3>
                            { this.checkUser ? (<button className="btn btn-default" onClick={this.handleEditButton}>Edit profile</button>) : (<div></div>) }
                        </div>
                        <p>{this.state.user.about}</p>
                    </section>
                    <section className="instruments">
                        <h3>My instruments</h3>
                        {instruments}
                    </section>
                    <Row>
                        <Col xs={12} sm={6}>
                            <section className="influences">
                                <h3>Influences</h3>
                                <a className="tag" href="#"><span>{this.state.user.music_listen}</span></a>
                            </section>
                        </Col>
                        <Col xs={12} sm={6}>
                            <section className="genres">
                                <h3>Genres I like to play</h3>
                                {this.state.user.music_play ? this.state.user.music_play.map(function (artist, index) {
                                    return <a className="tag" href="#"><span>{artist}</span></a>;
                                }) : <div></div>}
                            </section>
                        </Col>
                    </Row>
                    <section className="videos">
                        <h3>Videos</h3>
                        <Row>
                            <Col xs={12} sm={9} className="main_video">
                                <Video source="https://www.youtube.com/embed/auLBLk4ibAk" />
                            </Col>
                            <Col xs={12} sm={3}>
                                <Video source="https://www.youtube.com/embed/rVDVWFQ2IO8" />
                                <Video source="https://www.youtube.com/embed/TgntkGc5iBo" />
                                <Video source="https://www.youtube.com/embed/D2yymMhjRu8" />
                            </Col>
                        </Row>
                    </section>
                </Col>
            </Row>
        );
    }
}

export default Profile;
