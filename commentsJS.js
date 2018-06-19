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

//Programming the comment box to appear only after a park has been selected 
//Using a generic HTML button to simulate selection of park
    $("#selectParkBtn").on("click", function (event) {
         event.preventDefault();

        $("#commentBTN").hide()

        var cmtBoxContDiv = $("<div>").attr("id", "cmtBoxContDiv")
        cmtBoxContDiv.addClass("container-fluid")
        cmtBoxContDiv.text("Comments:")

        var commentSubmitBtn = $('<button id="commentSubmitBtn">Submit</button>')

        var inputBox = $('<textarea type="text" placeholder="Comment here..." id="commentInput">')

        $("#divBody").append(cmtBoxContDiv)
        $("#divBody").append(inputBox)
        $("#divBody").append($("<div>").append(commentSubmitBtn)) 

        $("#commentSubmitBtn").on("click", function (event) {
            event.preventDefault();
            var cmt = $("#commentInput").val()
            var today = new Date();
            var readableTime =  today.toDateString()
           console.log(cmt)  
           console.log(readableTime) 

           //send this message to firebase......
           //how do i create multiple firebase objects without them
           //rewriting over one-another???
           database.ref().on("value", function(snapshot) {
                database.ref().set({
                    comment: cmt,
                    time: readableTime
                }) })
            //now paste the comment on the comments wall!
            $("#cmtBoxContDiv").append($("<div>").append(cmt))
            //for some reason the submit button only works once
            //a second click results in the app crashing......
        })

    })

   




    
