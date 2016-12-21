import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import InstrumentList from '../data/instruments';

// TODO
// 1. Retrieve the appropriate image from the database

class Instrument extends Component {

    remove(){
        this.props.removeInstrument(this.props.index);
    }

    render(){
        let instrumImage = null;
        InstrumentList.map((instrument) => {
            if(instrument.value === this.props.name){
                instrumImage = instrument.image;
            }
        })

        return(
            <Col className="instrument" xs={12} sm={6}>
                <div className="container-elements">
                    <span className="delete-element" onClick={this.remove.bind(this)}>x</span>
                    <img src={instrumImage} alt={this.props.name}/>
                    <div style={{"display" : "inline-block"}}>
                        <h4>{this.props.name}</h4>
                        <p>{this.props.experience} years of experience</p>
                    </div>
                </div>
            </Col>
        );
    }
}

export default Instrument;
