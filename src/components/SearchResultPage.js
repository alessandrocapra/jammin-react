import React, {Component} from 'react';
import { Row, Col } from 'react-bootstrap';

// Load components
import SearchResultList from './SearchResultList';

class SearchResultPage extends Component {
    render(){
        return (
            <div>
                <Row>
                    <Col xs={12}><h2>Search results for {this.props.route.instrument} around {this.props.route.location}</h2></Col>
                </Row>
                <Row>
                    <Col xs={4}>
                        <h3>Filters</h3>
                    </Col>
                    <Col xs={8}>
                        <SearchResultList />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default SearchResultPage;