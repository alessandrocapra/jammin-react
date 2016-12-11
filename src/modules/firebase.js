import firebase from 'firebase';
import firebaseui from 'firebaseui';

// Initialize firebase
var config = {
    apiKey: "AIzaSyCrqfEW-Z8BKTZ8GZ44pjxV_9b0XExh_bo",
    authDomain: "jammin-e10be.firebaseapp.com",
    databaseURL: "https://jammin-e10be.firebaseio.com",
    storageBucket: "jammin-e10be.appspot.com",
    messagingSenderId: "170620124215"
};
var FBApp = firebase.initializeApp(config);

module.exports.FBAppDB = FBApp.database();
module.exports.FBAppAuth = FBApp.auth();
module.exports.FBStorage = FBApp.storage();

