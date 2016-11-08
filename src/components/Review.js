import React, {Component} from 'react';
import {Col, Row} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

class Review extends Component {
  render(){
    return(
      <article>
        <header>
          <FontAwesome name='rocket' size='2x'/>
          <h4>Amazing performance!</h4>
        </header>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        <footer>
          <p>Review by <a href="#">Allison McOwen</a></p>
        </footer>
      </article>
    );
  }
}

export default Review;
