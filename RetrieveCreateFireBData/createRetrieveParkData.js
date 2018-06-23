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


$(document).on("click", ".parkBtn", function (event) {
    event.preventDefault();

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
    
           console.log("user is signed in")
               //check to see if the 'test' folder exisits in FB and
          //print specified message 

           if (database.ref().child('Test')) {
                console.log('the test folder DOES exist')
              }

             else {
                console.log('the test folder does not exist')
              }
    
        } else {
          // No user is signed in.
          console.log('No user is signed in.')
          database.ref().on("value", function(snapshot) {
            console.log(snapshot.val())
            })

                  if (database.ref().child('Test')) {
                    console.log('the test folder DOES exist')
                  }

                  else {
                    console.log('the test folder does not exist')
                    console.log(snapshot)
                  }

            }
      });


    
    // database.ref().child('test').push({
    // comment: cmt,
    // time: readableTime })

   })

   