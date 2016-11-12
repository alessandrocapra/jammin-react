import React, {Component} from 'react';
import { Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import {FBApp} from '../modules/firebase';

// import components
import Review from './Review';
import Instrument from './Instrument';

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
                <Col xs={8}>
                    <section>
                        <h3>About me</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquam aperiam culpa, cumque debitis dolorem dolores eos labore laudantium libero maxime nemo nulla obcaecati qui saepe similique temporibus veniam voluptates.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam eius id labore neque nostrum? Aliquam, aperiam cumque eaque, eius esse impedit iste laborum mollitia nihil perferendis reprehenderit repudiandae rerum voluptatum?</p>
                    </section>
                    <section className="instruments">
                        <h3>My instruments</h3>
                        <Instrument name="Electric guitar" image="img/instruments/electric-guitar.svg" experience={3} rating="rocket" />
                        <Instrument name="Drums" image="img/instruments/drum-set.svg" experience={1} rating="thumbs-up"/>
                    </section>
                </Col>
            </Row>
        );
    }
}

export default Profile;
