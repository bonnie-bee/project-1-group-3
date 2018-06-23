var config = {
    apiKey: "AIzaSyDxPAAEU9IpAM2xXpNOzL9LUlSJh3cN9jw",
    authDomain: "freshairp1-64c68.firebaseapp.com",
    databaseURL: "https://freshairp1-64c68.firebaseio.com",
    projectId: "freshairp1-64c68",
    storageBucket: "freshairp1-64c68.appspot.com",
    messagingSenderId: "456240610175"
  };
  firebase.initializeApp(config);
var database = firebase.database();


$(document).on("click", "#commentSubmitBtn", function (event) {
    event.preventDefault();

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
    
            //display comment text nox that gives ability to comment 
           console.log("user is signed in")
    
        } else {
          // No user is signed in.
          console.log('No user is signed in.')
        }
      });


    
    database.ref().child('test').push({
    comment: cmt,
    time: readableTime })

   })

   