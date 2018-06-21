
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

$("#signInBtn").on("click", function (event) {
    event.preventDefault();

   console.log($("#emailInput").val())

})

$("#createLoginBtn").on("click", function (event) {
    event.preventDefault();

    $("#signInBtn").hide()
    $("#createLoginBtn").text("Submit")
    $(".showUp").show()

    
    //create a 'username Input box'



})