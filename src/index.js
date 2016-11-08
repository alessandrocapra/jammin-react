import {render} from 'react-dom';
import Firebase from 'firebase';

import 'bootstrap/dist/css/bootstrap.css';
import '/css/style.css';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCrqfEW-Z8BKTZ8GZ44pjxV_9b0XExh_bo",
  authDomain: "jammin-e10be.firebaseapp.com",
  databaseURL: "https://jammin-e10be.firebaseio.com",
  storageBucket: "jammin-e10be.appspot.com",
  messagingSenderId: "170620124215"
};
Firebase.initializeApp(config);

// Routes
import routes from './router';

render(routes, document.getElementById('root'));
