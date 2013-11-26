function findPlaces() 
{
	$.getJSON("https://api.foursquare.com/v2/venues/search?client_id="+CLIENT_ID_+"&client_secret="+CLIENT_SECRET+"&ll="+lat+","+lng+"&query=wine store&limit=25", function(data) {
		
		if (data.meta.code == 200) {

			$(venues.groups).each(function(i, group_items) {

				$(group_items.items).each(function(q, venue_items) {

					var venue_name = venue_items.venue_name;

					var latlng = new google.maps.LatLng(venue_items.location.lat, venue_items.location.lng);

					var marker = new google.maps.Marker({
					        position: latlng, 
					        map: map,
					});
						
					if (venue_items.categories.length == 0) {
						venue_image = "http://foursquare.com/img/categories/none_64.png"
					}
					else {

						$(venue_items.categories).each(function(o, cats) {
							if (cats.primary) {
								venue_image = cats.icon;
								return false;
							}
						})
					}

					if (venue_items.location.address && venue_items.location.city) {
						venue_info_city = '<div style="font-size: 12px;">'+venue_items.location.address+'</div><div style="font-size: 12px;">'+venue_items.location.city+", "+venue_items.location.state+"</div>";
					}
					else {
						venue_info_city = "";
					}

					var html = "<span class='venue_image' style='float: left; margin-right: 10px;'><img src='"+venue_image+"'></span><div>"+venue_items.name+"</div>"+venue_info_city;

					   	google.maps.event.addListener(marker, 'click', function() {

						getInfoWindowEvent(marker, html);

					   });

				});
			});
			
			google.maps.event.trigger(map, 'resize');
		}	
	});
}
