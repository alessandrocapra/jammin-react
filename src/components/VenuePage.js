import React, { Component } from 'react';
import {Row} from 'react-bootstrap';
import {FBAppDB} from '../modules/firebase';

// Components
import Venue from './Venue';

// Venues from DB
var VENUES_DB = FBAppDB.ref('/venues/venue1');

class VenuePage extends Component {

    componentDidMount(){
        VENUES_DB.once('value').then(function (snapshot) {
            console.log(snapshot.val().name);
        })
    }

    render(){
        return(
            <Row>
                <Venue name="Meet and Jam! Rehearsal Rooms" image="img/venue1.jpg" location="Friederinkatu 37, Helsinki" contact="info@meetandjam.com"/>
                <Venue name="The Mad Monk" image="img/venue2.jpg" location="Camden Street 42, London" contact="play@themadmonk.co.uk"/>
            </Row>
        );
    }
}

export default VenuePage;
