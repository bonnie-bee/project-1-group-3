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
var frbParkObjsRef = database.ref('Park-Objects');

var address = "100 Muffin Lane"
var comment = 'test commment'

//The var parkName has to be changed to point towards a unique park identifier
//the identifier can be a ID, an address or lat/Long coordinates (or range of these coords)
//Need to add the comments to each particular park
$("button.parkBtn").on("click", function(){
  var parInfo = {
    parkName: $(this).attr('id'),
    address: address,
    }
 // console.log(parkName)

//this code retrieves a snapshot once as opposed to any time a 'value' is changed in the database
        database.ref().once("value", function(snapshot) {
          console.log(snapshot.child('Park-Objects'))

            if (snapshot.child('Park-Objects') == null ) {
              console.log("the testing child does NOT exists so let's create a new Park-Objects object")
              //The line below was taken out because the main 'Park-Obs' object already exists in FB
              //And keeping this line would create a new Park-Objs object everytime the button
              //is clicked.....
            // firebaseRef.push().set("Park-Objects")
              firebaseRef.set('Park-Objects')

              } else {
              //firebaseRef.child('Park-Objects').push(parkName)
              console.log("the testing child exists")
              }

              //Then if the object's 'comments' child exists then 
                //retrieve and display it's informatio
             if ( frbParkObjsRef){
                  console.log("this works")
                  var parkName = $(this).attr('id')
                  var addedComment = {comments: comment}
                  frbParkObjsRef.push('parkName:parkInfo')
      
                  //Then if the object's 'comments' child does NOT exists 
                  //then create the info, retrieve and display it's information
                } else {
      
                }
        })
    })

    //on document ready retrieve and display any comments that exists in this Objects
    //Firebase object

    // $(document)
    //       if ( firebaseRef.child('Park-Objects/LFx0MMCO5FGj0JmzrWq')){
    //         firebaseRef.child('Park-Objects/LFx0MMCO5FGj0JmzrWq').push(comment)

    //         //Then if the object's 'comments' child does NOT exists 
    //         //then create the info, retrieve and display it's information
    //       } else {

    //       }


