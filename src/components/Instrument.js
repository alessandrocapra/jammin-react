import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

// TODO
// 1. Retrieve the appropriate image from the database

class Instrument extends Component {

    remove(){
        this.props.removeInstrument(this.props.name);
    }

    render(){
        return(
            <article className="instrument">
                    {/*<Col xs={12} sm={2}>*/}
                        {/*<img className="profile_pic" src={this.props.image} alt={this.props.name}/>*/}
                    {/*</Col>*/}
                    <Col xs={12} sm={6}>
                        <div className="container-elements">
                            <span className="delete-element" onClick={this.remove.bind(this)}>x</span>
                            <h3>{this.props.name}</h3>
                            <p>{this.props.experience} years of experience</p>
                        </div>
                    </Col>
                    {/*<Col xs={12} sm={6} className="rating">*/}
                        {/*<h4>Overall Rating</h4>*/}
                        {/*/!*<FontAwesome name={this.props.rating} size="4x"/>*!/*/}
                        {/*<span className="review_percentage">{this.props.percentage}% positive opinions</span>*/}
                    {/*</Col>*/}
            </article>
        );
    }
}

export default Instrument;
