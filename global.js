/* Global Config */

/* System Variables */

var map;
var db;
var lat;
var lng;
var infowindow = new google.maps.InfoWindow();

/*** IMPORTANT: CHANGE THESE TO YOUR CLIENT_ID AND CLIENT_SECRET ****/
var CLIENT_ID = "";
var CLIENT_SECRET = "";

$(document).ready(function(){

	/* Map Fix */

	newHash = window.location.hash.substring(1);
	
	if (newHash == "find") {
		if ($.trim($("#map").html()) == "") {
			navigator.geolocation.getCurrentPosition(successPosition, errorPosition);
		}
	}
		
	db = openDatabase('myCorks', '1.0', 'My Corks Database', 2 * 1024 * 1024);
	
	
	db.transaction(function (tx) {
		tx.executeSql("CREATE TABLE IF NOT EXISTS wines (wine_id INTEGER PRIMARY KEY AUTOINCREMENT, wine_name, wine_description, wine_abv, winery_id, color_id, created_at DATETIME)", null, sR, fR);
		tx.executeSql("CREATE TABLE IF NOT EXISTS winery (winery_id INTEGER PRIMARY KEY AUTOINCREMENT, winery_name, created_at DATETIME)", null, sR, fR);
		tx.executeSql('CREATE TABLE IF NOT EXISTS color (color_id INTEGER PRIMARY KEY AUTOINCREMENT, color_name, created_at DATETIME)', null, sR, fR);
		tx.executeSql('CREATE TABLE IF NOT EXISTS activity (activity_id INTEGER PRIMARY KEY AUTOINCREMENT, wine_id, activity_note, activity_quantity, created_at DATETIME)', null, sR, fR);
	});
	
	db.transaction(function (tx) {
		tx.executeSql("SELECT * from color where color_name = ?", ['Red'],
		function(tx, res) {
			if (res.rows.length == 0) {
				
				var start = new Date().getTime();
				
				tx.executeSql("INSERT INTO color (color_name, created_at) VALUES('White', ?)", [start], null, fR);
				tx.executeSql("INSERT INTO color (color_name, created_at) VALUES('Red', ?)", [start], null, fR);
				tx.executeSql("INSERT INTO color (color_name, created_at) VALUES('Other', ?)", [start], null, fR);
	
				get_color();
			}
			else
			{	
				get_color();
			}
		},
		fR);
	});
	
});

function sR(a,b){

	// The query was successfully!
}

function fR(a,b){
	// Oops! There was an issue let's alert it the user.
	
	alert(b.message);
}
