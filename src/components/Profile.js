import React, {Component} from 'react';
import { Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import firebase from 'firebase';
import {browserHistory} from 'react-router';

// import components
import Review from './Review';
import Instrument from './Instrument';
import Video from './Video';
import Soundcloud from './Soundcloud';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {
            }
        };

        this.checkUser = this.checkUser.bind(this);
        this.handleEditButton = this.handleEditButton.bind(this);
    }

    componentWillMount() {
        // Load user data
        let profileId = this.props.params.userId;
        let USER_DB = firebase.database().ref('users/' + profileId);
        let self = this;

        USER_DB.once('value').then(function (snapshot) {
            let user = snapshot.val();
            console.log('user from db: ', user);
            self.setState({user: user});
        });
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

        let editButton = null;
        let contactButton = null;

        if (firebase.auth().currentUser === null){
            editButton = <div></div>;
            contactButton = <div></div>;
        } else if(firebase.auth().currentUser && firebase.auth().currentUser.uid === this.state.user.id ){
            editButton = <button className="editprofile" onClick={this.handleEditButton}>Edit profile</button>;
            contactButton = <div></div>;
        } else if(firebase.auth().currentUser.uid !== this.state.user.id){
            contactButton = <form action={"mailto:" + this.state.user.name + '.' + this.state.user.surname + '@jammin.com'}>
                                    <input type="submit" value="Contact me!" id="contact_me_button"/>
                                </form>;
        }

        return(
            <Row>
                <Col xs={12} sm={4}>
                    <Row>
                        <Col xs={12} className="left-sidebar">
                            <h2 className="name">{this.state.user.name} {this.state.user.surname}</h2>
                            {this.state.user.image ? <div className="profile-pic"><div className="image" style={{'background' : 'url(' + this.state.user.image + ')', 'backgroundSize' : 'cover', 'backgroundRepeat' : 'no-repeat'}}/></div> : <div className="image" style={{'background' : 'url(' + this.state.user.image + ')', 'backgroundSize' : 'cover', 'backgroundRepeat' : 'no-repeat'}}></div>}
                            <div className="text-center">
                                {contactButton}
                            </div>
                            <h4> {this.state.user.gender ? (this.state.user.gender === 'male' ? <div><FontAwesome name="male"/> {this.state.user.gender}</div> : <div><FontAwesome name="female"/> {this.state.user.gender}</div>) : 'Gender not specified'}</h4>
                            {this.state.user.age ? <h4>{this.state.user.age} years old</h4> : <p>Age not specified</p>}
                            <section>
                                 <h3>Availability</h3>
                                 {this.state.user.availability ? <p>{this.state.user.availability} times per week</p> : <p>Availability not specified</p>}
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
                        <Row>
                            <Col xs={12} sm={6}>
                                <h3>About me</h3>
                                <p>{this.state.user.about ? this.state.user.about : 'Description not filled in by user'}</p>
                                { editButton }
                            </Col>
                            <Col xs={12} sm={6}>
                                <h3>Where I play</h3>
                                {this.state.user.location ? this.state.user.location.map(function(location) {
                                        return <a href="#0" value={location} className="tag" key={location}>{location}</a>;
                                    }) : <p>No tracks uploaded by the user</p>}
                            </Col>
                        </Row>
                    </section>
                    <section className="soundcloud">
                        <Row>
                            <Col xs={12}>
                                <h3>My tracks</h3>
                            </Col>
                        </Row>
                        <Row>
                            {this.state.user.soundcloud ? this.state.user.soundcloud.map(function(sound, index) {
                                return <Col key={sound.track} xs={12} sm={6}> <Soundcloud source={sound.track}/> </Col>;
                            }) : <Col xs={12}><p>No tracks uploaded by the user</p></Col>}
                        </Row>
                    </section>
                    <section className="instruments">
                        <Row>
                            <Col xs={12}>
                                <h3>My instruments</h3>
                            </Col>
                        </Row>
                        <Row>
                            {this.state.user.instruments ? this.state.user.instruments.map(function (instrument, index) {
                                return <Instrument name={instrument.name} experience={instrument.experience}/>;
                            }) : <Col xs={12}><p>No instruments have been set by the user.</p></Col>}
                        </Row>
                    </section>
                    <Row>
                        <Col xs={12} sm={6}>
                            <section className="influences">
                                <h3>Influences</h3>
                                {this.state.user.music_listen ? this.state.user.music_listen.map(function (artist, index) {
                                    return <a className="tag" href="#"><span>{artist}</span></a>;
                                }) : <Col xs={12}><p>No influent artists have been selected by the user.</p></Col>}
                            </section>
                        </Col>
                        <Col xs={12} sm={6}>
                            <section className="genres">
                                <h3>Genres I like to play</h3>
                                {this.state.user.music_play ? this.state.user.music_play.map(function (artist, index) {
                                    return <a className="tag" href="#"><span>{artist}</span></a>;
                                }) : <Col xs={12}><p>No genres have been set yet.</p></Col>}
                            </section>
                        </Col>
                    </Row>
                    <section className="videos">
                        <Row>
                            <Col xs={12}>
                                <h3>Videos</h3>
                            </Col>
                        </Row>
                        <Row>
                            {/*<Col xs={12} sm={9} className="main_video">*/}
                                {/*<Video source={} />*/}
                            {/*</Col>*/}

                            {this.state.user.youtube ? this.state.user.youtube.map(function(source, index) {
                                return <Col xs={12} sm={6}> <Video source={source.video}/> </Col>;
                            }) : <Col xs={12}><p>No videos uploaded by the user yet.</p></Col>}

                        </Row>
                    </section>
                </Col>
            </Row>
        );
    }
}

export default Profile;
