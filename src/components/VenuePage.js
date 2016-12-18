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
                <Venue name="Sound Mind" image="img/venue1.jpg" location="Nokiantie 2-4 C, 00510, Helsinki" contact="info@soundmind.fi"/>
                <Venue name="City of Helsinki Studios for Youth" image="img/venue2.jpg" location="Helsinki" contact="http://tinyurl.com/HelsinkiYouth"/>
                <Venue name="HelMet libraries Practise Rooms" image="img/venue2.jpg" location="Helsinki" contact="http://tinyurl.com/HelMetLibraries"/>
            </Row>
        );
    }
}

export default VenuePage;
