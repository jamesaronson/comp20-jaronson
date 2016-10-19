function init() {

	var map = new google.maps.Map(document.getElementById("map"), {
		zoom: 12,
		center: {lat: 42.33. lng: -71.1}
	});
};
/*
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
		]

		var station_icon ="station.jpg"

		var station_markers = locations.map(function(location, i) {
			return new google.maps.Marker({
				position: location,
				title: station_names[i % station_names.length],
				icon: station_icon,
				map: map
			});
		});

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
		]; */
//};