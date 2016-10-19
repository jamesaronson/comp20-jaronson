var myLat = 42.33;
var myLng = -71.1;
var request = new XMLHttpRequest();
var myCoord= new google.maps.LatLng(myLat, myLng);
var myOptions = {
		zoom:9,
		center: myCoord
	};
var map;
var marker;
var previous_window = false;
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
	//myLocation();
	addStations();
	myMarker(myCoord, "me"); //checked to see if newMarker was working
	//findClosest();
};

function myMarker(location, name){

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
		infowindow.setContent("Closest Station: " + closest); 
		infowindow.open(map, marker);
	});
};

/*function myLocation(){	
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			myLat = position.coords.latitude;
			myLng = position.coords.longitude;
			myMarker(myCoord, "My Location");
			//myMarker({lat: myLat, lng: myLng},"My Location"); //not sure if this will work
		});
	}
	else {
		alert("Your browser does not support navigator.geolocation")
	}
};*/

function addStations(){

	

		var station_icon= {
			url: "station.png",
			scaledSize: new google.maps.Size(30,30)
		};

	


	var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {  
      marker = new google.maps.Marker({
        position: locations[i],
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(station_names[i]);
          infowindow.open(map, marker);
        }
      })(marker, i));
     } ;

	//puts down a station marker for each station	
	/*marker = locations.map(function(location, i) {

		var infowindow = new google.maps.InfoWindow();

		return new google.maps.Marker({
			position: location,
			title: station_names[i % station_names.length],
			infowindow: station_names[i % station_names.length],
			icon: station_icon,
			map: map
		});
	});	*/	

	//draws the polylines connecting the stations	
	var patha = [];

	for (i=0; station_names[i]!= "North Quincy"; i++){
 		patha[i] = locations[i];
	};

	drawPolyline(patha,"#FF0000");

	var pathb = [];
	pathb[0] = locations[12];

	var i = 0;
	do {
		i++;
		pathb[i] = locations[i+16];
	} while (station_names[i+16] != "Braintree");

	drawPolyline(pathb,"#FF0000");
};

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
		};
	};
	drawPolyline([p1, myCoord],"#230CF2");

	return name;
};

function drawPolyline(points,color){
//draws polyline between specified points and of the specified color

	var red_line = new google.maps.Polyline({
		path: points,
		geodesic: true,
		strokeColor: color,
		strokeWeight: 2.0

	});

	red_line.setMap(map);

};

// toRad() and haversine() were adopted from the stackoverflow solution provided
function toRad(x) {
   return x * Math.PI / 180;
};

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
	var d = R * c; 
	return d;


};



//};