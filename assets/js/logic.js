
//ajax function that allows google API to work
jQuery.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
    });


        var parkNames;
        var placeAddress;
        var parkId;
        //setting default location of map
        var mapLat = 50;
        var mapLon = 50;
        // submit function
        $('#submit').on('click', function (event) {
            event.preventDefault();
            // empty out the set of previous icons
            $('#icon').empty();
            //set up the ajax query for the weather api
            const $zip = $('#zip').val()
            console.log($zip)
            const appId = 'f767baa5bb1442ef781f01bc48fa0bec';
            const queryUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${$zip}&units=imperial&appid=${appId}`;
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
                //grab the weather info and put it in the widget
                const temp = $('#temperature').text(`${Math.round(response.main.temp)}°`)
                const type = $('#weatherType').text(`Right now there's ${response.weather[0].description} with ${response.main.humidity}% humidity`)
                const icon = $('#icon').append($(`<img src=${iconUrl0}>`).attr('alt', 'weather icon'));
                const sun = $('#sunset').text(`The sun will set at ${sunset}`)
                // $('.weather').append(temp, type, icon0, icon1, sun)
                console.log(lat)
                mapLat = lat;
                console.log(lon)
                mapLon = lon;
                const newQueryUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&type=park&rankby=distance&key=AIzaSyCGu6b-LXj6XspTe1FS8sNEJMqVZC7PcKo`
                
                $.ajax({
                     url: newQueryUrl,
                     method: 'GET'
                 }).then(function (response) {
                    console.log(response)
                    $('#list').empty()
                    for (i=0; i<response.results.length; i++){
                    var placesDiv = $("<div class = 'placesdiv'>")
                    placesDiv.attr({'id':'place'+ i, 'class': 'placesBox', 'data-name': i})
                    placesDiv.html('<p3><b>' +response.results[i].name+ '<b></p3>'  + "<br>")
                    if (response.results[i].rating){
                        placesDiv.append('<span>' + "Google Rating: " + response.results[i].rating + '</span>')
                    }
                    $('#list').append(placesDiv)
                    console.log(response.results[i].name)
                    parkNames = response

                    }
                
                initMap();

                })
            })

            
            
            

        

        
            $(document).on('click', ".placesBox", function(event){
                    console.log(parkNames)
                    $('#list').empty()
                    var choice = $(event.currentTarget).data('name')
                    parkId = parkNames.results[choice].place_id;
                    console.log(parkId)
                    console.log(choice)
                    var placeDetails = $("<div class = 'placeDetails'>")
                    placeDetails.html('<p4><b>' +parkNames.results[choice].name+ '<b></p4>' + '<br>')
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

                    
                    if (parkNames.results[choice].rating){
                            placeDetails.append('<p7>' + "Google Rating: " + parkNames.results[choice].rating + '</p7>' + '<br>')
                    }
                    $('#list').append(placeDetails)
                    //setting new marker for specific park
                    mapLat = parkNames.results[choice].geometry.location.lat
                    mapLon = parkNames.results[choice].geometry.location.lng
                    initMap()
                    })

             
        })
        function initMap() {
        // The location of Uluru
        var uluru = {lat: mapLat, lng: mapLon};
        //console.log(mapLat)
        // The map, centered at Uluru
        var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 7, center: uluru});
        // The marker, positioned at Uluru
        var marker = new google.maps.Marker({position: uluru, map: map});
        }