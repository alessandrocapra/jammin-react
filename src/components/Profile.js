import React, {Component} from 'react';
import { Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import {FBAppDB} from '../modules/firebase';

// import components
import Review from './Review';
import Instrument from './Instrument';
import Video from './Video';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {}
        }
    }

    componentWillMount() {

        // Load user data
        let profileId = this.props.params.userId;
        var USER_DB = FBAppDB.ref('users/' + profileId);

        return USER_DB.once('value').then(function (snapshot) {
            let user = snapshot.val();
            console.log(user);
            this.setState({user: user});
        }.bind(this));
    }

    render(){

        let instrumentList = this.props.route.instruments;
        let instruments = instrumentList.map((instrument) => {
            return <Instrument name={instrument.name}
                           experience={instrument.experience}
                           image={instrument.image}
                           rating={instrument.rating}
                           percentage={instrument.percentage}
                           key={instrument.name} />
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
                        <h3>About me</h3>
                        <p>{this.state.user.about}</p>
                    </section>
                    <section className="instruments">
                        <h3>My instruments</h3>
                        {instruments}
                        {/*<Instrument name="Electric guitar" image="img/instruments/electric-guitar.svg" experience={3} rating="rocket" percentage="98%"/>*/}
                        {/*<Instrument name="Drums" image="img/instruments/drum-set.svg" experience={1} rating="thumbs-up" percentage="75%"/>*/}
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
                                <a className="tag" href="#"><span>{this.state.user.music_play}</span></a>
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
