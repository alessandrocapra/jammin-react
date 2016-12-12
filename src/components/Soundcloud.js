import React, {Component} from 'react';

class Soundcloud extends Component {
    render(){
        let source = this.props.source;
        return(
            <iframe width="100%" height="166" scrolling="no" frameBorder="no" src={source}></iframe>
        );
    }
}

export default Soundcloud;