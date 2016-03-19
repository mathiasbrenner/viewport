window.OATHID = "102070515856-j5v2vcn40tmruviooice86hgt1nupibc.apps.googleusercontent.com";
window.APIKEY = "AIzaSyD0zgG3GeK6rLVVWVBG1BuVIENwEyA4fM8";
window.SAPI   = "AIzaSyCer7N7KNHEfLQYdDS3gnRog2snhtsG7Z0";
window.TABLE  = "1CoaFZodTJ1zEilJAN3M5KmHs316fGwAx5pt1vjqA";

function resetLoader() {
	loaderInfo("Click on map to vefiry location!");
}

$(window).on("load",function(){ 
	loaderON("Loading map...");
	$("#map").height($(window).height()/2)
	loadScript('http://maps.googleapis.com/maps/api/js?v=3&callback=startMap&key='+window.APIKEY);
});

function startMap() { 
	var style = [
       		{ stylers: [ { hue: "#337ab7" }, { saturation: -20 }, { weight: 3 } ] },
        	{ featureType: "road", elementType: "geometry", stylers: [ { visibility:"simplified" }, { lightness:100 }, ] },
        	{ featureType: "road", elementType: "labels",   stylers: [ { visibility:"off"         } ] },
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
	window.GEOCODER = new google.maps.Geocoder();
	loadMyLocation();
	resetLoader();
}

function loadMyLocation() {
	loaderON("Loading your location...");
	if (navigator.geolocation) 
        	navigator.geolocation.getCurrentPosition(function(position) {
			var x = position.coords.latitude;
			var y = position.coords.longitude;
			window.MAP.panTo(new google.maps.LatLng(x,y));
			resetLoader();
		});
	else {
		loaderError("HTML5 position not supported.");
		window.MAP.panTo(new google.maps.LatLng(0,0));
	}
};

function onMapClick(e) {
	loaderON("Loading address...");
	var x = e.latLng.lat();
	var y = e.latLng.lng();
	window.MARKER.setPosition(new google.maps.LatLng(x,y));
	window.MARKER.setMap(window.MAP);
	window.GEOCODER.geocode( {'latLng': window.MARKER.getPosition()}, function(results, status) {
		if(status == google.maps.GeocoderStatus.OK) {
			if(results[4]) {
				var address 	= results[0].formatted_address;
				var x		= results[0].geometry.location.lat();
				var y		= results[0].geometry.location.lng();
				if (address.indexOf("Unnamed Road")>-1 ) { 
					loaderError("It is only a road!");
				} else { 
					saveAddressToDatabase(x,y,address);
					resetLoader();
				}
			} else {
				loaderError("Not a valid address!");
			}
		} else { 
			if (status == "ZERO_RESULTS") 
				loaderError("No address found!");
			else
				loaderError("UncaughtError! "+status);
		}
	}); 
}

function saveAddressToDatabase(x,y,addr) {
}

function createTableRow(date,x,y,addr) { 
	var tr 	= document.createElement("tr");	
	var td1 = document.createElement("td");	
	var td2 = document.createElement("td");	
	var td3 = document.createElement("td");	
	var td4 = document.createElement("td");	
	td1.innerHTML = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
	td2.innerHTML = x;
	td3.innerHTML = y;
	td4.innerHTML = addr;
	td4.setAttribute("colspan",5);
	$(tr).html([td1,td2,td3,td4]);
	$("#address_book tbody").prepend(tr);
}
