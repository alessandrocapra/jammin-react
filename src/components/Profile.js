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
    constructor(props){
        super(props);
        this.state = {instruments: []}
    }

    componentDidMount(){
        INSTRUMENTS_DB.once('value').then(function(snapshot) {
            console.log('snapshot.val()', snapshot.val());

            this.state.instruments.push(snapshot.val());

            // var items = [];
            // items.push(snapshot.val());
            // console.log('this.instrucasso', this.state.instruments);

            // snapshot.map(function (item) {
            //    items.push(item.name)
            // });

            // console.log('instruments state - componentDidMount', this.state.instruments);
            this.setState({
                instruments: this.state.instruments
            });
        }.bind(this));
    }

    render(){

        var rows = [];
        for (var obj in this.state.instruments[0]){
            rows.push(<Instrument name={this.state.instruments[0][obj].name} image={this.state.instruments[0][obj].image} />);
        }

        return(
            <div>
                <Row>
                    <Col xs={4}>
                        <Row>
                            <Col xs={12} className="left-sidebar">
                                <img src="#" alt='lol'/>
                                <h2 className="name">John Doe</h2>
                                <h4>Male, 23 years old</h4>
                                <h4> <FontAwesome name='globe' /> Location </h4>
                                <section>
                                    <h3>Availability</h3>
                                    <p>3 times per week</p>
                                </section>
                                <section className="reviews">
                                    <h3>Reviews</h3>
                                    <Review />
                                    <Review />
                                </section>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={8}>
                        <section>
                            <h3>About me</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </section>
                        <section className="instruments">
                            <h3>My instruments</h3>
                            {rows}
                        </section>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Profile;
