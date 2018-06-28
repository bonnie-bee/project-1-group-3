
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
        //Hide the sign-in form if the user is logged-in
        //Instead, show the welcome message
            $("#formEl").hide()
            $("#userWelcomeEmail").text(user.email)
            $(".loggedin-Div").show()
            console.log('Email is verified');
        
             $(document).on('click', ".placesBox", function(event){      
                    //Adding the code that adds the comments section
                        event.preventDefault();
                        var database = firebase.database();
                        var frbParkObjsRef = database.ref('Park-Objects');
                        var cmtBoxContDiv = $("<div>").attr("id", "cmtBoxContDiv")
                        cmtBoxContDiv.addClass("container-fluid")
                        cmtBoxContDiv.text("Comments:")
                        var commentSubmitBtn = $('<button id="commentSubmitBtn">Submit</button>')
                        var inputBox = $('<textarea type="text" placeholder="Comment here..." id="commentInput">')
                        $("#commentDiv").append(cmtBoxContDiv)
                        $("#commentDiv").append(inputBox)
                        $("#commentDiv").append($("<div>").append(commentSubmitBtn)) 
                        
                        //Firebase comments code begins here 
                        //Display any comments that might be stored in Firebase
                    database.ref().once("value", function(snapshot) {
                        var parkInfo = {
                        parkNamee: $(".placeDetails p4").text(),
                        //need to add an id to the p7 element containing the address
                        parkAddress: $(".placeDetails p7").text()
                                }
                //Then if the object's 'comments' child exists then 
                //retrieve and display any comments stored in FrB
                        if ( snapshot.child('Park-Objects/parkName:'+ parkId).exists()){
                        //The 'storedComments' var grabs the key/value pairs within the comments obj
                            var storedComments = snapshot.child(`Park-Objects/parkName:${parkId}/comments/`).val();
                                //The function below then grabs only the values of the above mentioned pairs   
                                Object.values(storedComments).forEach(function(values){
                                    //console.log('this is the values: '+ values);
                                    $("#commentDiv").append($('<div class="commentz">').append(values))
                                    })     
                        
                        } else {
                            //console.log("this parkName obj does NOT exists")
                            frbParkObjsRef.child('parkName:'+ parkId + '/parkInfo:').set(
                                parkInfo)
                            //setting the comments object to 1 because the object 
                            //can't be empty
                            frbParkObjsRef.child('parkName:'+ parkId + '/comments').set(
                                { comments: 0})
                            frbParkObjsRef.child('parkName:'+ parkId + '/pictures').set(
                                {pictures: 0})
                             }
                })
        //Firebase comments code ends  here
            
            $(document).on("click", "#commentSubmitBtn", function (event) {
                    event.preventDefault();
                    var cmt = $("#commentInput").val()
                    var today = new Date();
                    var readableTime =  today.toDateString()
                    //send this message to firebase......
                    //choosing to use the .push method since this will give
                    // unique id's to each comment
                    frbParkObjsRef.child('parkName:'+ parkId + '/comments').push({
                    comment: cmt,
                    time: readableTime})
                    //now display the comment on the comments wall!
                    $("#cmtBoxContDiv").append($('<div class="commentz">').append(cmt))
                })
                //for some reason the submit button only works once
                //a second click results in the app crashing......
                   
                //end of comments code
                })
       //the matching curly brace on line 123 below is matched on line 20
       // all code btw lines 20 and 1115 are within the 'if user 
       //is signed in and verified statement'
          }
    else {
        console.log('User is signed in but email is not verified');
        //unverified emails will not be allowed to post
        //insert code here for the 'no user' section of the if user statement
        //Hide the sign-in form if the user is logged-in
        //Instead, show the welcome message
        //$("#formEl").hide()
        $("#userWelcomeEmail").text(user.email)
        $(".loggedin-Div").show()
     
    
         $(document).on('click', ".placesBox", function(event){      
                //Adding the code that adds the comments section
                    event.preventDefault();
                    var database = firebase.database();
                    var frbParkObjsRef = database.ref('Park-Objects');
                    var cmtBoxContDiv = $("<div>").attr("id", "cmtBoxContDiv")
                    cmtBoxContDiv.addClass("container-fluid")
                    cmtBoxContDiv.text("Comments:")
                    //var commentSubmitBtn = $('<button id="commentSubmitBtn">Submit</button>')
                    // var inputBox = $('<textarea type="text" placeholder="Comment here..." id="commentInput">')
                    $("#commentDiv").append(cmtBoxContDiv)
                    // $("#commentDiv").append(inputBox)
                    //$("#commentDiv").append($("<div>").append(commentSubmitBtn)) 
                    
                    //Firebase comments code begins here 
                    //Display any comments that might be stored in Firebase
                database.ref().once("value", function(snapshot) {
                    var parkInfo = {
                    parkNamee: $(".placeDetails p4").text(),
                    //need to add an id to the p7 element containing the address
                    parkAddress: $(".placeDetails p7").text()
                            }
            //Then if the object's 'comments' child exists then 
            //retrieve and display any comments stored in FrB
                    if ( snapshot.child('Park-Objects/parkName:'+ parkId).exists()){
                    //The 'storedComments' var grabs the key/value pairs within the comments obj
                        var storedComments = snapshot.child(`Park-Objects/parkName:${parkId}/comments/`).val();
                            //The function below then grabs only the values of the above mentioned pairs   
                            Object.values(storedComments).forEach(function(values){
                                //console.log('this is the values: '+ values);
                                $("#commentDiv").append($('<div class="commentz">').append(values))
                                })     
                    
                    } else {
                        //console.log("this parkName obj does NOT exists")
                        frbParkObjsRef.child('parkName:'+ parkId + '/parkInfo:').set(
                            parkInfo)
                        //setting the comments object to 1 because the object 
                        //can't be empty
                        frbParkObjsRef.child('parkName:'+ parkId + '/comments').set(
                            { comments: 0})
                        frbParkObjsRef.child('parkName:'+ parkId + '/pictures').set(
                            {pictures: 0})
                         }
            })
    //Firebase comments code ends  here
        
        // $(document).on("click", "#commentSubmitBtn", function (event) {
        //         event.preventDefault();
        //         var cmt = $("#commentInput").val()
        //         var today = new Date();
        //         var readableTime =  today.toDateString()
        //         //send this message to firebase......
        //         //choosing to use the .push method since this will give
        //         // unique id's to each comment
        //         frbParkObjsRef.child('parkName:'+ parkId + '/comments').push({
        //         comment: cmt,
        //         time: readableTime})
        //         //now display the comment on the comments wall!
        //         $("#cmtBoxContDiv").append($('<div class="commentz">').append(cmt))
        //     })
            //for some reason the submit button only works once
            //a second click results in the app crashing......
               
            //end of comments code
            })
          }
    } else {
      // No user is signed in.
      console.log('No user is signed in.')
      $(document).on('click', ".placesBox", function(event){      
         //Adding the code that adds the comments section
        
        // console.log("this is the name of the park: " + )
         //console.log("this is the park information in a single object: " + )
         
         var database = firebase.database();
         var frbParkObjsRef = database.ref('Park-Objects');
         var cmtBoxContDiv = $("<div>").attr("id", "cmtBoxContDiv")
         cmtBoxContDiv.addClass("container-fluid")
         cmtBoxContDiv.text("Comments:")
 
        // var commentSubmitBtn = $('<button id="commentSubmitBtn">Submit</button>')
 
         var inputBox = $('<textarea type="text" placeholder="Comment here..." id="commentInput">')
 
         $("#commentDiv").append(cmtBoxContDiv)
         $("#commentDiv").append(inputBox)
         //$("#commentDiv").append($("<div>").append(commentSubmitBtn)) 
         console.log("this is the park id: " + parkId)
         
         //Firebase comments code begins here 
         //Display any comments that might be stored
         database.ref().once("value", function(snapshot) {
            console.log(snapshot.child('Park-Objects'))
             
            var parkNamee = $(".placeDetails p4").text()
            var parkAddress =  $(".placeDetails p7").text()
             
            console.log("this is the name of the park: " + parkNamee)
            console.log("this is the name of the park: " + parkAddress)
            // var parkId = parkNames.results[choice].place_id;
                 //Then if the object's 'comments' child exists then 
                   //retrieve and display it's information
                   //snapshot.child(parkId)
                if ( snapshot.child('Park-Objects/parkName:'+ parkId).exists()){
                    //retrieve and display any comments stored in FrB
                    
                    console.log("this parkName obj exists; the park id: " + parkId)
                    //var storedComments = database.ref().child(`Park-Objects/parkName:${parkId}/comments/`);
                    //var storedComments = snapshot.child(`Park-Objects/parkName:${parkId}/comments/`).val();
                    var storedComments = snapshot.child(`Park-Objects/parkName:${parkId}/comments/`).val();
                    console.log("this is the value of the storedComments var: " + storedComments)
                           
                            Object.values(storedComments).forEach(function(values){
                                console.log('this is the values: '+ values);
                                var today = new Date();
                                var readableTime =  today.toDateString()
                                //testUser = 'none'
                                // $("#commentDiv").append($('<div class="commentz">').append(testUser,readableTime,values))
                                // })
                                $("#cmtBoxContDiv").append($('<div class="commentz">').append(`${readableTime}<br>${values}`))
                            })          
                             
                  // $("#commentDiv").append(`${storedComments}`)
                   //$("#commentDiv").append(storedComments)
                //    $(document).on("click", "#commentSubmitBtn", function (event) {
                //     event.preventDefault();
                //     var cmt = $("#commentInput").val()
                //     console.log(cmt)
                //     var today = new Date();
                //     var readableTime =  today.toDateString()
                //     //send this message to firebase......
                //     //choosing to use the .push method since this will give
                //     // unique id's to each comment
                //     //frbParkObjsRef.child('parkName:'+ parkId + '/comments').push(
                //     //{ comments: cmt,readableTime})
                //   frbParkObjsRef.child('parkName:'+ parkId + '/comments').push(cmt
                //    )
        
                   
                //     //now paste the comment on the comments wall!
                //     $("#cmtBoxContDiv").append($('<div class="commentz">').append(`${testUser}<br>${readableTime}<br>${cmt}`))
                //     //for some reason the submit button only works once
                //     //a second click results in the app crashing......
                // })
                    
                    
                   } else {
                    console.log("this parkName obj does NOT exists")
                     frbParkObjsRef.child('parkName:'+ parkId + '/parkInfo:').set(
                         parkNamee
                     )
                     //setting the comments object to 1 because the object 
                     //can't be empty
                     frbParkObjsRef.child('parkName:'+ parkId + '/comments').set(
                       { comments: "Tell the community about your visit to this park here! - Fresh Air 'Fairies'"})
                    }
           })
         //end of comments code
        })
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
        
            window.alert("Error: " + errorMessage  +"Error Code: " + errorCode) });
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
        window.alert("Error: " + errorMessage + newLine +"Error Code: " + errorCode)})
        
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
          window.alert("Error: " + error)
        });       
    })