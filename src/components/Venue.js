import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';


class Venue extends Component{

    render(){
        return (
            <Row className="venue">
                <Col xs={12} sm={5}>
                    <img src={this.props.image} alt={this.props.name}/>
                </Col>
                <Col xs={12} sm={7}>
                    <h2>{this.props.name}</h2>
                    <div className="details">
                        <span><FontAwesome name="globe"/> {this.props.location} </span>
                        <span><FontAwesome name="envelope"/> {this.props.contact}</span>
                    </div>
                    <Row>
                        <Col xs={12} sm={7}>
                            <h3>Description</h3>
                            <p>Lorem poret dolor sit amet, consectetur adipisicing elit. Aliquid animi blanditiis cumque deserunt dicta distinctio, eaque excepturi explicabo id iusto labore nemo numquam perferendis quo quod reiciendis soluta tempora veniam!</p>
                        </Col>
                        <Col xs={12} sm={5}>
                            <h3>Services</h3>
                            <ul>
                                <li>One</li>
                                <li>Two</li>
                                <li>Three</li>
                                <li>Four</li>
                            </ul>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default Venue;