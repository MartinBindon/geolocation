function successPosition(position) {
	lat = position.coords.latitude;
	lng = position.coords.longitude;

	var latlng = new google.maps.LatLng(lat, lng);
	var myOptions = {
	    zoom: 13,
	    center: latlng,
	    mapTypeControl: false,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	  };
	

	map = new google.maps.Map(document.getElementById("map"), myOptions);

	// Adding the Maker
	var marker = new google.maps.Marker({
	        position: latlng, 
	        map: map,
	});

		// Adding a click event on the marker.
	google.maps.event.addListener(marker, 'click', function() {
		getInfoWindowEvent(marker, "Hello!");

	});

	// Search for places using the Foursquare API
	findPlaces();

	// This is not in the book - this is another easy method of making your map expand based on the size of the window
	google.maps.event.trigger(map, 'resize');	
}

function errorPosition(error) {
	console.log(error);
	switch (error.code) {
		case 0:
			message = "Something went wrong: " + error.message;
			break;
		case 1:
			message = "You denied permission to this page to retrieve a location.";
			break;
		case 2:
			message = "The browser was unable to determine a location: " + error.message;
			break;
		case 3:
		message = "The browser timed out before retrieving the location.";
		break;
	}

	alert(message);
}

// Info Box Function!
function getInfoWindowEvent(marker, text) {
    infowindow.close()
    infowindow.setContent(text);
    infowindow.open(map, marker);
}

// Refresh Location 
function refreshLocation() {
	navigator.geolocation.getCurrentPosition(successPosition, errorPosition);
}
