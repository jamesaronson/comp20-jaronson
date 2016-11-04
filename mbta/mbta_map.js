var myLat = 0;
var myLng = 0;
var request = new XMLHttpRequest();
var myCoord= new google.maps.LatLng(myLat, myLng);
var myOptions = {
		zoom:12,
		center: myCoord
	};
var map;
var marker;
var info;
var errorMSG;
var stat_code;
var station_names = [
		"Alewife",
		"Davis",
		"Porter Square",
		"Harvard Square",
		"Central Square",
		"Kendall/MIT",
		"Charles/MGH",
		"Park Street",
		"Downtown Crossing",
		"South Station",
		"Broadway",
		"Andrew",
		"JFK/UMass",
		"Savin Hill",
		"Fields Corner",
		"Shawmut",
		"Ashmont",
		"North Quincy",
		"Wollaston",
		"Quincy Center",
		"Quincy Adams",
		"Braintree"
		];
var locations = [
		{lat: 42.395428, lng: -71.142483},
		{lat: 42.39674, lng: -71.121815},
		{lat: 42.3884, lng: -71.11914899999999},
		{lat: 42.373362, lng: -71.118956},
		{lat: 42.365486, lng: -71.103802},
		{lat: 42.36249079, lng: -71.08617653},
		{lat: 42.361166, lng: -71.070628},
		{lat: 42.35639457, lng: -71.0624242},
		{lat: 42.355518, lng: -71.060225},
		{lat: 42.352271, lng: -71.05524200000001},
		{lat: 42.342622, lng: -71.056967},
		{lat: 42.330154, lng: -71.057655},
		{lat: 42.320685, lng: -71.052391},
		{lat: 42.31129, lng: -71.053331},
		{lat: 42.300093, lng: -71.061667},
		{lat: 42.29312583, lng: -71.06573796000001},
		{lat: 42.284652, lng: -71.06448899999999},
		{lat: 42.275275, lng: -71.029583},
		{lat: 42.2665139, lng: -71.0203369},
		{lat: 42.251809, lng: -71.005409},
		{lat: 42.233391, lng: -71.007153},
		{lat: 42.2078543, lng: -71.0011385}
		];

function init() {

	map = new google.maps.Map(document.getElementById("map"), myOptions)
	myLocation();
	addStations();
}

function myMarker(location, name){
//Places a marker at user location and finds the closest station	

	var closest;
	var infowindow = new google.maps.InfoWindow();

	myCoord= new google.maps.LatLng(myLat, myLng);
	map.panTo(myCoord);

	marker = new google.maps.Marker({
		position: location,
		title: name,
		map: map
	});

	closest = findClosest();

	google.maps.event.addListener(marker, 'click', function(){

		var string = '<div class = "title">' + marker.title + '</div>' + '<p><b>Closest Station: </b> '+ closest[0] + '</p>' + '<p><b>Distance: </b>' + closest[1] + ' miles</p>'; 
		infowindow.setContent(string); 
		infowindow.open(map, marker);
	});
}

function myLocation(){	
//find the user location-- adopted from the provided Geolocation sample	
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			myLat = position.coords.latitude;
 			myLng = position.coords.longitude;
 			myCoord= new google.maps.LatLng(myLat, myLng);
 			myMarker(myCoord, "Current Location");
		});
	}
	else {
		alert("Your browser does not support Geolocation")
	}
}

function addStations(){
// Adds stations and draws polylines connecting them	

	var station_icon= {
			url: "station.png",
			scaledSize: new google.maps.Size(30,30)
		};
	var infowindow = new google.maps.InfoWindow();
	var contents;
    var marker, i;

    //adds stations 
    for (i = 0; i < locations.length; i++) {  
    	marker = new google.maps.Marker({
        	position: locations[i],
        	title: station_names[i],
        	icon: station_icon,
        	content: info,
        	map: map
    	});

    	google.maps.event.addListener(marker, 'click', (function(marker, i) {       
       		return function() {
       			requestSchedule();
       			this.content = marker.title + '<br>' + info;

        		infowindow.setContent(this.content);
        		infowindow.open(map, this);
       		}
     	})(marker, i));
    }

	//draws the polylines connecting the stations	
	var patha = [];

	for (i=0; station_names[i]!= "North Quincy"; i++){
 		patha[i] = locations[i];
	}

	drawPolyline(patha,"#FF0000");

	var pathb = [];
	pathb[0] = locations[12];

	var i = 0;
	do {
		i++;
		pathb[i] = locations[i+16];
	} while (station_names[i+16] != "Braintree");

	drawPolyline(pathb,"#FF0000");
}

function findClosest(){
//determines which point is closest
	var p1 = locations[0];
	var name = station_names[0];

	var dist = haversine(p1);

	for (i=1; i<locations.length;i++){
		if (haversine(locations[i])< dist){
			p1 = locations[i];
			dist = haversine(p1);
			name = station_names[i];
		}
	}

	drawPolyline([p1, myCoord],"#230CF2");

	dist= Math.trunc(dist*100)/100;

	return [name,dist];
}

function drawPolyline(points,color){
//draws polyline between specified points and of the specified color

	var red_line = new google.maps.Polyline({
		path: points,
		geodesic: true,
		strokeColor: color,
		strokeWeight: 2.0

	});

	red_line.setMap(map);

}

// toRad() and haversine() were adopted from the stackoverflow solution provided
function toRad(x) {
   return x * Math.PI / 180;
}

function haversine(p){
// finds the distance between two Lat,Lng points
	var lat2 = p.lat; 
	var lon2 = p.lng; 
	var lat1 = myCoord.lat(); 
	var lon1 = myCoord.lng(); 

	var R = 6371; // km 
	var x1 = lat2-lat1;
	var dLat = toRad(x1);  
	var x2 = lon2-lon1;
	var dLon = toRad(x2);  
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
                Math.sin(dLon/2) * Math.sin(dLon/2);  
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c * 0.621371; //converts distance to miles

	return d;
}

function requestSchedule() {
//get JSON

	request = new XMLHttpRequest();
	request.open("get", "https://fathomless-thicket-84018.herokuapp.com/redline.json", true);
	request.onreadystatechange = getSchedule;
	request.send();

}

function getSchedule() {
//Parse JSON
	if (request.readyState == 4 && request.status == 200) {

		var theData = request.responseText;
		var container = JSON.parse(theData);
		stat_code = request.status;
		// I did not finish this. I would have set the global variable info = JSON.parse(theData). Then, in addStation() during the event that created the infowindow, I would call a function that either returns the errorMSG or searches through the JSON for the marker title and sets the content of the infowindow equal to a string concatination of the train destinations, and arrival times for that station.  
		info = "Sorry, the T is closed"
	}

	if (request.status != 200){

		info = "Problem loading schedule" + '<br>' + "Please reclick the marker";
		//would have my errorMSG = "Problem loading schedule" + '<br>' + "Please reclick the marker";
		stat_code = request.status;

	}
}