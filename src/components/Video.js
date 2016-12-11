import React, {Component} from 'react';

class Video extends Component {
    render(){
        let videoSource = this.props.source.video.split('=')[1];
        console.log('videoSource: ', videoSource);

        return (
            <iframe width="420" height="315" frameBorder="0"
                    src={"https://www.youtube.com/embed/" + videoSource}>
            </iframe>
        );
    }
}

export default Video;