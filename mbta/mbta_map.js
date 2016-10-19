var myLat = 42.33;
var myLng = -71.1;
var request = new XMLHttpRequest();
var myCoord= new google.maps.LatLng(myLat, myLng);
var myOptions = {
		zoom:13,
		center: myCoord
	};
var map;
var marker;


function init() {

	map = new google.maps.Map(document.getElementById("map"), myOptions)
	//myLocation();
	addStations();
	newMarker(myCoord, "me"); //checked to see if newMarker was working
};

function newMarker(location, name){

	var infowindow = new google.maps.InfoWindow();

	myCoord= new google.maps.LatLng(myLat, myLng);
	map.panTo(myCoord);

	marker = new google.maps.Marker({

		position: location,
		title: name,
		map: map
		//icon: symbol
	});

	google.maps.event.addListener(marker, 'click', function(){
		infowindow.setContent(marker.title); //will be switched to the train data etc...
		infowindow.open(map, marker);
	});
};

/*function myLocation(){	

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			myLat = position.coords.latitude;
			myLng = position.coords.longitude;
			newMarker({lat: myLat, lng: myLng},"My Location"); //not sure if this will work

		});
	}

	else {
		alert("Your browser does not support navigator.geolocation")
	}

};*/

function addStations(){

	var station_names = [
		"South Station",
		"Andrew",
		"Porter Square",
		"Harvard Square",
		"JFK/UMass",
		"Savin Hill",
		"Park Street",
		"Broadway",
		"North Quincy",
		"Shawmut",
		"Davis",
		"Alewife",
		"Kendall/MIT",
		"Charles/MGH",
		"Downtown Crossing",
		"Quincy Center",
		"Quincy Adams",
		"Ashmont",
		"Wollaston",
		"Fields Corner",
		"Central Square",
		"Braintree"
		];

		var station_icon= {
			url: "station.png",
			scaledSize: new google.maps.Size(30,30)
		};

	var locations = [
		{lat: 42.352271, lng: -71.05524200000001},
		{lat: 42.330154, lng: -71.057655},
		{lat: 42.3884, lng: -71.11914899999999},
		{lat: 42.373362, lng: -71.118956},
		{lat: 42.320685, lng: -71.052391},
		{lat: 42.31129, lng: -71.053331},
		{lat: 42.35639457, lng: -71.0624242},
		{lat: 42.342622, lng: -71.056967},
		{lat: 42.275275, lng: -71.029583},
		{lat: 42.29312583, lng: -71.06573796000001},
		{lat: 42.39674, lng: -71.121815},
		{lat: 42.395428, lng: -71.142483},
		{lat: 42.36249079, lng: -71.08617653},
		{lat: 42.361166, lng: -71.070628},
		{lat: 42.355518, lng: -71.060225},
		{lat: 42.251809, lng: -71.005409},
		{lat: 42.233391, lng: -71.007153},
		{lat: 42.284652, lng: -71.06448899999999},
		{lat: 42.2665139, lng: -71.0203369},
		{lat: 42.300093, lng: -71.061667},
		{lat: 42.365486, lng: -71.103802},
		{lat: 42.2078543, lng: -71.0011385}
		];

	marker = locations.map(function(location, i) {
		return new google.maps.Marker({
			position: location,
			title: station_names[i % station_names.length],
			icon: station_icon,
			map: map
		});
	});		

	/*for (var i=0; i < station_names.length; i++){

		var pos = location[i];
		var name = station_names[i];

		newMarker(pos, name);
	};*/
};
//};