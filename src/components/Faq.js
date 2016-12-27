import React, {Component} from 'react';
import { Row, Col } from 'react-bootstrap';

class Faq extends Component {
    render(){
        return (

            <Row className="faq">
                <Col xs={12}>
                    <h2>Frequently Asked Questions</h2>
                </Col>
                <Col xs={12}>
                    <Row>
                        <Col xs={12} sm={4}>
                            <h3> I am an unregistered user. How come I cannot contact anyone? </h3>
                            <p> Hi and welcome to Jammin. Our policy is that only registered users can contact musicians registered on Jammin. Creating a profile is free, so why not do it today? This will also allow other musicians to find you.</p>
                        </Col>
                        <Col xs={12} sm={4}>
                            <h3> I am a beginner musician. Is Jammin the right place for me? </h3>
                            <p>Jammin welcomes musicians of all levels, so of course. Besides, you can only get better by practising. </p>
                        </Col>
                        <Col xs={12} sm={4}>
                            <h3>What if someone leaves a bad review on my profile, after playing with me?</h3>
                            <p>The reviews have been introduced as an additional measure to help express one’s ability to play a music instrument. All reviews are reviewed by Jammin staff to ensure they are written in appropriate language. Besides pure community is very friendly, so you shouldn’t worry too much.</p>
                        </Col>
                    </Row>
                    <h3 className="text-center"> Have more questions? Email our team: jammin@gmail.com </h3>
                </Col>
            </Row>

        );
    }
}

export default Faq;