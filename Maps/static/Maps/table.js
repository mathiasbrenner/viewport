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

function onGapiLoad() {
	loaderON("Authenticating...");
        gapi.client.setApiKey(window.APIKEY);
	gapi.auth.authorize({
		client_id:	window.CLIENTID,	
		immediate:	true,
		scope:		window.SCOPES,
	},onAuthentication);
}

window.ACCESS_TOKEN = null;
function onAuthentication(e) {
	if (e.access_token) {
		window.ACCESS_TOKEN = e.access_token;
		resetLoader();
	} else { 
		loaderError("GoogleLoginError: Not authenticated!");
	}
}

function isAuthenticated() {
	return window.ACCESS_TOKEN != null;
}
