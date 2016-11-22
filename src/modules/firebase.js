import Firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCrqfEW-Z8BKTZ8GZ44pjxV_9b0XExh_bo",
    authDomain: "jammin-e10be.firebaseapp.com",
    databaseURL: "https://jammin-e10be.firebaseio.com",
    storageBucket: "jammin-e10be.appspot.com",
    messagingSenderId: "170620124215"
};
var FBApp = Firebase.initializeApp(config);

module.exports.FBAppDB = FBApp.database();