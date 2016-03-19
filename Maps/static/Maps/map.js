$(window).on("load",function(){ 
	$("#map").height($(window).height())
	loadScript('http://maps.googleapis.com/maps/api/js?v=3&callback=startMap&key=AIzaSyD0zgG3GeK6rLVVWVBG1BuVIENwEyA4fM8&callbak');
});

function startMap() { 
	console.log("Loading map...");
	var style = [
       		{ stylers: [ { hue: "#337ab7" }, { saturation: -20 }, { weight: 3 } ] },
        	{ featureType: "road", elementType: "geometry", stylers: [ { visibility:"simplified" }, { lightness:100 }, ] },
        	{ featureType: "road", elementType: "labels",   stylers: [ { visibility:"on"         } ] },
        	{ featureType: "poi",  elementType: "labels",   stylers: [ { visibility:"off"        } ] }
	];
	var mapCanvas  = document.getElementById('map');
	var mapOptions = {
        	center:                 new google.maps.LatLng(0,0),
        	zoom:                   13,
        	mapTypeControlOptions:  { mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'myStyle'] },
        	navigationControl:      false,
        	disableDefaultUI:       true,
        	scaleControl:           false,
        	streetViewControl:      false,
        	zoomControl:            false,
        	scrollwheel:            true,
	}
	window.MAP = new google.maps.Map(mapCanvas, mapOptions);
	window.MAP.mapTypes.set('myStyle', new google.maps.StyledMapType(style, {name: "MyStyle"}) );
	window.MAP.setMapTypeId('myStyle');
	window.MAP.addListener('click',onMapClick);
	window.MARKER = new google.maps.Marker(); 
    	window.MARKER.setAnimation(google.maps.Animation.DROP);
	console.log("Loading user position...");
	if (navigator.geolocation) 
        	navigator.geolocation.getCurrentPosition(function(position) {
			console.log("HTML5 supported!")
			var x = position.coords.latitude;
			var y = position.coords.longitude;
			updateMyPosition(x,y);
		});
	else {
		console.log("HTML5 position not supported.");
		updateMyPosition(0,0);
	}
};

function updateMyPosition(x,y) {
	console.log("User position is "+x+" "+y);
	window.MAP.panTo(new google.maps.LatLng(x,y));
}

function onMapClick(e) {
	var x = e.latLng.lat();
	var y = e.latLng.lng();
	console.log("Map clicked on "+x+" "+y+".");
	window.MARKER.setPosition(new google.maps.LatLng(x,y));
	window.MARKER.setMap(window.MAP);
	window.MAP.panTo(window.MARKER.getPosition());
}
