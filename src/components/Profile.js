import React, {Component} from 'react';
import { Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import {FBApp} from '../modules/firebase';

// import components
import Review from './Review';
import Instrument from './Instrument';
import Video from './Video';

// Load data from database
var INSTRUMENTS_DB = FBApp.ref('/instruments/');

class Profile extends Component {
    // constructor(props){
        // super(props);
        // this.state = {
        //     instruments: [],
        // }
    // }

    componentDidMount(){
        // INSTRUMENTS_DB.once('value').then(function(snapshot) {
        //     console.log('snapshot.val()', snapshot.val());
        //
        //     this.state.instruments.push(snapshot.val());
        //     this.setState({
        //         instruments: this.state.instruments
        //     });
        // }.bind(this));
    }

    render(){

        // This is to write instruments in the page
        // var rows = [];
        // for (var obj in this.state.instruments[0]) {
        //     rows.push(<Instrument name={this.state.instruments[0][obj].name}
        //                           image={this.state.instruments[0][obj].image}/>);
        // }

        return(

            <Row>
                <Col xs={4}>
                    <Row>
                        <Col xs={12} className="left-sidebar">
                            <img src="img/profile.jpg" alt="Stoner Stanley"/>
                            <h2 className="name">Stanley Stoner</h2>
                            <h4>Male, 22 years old</h4>
                            <h4> <FontAwesome name='globe' /> Helsinki </h4>
                            <section>
                                <h3>Availability</h3>
                                <p>3 times per week</p>
                            </section>
                            <section className="reviews">
                                <h3>Reviews</h3>
                                <Review name="Lorren McWuts" />
                            </section>
                        </Col>
                    </Row>
                </Col>
                <Col xs={8} className="profile_content">
                    <section>
                        <h3>About me</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquam aperiam culpa, cumque debitis dolorem dolores eos labore laudantium libero maxime nemo nulla obcaecati qui saepe similique temporibus veniam voluptates.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam eius id labore neque nostrum? Aliquam, aperiam cumque eaque, eius esse impedit iste laborum mollitia nihil perferendis reprehenderit repudiandae rerum voluptatum?</p>
                    </section>
                    <section className="instruments">
                        <h3>My instruments</h3>
                        <Instrument name="Electric guitar" image="img/instruments/electric-guitar.svg" experience={3} rating="rocket" percentage="98%"/>
                        <Instrument name="Drums" image="img/instruments/drum-set.svg" experience={1} rating="thumbs-up" percentage="75%"/>
                    </section>
                    <Row>
                        <Col xs={12} sm={6}>
                            <section className="influences">
                                <h3>Influences</h3>
                                <a className="tag" href="#"><span>Jimi Hendrix</span></a>
                                <a className="tag" href="#"><span>The Doors</span></a>
                                <a className="tag" href="#"><span>KISS</span></a>
                                <a className="tag" href="#"><span>Queen</span></a>
                                <a className="tag" href="#"><span>David Bowie</span></a>
                            </section>
                        </Col>
                        <Col xs={12} sm={6}>
                            <section className="genres">
                                <h3>Genres I like to play</h3>
                                <a className="tag" href="#"><span>Blues</span></a>
                                <a className="tag" href="#"><span>Classic Rock</span></a>
                                <a className="tag" href="#"><span>Reggae</span></a>
                            </section>
                        </Col>
                    </Row>
                    <section className="videos">
                        <h3>Videos</h3>
                        <Row>
                            <Col xs={12} sm={9} className="main_video">
                                <Video source="https://www.youtube.com/watch?v=rVDVWFQ2IO8" />
                            </Col>
                            <Col xs={12} sm={3}>
                                <Video source="https://www.youtube.com/watch?v=auLBLk4ibAk" />
                                <Video source="https://www.youtube.com/embed/TgntkGc5iBo" />
                                <Video source="https://www.youtube.com/watch?v=D2yymMhjRu8" />
                            </Col>
                        </Row>
                    </section>
                </Col>
            </Row>
        );
    }
}

export default Profile;
