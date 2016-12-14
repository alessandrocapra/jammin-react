import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

class SearchResult extends Component {
    render(){
        return(
        <Col xs={12}>
            <Row className="result">
                <Col xs={4}>
                    <img src={this.props.user.image} alt={this.props.user.name}/>
                    <button>Contact me!</button>
                </Col>
                <Col xs={8}>
                    <h3>{this.props.user.name} {this.props.user.surname}</h3>
                    {this.props.user.age ? <span>{this.props.user.age} years old</span> : <div></div>}
                    {this.props.user.gender ? <span>{this.props.user.age}</span> : <div></div>}
                    <p><FontAwesome name="globe"/> {this.props.user.location}</p>
                    <p>{this.props.user.about}</p>
                    <Row>
                        <Col xs={6}>
                            <h4>Music I play</h4>
                            {this.props.user.music_play.map((artist) => {
                                return <a key={artist} className="tag" href="#0"><span>{artist}</span></a>;
                            })}
                        </Col>
                        <Col xs={6}>
                            <h4>Musical influences</h4>
                            {this.props.user.music_listen.map((artist) => {
                                return <a key={artist} className="tag" href="#0"><span>{artist}</span></a>;
                            })}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Col>
        );
    }
}

export default SearchResult;