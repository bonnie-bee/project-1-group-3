
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: { lat: -34.397, lng: 150.644 }
    });
};
//on click function for search button that generates results on left, map on right
$("#searchBtn").on("click", function (event) {
    event.preventDefault();
    // showDiv();
    console.log("Test1");
})

function showDiv() {
    $("#resultsDiv").show();
}

function initAutocomplete() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -33.91063, lng: 151.15646 },
        zoom: 12,
        mapTypeId: 'roadmap'

    });
    var geocoder = new google.maps.Geocoder();


    //ajax function that allows google API to work
    jQuery.ajaxPrefilter(function (options) {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    });

   //set global variables 
        var parkNames;
        var placeAddress;
        var parkId;
        var moreResults = 5;
        var resultsLength;
        //setting default location of map
        var mapLat = 29.76;
        var mapLon = -95.36;
        var zoomIndex = 10;
        // submit function
        $('#submit').on('click', function (event) {
            moreResults = 5;
            runSearch()

             
        })

        function runSearch(){
        event.preventDefault();
        zoomIndex = 10;
        // empty out the set of previous icons
        $('#icon').empty();
        //set up the ajax query for the weather api
        const zip = $('#zip').val()
        console.log(zip)
        const appId = 'f767baa5bb1442ef781f01bc48fa0bec';
        const queryUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=imperial&appid=${appId}`;
        // let lat = "";
        // let lon = "";
        $.ajax({
            url: queryUrl,
            method: 'GET'
        }).then(function (response) {
            console.log(response)
            // create the url for the icons and set the sunset time to readable
            let iconUrl0 = `http://openweathermap.org/img/w/${response.weather[0].icon}.png`
            // let iconUrl1 = `http://openweathermap.org/img/w/${response.weather[1].icon}.png`
            //if multiple arrays show both options otherwise pull just the first one
            let sunset = moment.unix(response.sys.sunset).format('h:mm')
            let lat = response.coord.lat;
            let lon = response.coord.lon;
            $('#icon').empty();
            //grab the weather info and put it in the widget
            const temp = $('#temperature').text(`${Math.round(response.main.temp)}°`)
            const type = $('#weatherType').text(`Now there's ${response.weather[0].description} with ${response.main.humidity}% humidity`)
            const icon = $('#icon').append($(`<img src=${iconUrl0}>`).attr('alt', 'weather icon'));
            const sun = $('#sunset').text(`Today the sun sets at ${sunset}`)
            $('.weatherWidget').attr('style', 'display: none');
            // $('.weather').append(temp, type, icon0, icon1, sun)
            console.log(lat)
            mapLat = lat;
            console.log(lon)
            mapLon = lon;
            const newQueryUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&type=park&rankby=distance&key=AIzaSyCGu6b-LXj6XspTe1FS8sNEJMqVZC7PcKo`
            //ajax call to recieve data for places for list
            $.ajax({
                 url: newQueryUrl,
                 method: 'GET'
             }).then(function (response) {
                resultsLength = response.results.length
                console.log(response)
                $('#list').empty()
            //for loop to create list of divs for parks
                for (i=0; i<moreResults ; i++){
                var placesDiv = $("<div class = 'placesdiv'>")
                placesDiv.attr({'id':'place'+ i, 'class': 'placesBox', 'data-name': i})
                placesDiv.html('<p3><b>' +response.results[i].name+ '<b></p3>'  + "<br>")
                if (response.results[i].rating){
                    placesDiv.append('<span>' + "Google Rating: " + response.results[i].rating + '/5</span>')
                }
                $('#list').append(placesDiv)
                console.log(response.results[i].name)
                parkNames = response

                }
        //Checks if list has been expanded to append more choices button
            if (moreResults===5){
            
                $('#list').append('<br>' + '<button type="button" class="btn btn-outline-success btn-lg btn-block loadMore">Load More...</button>' + '<br>')
                initMap();
            }


            })
        })

        //listener for Back button to main list
        $(document).on("click", ".submit2", function(event){
            runSearch()
        })
        //listener ro load more results
        $(document).on("click", ".loadMore", function(event){
            moreResults = resultsLength;
            runSearch()
        })
    

    
    //sets listener for list of parks to open details page for specific park
    
        $(document).on('click', ".placesBox", function(event){
                $('#list').empty()
                
                var choice = $(event.currentTarget).data('name')
                parkId = parkNames.results[choice].place_id;
                console.log(parkId)
                console.log(choice)
                var placeDetails = $("<div class = 'placeDetails'>")
                placeDetails.html('<p4>' +parkNames.results[choice].name+ '</p4>' + '<br>')
                //Notify if park is open or close if data available
                if (parkNames.results[choice].opening_hours){
                    if (parkNames.results[choice].opening_hours.open_now === true){
                        placeDetails.append('<p5>Open</p5>' + '<br>')
                    }
                    else {
                        placeDetails.append('<p6>Closed</p6>' + '<br>')
                    }
                }
                
                //ajax call to recieve formatted address
                const newQueryUrl2 = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${parkId}&key=AIzaSyCGu6b-LXj6XspTe1FS8sNEJMqVZC7PcKo`
                $.ajax({
                url: newQueryUrl2,
                method: 'GET'
                }).then(function(response2) { 
                    placeDetails.append('<p7>Address: ' +response2.result.formatted_address+ '</p7>' + '<br>');
                });

                //if a rating exists appends rating info
                if (parkNames.results[choice].rating){
                        placeDetails.append('<p7>' + "Google Rating: " + parkNames.results[choice].rating + '/5</p7>' + '<br>')
                }
                $('#list').append(placeDetails)
                $('#list').prepend('<button type="button" class="btn btn-outline-success btn-lg btn-block submit2">Back to results</button>' + "<br>")
                //setting new marker for specific park
                mapLat = parkNames.results[choice].geometry.location.lat
                mapLon = parkNames.results[choice].geometry.location.lng
                zoomIndex = 14.5;
                initMap()
                $('.weatherWidget').attr('style', 'display: initial');
                }) 
            }
        


//function to update markers on the map
        function initMap() {
        // The location of Uluru
        var uluru = { lat: mapLat, lng: mapLon };
        //console.log(mapLat)
        // The map, centered at Uluru
        var map = new google.maps.Map(
        document.getElementById('map'), {zoom: zoomIndex, center: uluru});
        // The marker, positioned at Uluru
        var marker = new google.maps.Marker({ position: uluru, map: map });
    }
}