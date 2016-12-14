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
                    <p><FontAwesome name="rocket"/> {this.props.user.location}</p>
                    <p><FontAwesome name="rocket"/> {this.props.user.playedWith}</p>
                    <p>{this.props.user.about}</p>
                    <Row>
                        <Col xs={6}>
                            <h4>Music I play</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aspernatur, at culpa deleniti, dolorum earum est ex, itaque nobis nostrum obcaecati officia quas qui quibusdam quidem quis quos sequi sint</p>
                        </Col>
                        <Col xs={6}>
                            <h4>Musical influences</h4>
                            {this.props.user.music_listen.map((artist) => {
                                return <a className="tag" href="#0"><span>{artist}</span></a>;
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