import React, {Component} from 'react';

class Video extends Component {
    render(){
        return (
            <iframe width="420" height="315" frameBorder="0"
                    src={this.props.source}>
            </iframe>
        );
    }
}

export default Video;