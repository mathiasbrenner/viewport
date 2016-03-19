window.APIKEY = "AIzaSyD0zgG3GeK6rLVVWVBG1BuVIENwEyA4fM8";

function resetLoader() {
	loaderInfo("Click on the map to add an address to the table below!");
}

$(window).on("load",function(){ 
	$("#map").height($(window).height()/2)
	loadTableFromDatabase();
	loadScript('http://maps.googleapis.com/maps/api/js?v=3&callback=startMap&key='+window.APIKEY);
});

function startMap() { 
	loaderON("Loading MAP...");
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
	window.MARKER = new google.maps.Marker(); 
    	window.MARKER.setAnimation(google.maps.Animation.DROP);
	window.GEOCODER = new google.maps.Geocoder();
	loaderON("Loading your location...");
	if (navigator.geolocation) 
        	navigator.geolocation.getCurrentPosition(function(position) {
			var x = position.coords.latitude;
			var y = position.coords.longitude;
			window.MAP.panTo(new google.maps.LatLng(x,y));
			resetLoader();
			window.MAP.addListener('click',onMapClick);
		});
	else {
		loaderError("HTML5 position not supported.");
		window.MAP.panTo(new google.maps.LatLng(0,0));
		window.MAP.addListener('click',onMapClick);
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
					saveAddressToDatabase({ 
						x:		x,	
						y:		y,	
						address:	address,
					});
					resetLoader();
				}
			} else {
				loaderError("Not a valid address!");
			}
		} else { 
			if (status == "ZERO_RESULTS") 
				loaderError("No address found!");
			else if (status == "OVER_QUERY_LIMIT") 
				loaderError("You are going too fast! Google Geocoder does not allow it!");
			else
				loaderError("UncaughtError! "+status);
		}
	}); 
}

function saveAddressToDatabase(data) {
	loaderON("Saving address...");
	data.csrftoken = getCookie('csrftoken');
        $.ajax({
                url:            "/Maps/api/marker/",
                data:           JSON.stringify(data),
                type:           "POST",
                contentType:    "application/json",
                dataType:       'json',
                beforeSend:     function(xhr) {
                                        xhr.setRequestHeader("X-CSRFToken", data.csrftoken);
                                },
                complete:       function(response) {
                                        if (response.status>=200 && response.status<300) {
						createTableRow(response.responseJSON);
						var counter = parseInt($("#total_entries").html());
						$("#total_entries").html(counter+1);
						resetLoader();
					} else {
						loaderError(response.statusText);
                                        }
                                }
	});
}

function createTableRow(data) { 
	var tr 	= document.createElement("tr");	
	var td1 = document.createElement("td");	
	var td2 = document.createElement("td");	
	var td3 = document.createElement("td");	
	var td4 = document.createElement("td");	
	td1.innerHTML = data.date;
	td2.innerHTML = data.x;
	td3.innerHTML = data.y;
	td4.innerHTML = data.address;
	td4.setAttribute("colspan",5);
	$(tr).html([td1,td2,td3,td4]);
	$("#address_book tbody").prepend(tr);
}

function loadTableFromDatabase() {
	loaderON("Loading database...");
	var data = {}; 
	data.csrftoken = getCookie('csrftoken');
        $.ajax({
                url:            "/Maps/api/marker/",
                data:           JSON.stringify(data),
                type:           "GET",
                contentType:    "application/json",
                dataType:       'json',
                beforeSend:     function(xhr) {
                                        xhr.setRequestHeader("X-CSRFToken", data.csrftoken);
                                },
                complete:       function(response) {
                                        if (response.status>=200 && response.status<300) {
						for (var row of response.responseJSON.objects) { 
							createTableRow(row);
						}
					} else {
						loaderError(response.statusText);
                                        }
                                }
	});
}

function deleteAllFromDatabase() {
	if (confirm("Are you sure?")) {
		loaderON("Deleting database...");
		var data = {};
		data.csrftoken = getCookie('csrftoken');
		$.ajax({
			url:            "/Maps/api/marker/",
			data:           JSON.stringify(data),
			type:           "DELETE",
			contentType:    "application/json",
			dataType:       'json',
			beforeSend:     function(xhr) {
						xhr.setRequestHeader("X-CSRFToken", data.csrftoken);
					},
			complete:       function(response) {
						if (response.status>=200 && response.status<300) {
							$("#address_book tbody tr").remove();
							$("#total_entries").html(0);
							resetLoader();
						} else {
							loaderError(response.statusText);
						}
					}
		});
	}
}
