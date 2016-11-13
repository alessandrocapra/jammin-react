import React, {Component} from 'react';
import { Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import {FBApp} from '../modules/firebase';

// import components
import Review from './Review';
import Instrument from './Instrument';
import Video from './Video';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            surname : "",
            gender : "",
            location : "",
            age : "",
            about : "",
            availability : "",
            image : "",
            instruments : "",
            music_listen : "",
            music_play : "",
            youtube : ""
        }
    }

    componentDidMount() {

        // Load user data
        let profileId = this.props.params.userId;
        var USER_DB = FBApp.ref('users/' + profileId);

        return USER_DB.once('value').then(function (snapshot) {
            let user = snapshot.val();
            console.log(user);
            this.setState({
                name: user.name,
                surname : user.surname,
                gender : user.gender,
                location : user.location,
                age : user.age,
                about : user.about,
                availability : user.availability,
                image : user.image,
                instruments : user.instruments,
                music_listen : user.music_listen,
                music_play : user.music_play,
                youtube : user.youtube
            });
        }.bind(this));

        // const user_values = this.state.user;
        // USER_DB.map((key, index) => {
        //     let user = user_values[key];
        //     // You can now use instrument.name and instrument.image
        //     console.log('user inside function: ', key);
        // });

    }

        // INSTRUMENTS_DB.once('value').then(function(snapshot) {
        //     console.log('snapshot.val()', snapshot.val());
        //
        //     this.state.instruments.push(snapshot.val());
        //     this.setState({
        //         instruments: this.state.instruments
        //     });
        // }.bind(this));

    render(){

        // This is to write instruments in the page
        // var rows = [];
        // for (var obj in this.state.instruments[0]) {
        //     rows.push(<Instrument name={this.state.instruments[0][obj].name}
        //                           image={this.state.instruments[0][obj].image}/>);
        // }


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
                            <img src={this.state.image} alt={this.state.name + this.state.surname}/>
                            <h2 className="name">{this.state.name} {this.state.surname}</h2>
                            <h4>{this.state.gender}, {this.state.age} years old</h4>
                            <h4> <FontAwesome name='globe' /> {this.state.location} </h4>
                            <section>
                                <h3>Availability</h3>
                                <p>{this.state.availability} times per week</p>
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
                        <p>{this.state.about}</p>
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
                                <a className="tag" href="#"><span>{this.state.music_listen}</span></a>
                            </section>
                        </Col>
                        <Col xs={12} sm={6}>
                            <section className="genres">
                                <h3>Genres I like to play</h3>
                                <a className="tag" href="#"><span>{this.state.music_play}</span></a>
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
