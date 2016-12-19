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
                <Venue name="Sound Mind" image="img/venue44.jpg" location="Nokiantie 2-4 C, 00510, Helsinki" contact="info@soundmind.fi" description="Sound Mind offers four bigger, and six smaller training rooms. All rooms are sound proofed, acoustically treated, and have floating floors. The training rooms are equipped. It is possible to make a regular training deal or just rent single training hours.  "/>
                <Venue name="City of Helsinki Studios for Youth" image="img/venue2.jpg" location="Helsinki" contact="http://tinyurl.com/HelsinkiYouth" description="The City of Helsinki’s youth centers offer some practice rooms to young musicians and bands in the different areas of the city. To find the one closest to you and their contact details please visit the suggested link above. "/>
                <Venue name="HelMet libraries Practise Rooms" image="img/venue33.jpg" location="Helsinki" contact="http://tinyurl.com/HelMetLibraries" description="HelMet-libraries have small practice rooms and other music-related facilities. Please visit the suggested link to find the closest library to you and to find out more about the opening times as well as the rooms and other facilities available in them."/>
            </Row>
        );
    }
}

export default VenuePage;
