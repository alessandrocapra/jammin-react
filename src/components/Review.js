import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';

class Review extends Component {
    render(){
        return(
            <article>
                <header>
                    <FontAwesome name='rocket' size='2x'/>
                    <h4>{this.props.title}</h4>
                    <p><strong>{this.props.instrument}</strong></p>
                </header>
                <p>Lorem ipsum dolor set amet, consectetur adipisicing, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <footer>
                    <p>Review by <a href="#"><strong>{this.props.name}</strong></a></p>
                </footer>
                <hr />
            </article>
        );
    }
}

export default Review;
