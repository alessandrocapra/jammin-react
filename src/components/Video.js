import React, {Component} from 'react';

class Video extends Component {
    render(){
        console.log('videosource: ', this.props.source);
        let videoSource = this.props.source.split('=')[1];

        return (
            <iframe width="420" height="315" frameBorder="0"
                    src={"https://www.youtube.com/embed/" + videoSource}>
            </iframe>
        );
    }
}

export default Video;