import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';

class Review extends Component {
    render(){
        return(
            <article>
                <header>
                    <FontAwesome name={this.props.rating} size='2x'/>
                    <h4>{this.props.title}</h4>
                    <p><strong>{this.props.instrument}</strong></p>
                </header>
                <p>Really loved your playing style and your friendly vibe throughout the entire Jammin session. Cannot wait to play some music with you again some time.</p>
                <footer>
                    <p>Review by <a href="#"><strong>{this.props.name}</strong></a></p>
                </footer>
                <hr />
            </article>
        );
    }
}

export default Review;
