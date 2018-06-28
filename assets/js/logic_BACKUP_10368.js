<<<<<<< HEAD
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: {lat: -34.397, lng: 150.644}
=======
//on click function for search button that generates results on left, map on right
$("#searchBtn").on("click", function(event) {
event.preventDefault();
// showDiv();
console.log("Test1");
})

function showDiv() {
    $("#resultsDiv").show();
}

function initAutocomplete() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -33.91063, lng: 151.15646},
      zoom: 12,
      mapTypeId: 'roadmap'
>>>>>>> weatherWidget
    });
    var geocoder = new google.maps.Geocoder();

    document.getElementById('searchBtn').addEventListener('click', function(event) {
        event.preventDefault();
      geocodeAddress(geocoder, map);
    });
  }

  function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('search-input').value;
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }