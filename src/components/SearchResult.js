import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import {browserHistory} from 'react-router';

class SearchResult extends Component {

    goToProfile(){
        console.log('the user is ', this.props.user);
        browserHistory.push(`/profile/${this.props.user.id}`);
    }

    render(){

        console.log(this.props.user.name + ' music_play: ', this.props.user.music_play);

        return(
        <Col xs={12}>
            <Row className="result">
                <Col xs={12} sm={4}>
                    <div className="profile-pic"><div className="image" style={{'background' : 'url(' + this.props.user.image + ')', 'backgroundSize' : 'cover', 'backgroundRepeat' : 'no-repeat'}} onClick={this.goToProfile.bind(this)}/></div>
                    <button>Contact me!</button>
                </Col>
                <Col xs={12} sm={8}>
                    <h3>{this.props.user.name} {this.props.user.surname}</h3>
                    <strong>{this.props.user.gender ? (this.props.user.gender === 'male' ? <p><FontAwesome name="male"/> {this.props.user.gender}</p> : <p><FontAwesome name="female"/>{this.props.user.gender}</p>) : 'Gender not specified'}</strong>
                    {this.props.user.age ? <strong><p>{this.props.user.age} years old</p></strong> : <p>Age not specified</p>}
                    <p>{this.props.user.about}</p>
                    <Row className="result_info">
                        <Col xs={12} sm={6} className="filter_options">
                            <h4>Influences</h4>
                            {this.props.user.music_listen ? this.props.user.music_listen.map((artist) => {
                                return <a key={artist} className="tag" href="#0"><span>{artist}</span></a>;
                            }) : <div>No artist specified</div>}
                        </Col>
                        <Col xs={12} sm={6} className="filter_options">
                            <h4>Genres played</h4>
                            {this.props.user.music_play ? this.props.user.music_play.map((artist) => {
                                return <a className="tag" href="#0"><span>{artist}</span></a>;
                            }) : <div>No genres specified</div>}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Col>
        );
    }
}

export default SearchResult;