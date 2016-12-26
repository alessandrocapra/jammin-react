import React, {Component} from 'react';
import { Row, Col } from 'react-bootstrap';

class Faq extends Component {
    render(){
        return (
            <div>
                <Row className="faq">
                    <Col xs={12}>
                        <h2>Coming soon</h2>
                        <img src="img/live-rock.jpg" alt="Long live rock & roll"/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Faq;