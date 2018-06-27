
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

//This snippet was taken directly from the Firebase documentation
//It is an observer and it checks to see if a user is currently 
//logged into the app
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

       
        //The snippet below checks to see if the user's email is verified or not
        if (user.emailVerified) {
          console.log(user.displayName)

        //Hide the sign-in form if the user is logged-in
        //Instead, show the welcome message
            $("#formEl").hide()
            $("#userWelcomeEmail").text(user.email)
            $(".loggedin-Div").show()
            console.log('Email is verified');
          }
          else {
            console.log('Email is not verified');
          }

    } else {
      // No user is signed in.
      console.log('No user is signed in.')
    }
  });


$("#signInBtn").on("click", function (event) {
    event.preventDefault();

    var email =  $("#emailInput").val()
    var password =  $("#passwordInput").val()

        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        
            console.log("Error: " + errorMessage  +"Error Code: " + errorCode) });

})

$("#logoutBtn").on("click", function(){
    console.log('jdgvowach')
    firebase.auth().signOut()
    console.log('jdgvowach')
    //This snippet goes after the 'signOut()' and can be uesd to display a good-by message
    // .then(function() {
    //     // Sign-out successful.
    //   }).catch(function(error) {
    //     // An error happened.
      //});
})

//Button click that creates an account;
$("#createLoginBtn").on("click", function(event){
    event.preventDefault();
    $("#signInBtn").hide()
    $("#createLoginBtn").text("Submit")
    $(".showUp").show()

    //Grab the email and password values
    var email =  $("#emailInput").val()
    var password =  $("#passwordInput").val()
    
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message; 
        //Throw an alert if we 'catch' an error during the sign-up process
        console.log("Error: " + errorMessage + newLine +"Error Code: " + errorCode)})
        
        $("#createLoginBtn").hide()
        $("#pwLabel").hide()
        $("#passwordInput").hide()
        $("#verifyEmail").show()
        $("#emailInput").val('')
        $("#newUserMsg").hide()
        $("#sendEmailVerification").show()
    })

      //Code for requesting a verification email goes below:
$("#sendEmailVerification").on("click", function(event){
    event.preventDefault();

        firebase.auth().onAuthStateChanged(function(user) {
         user.sendEmailVerification(); 
        });
    })

$("#resetPW").on("click", function(event){
    event.preventDefault();
    
        var auth = firebase.auth();
        var email =  $("#emailInput").val()
        
        auth.sendPasswordResetEmail(email).then(function() {
          // Email sent.
        }).catch(function(error) {
          // An error happened.
          console.log("Error: " + error)
        });       
    })
