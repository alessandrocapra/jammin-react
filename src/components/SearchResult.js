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
        return(
        <Col xs={12}>
            <Row className="result">
                <Col xs={12} sm={4}>
                    <div className="profile-pic"><img src={this.props.user.image} alt={this.props.user.name} onClick={this.goToProfile.bind(this)}/></div>
                    <form action={"mailto:" + this.props.user.name + '.' + this.props.user.surname + '@jammin.com'}>
                        <input type="submit" value="Contact me!" id="contact_me_button"/>
                    </form>
                </Col>
                <Col xs={12} sm={8}>
                    <h3>{this.props.user.name} {this.props.user.surname}</h3>
                    {this.props.user.age ? <span>{this.props.user.age} years old, </span> : <div></div>}
                    {this.props.user.gender ? <span>{this.props.user.gender}</span> : <div></div>}
                    <p><FontAwesome name="globe"/> {this.props.user.location}</p>
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
                            }) : <div>No artist specified</div>}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Col>
        );
    }
}

export default SearchResult;