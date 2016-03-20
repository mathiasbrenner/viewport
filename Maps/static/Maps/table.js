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

function initAPI() {
	gapi.client.setApiKey(window.APIKEY);
	window.setTimeout(checkAuth,1);
}

function checkAuth() {
	gapi.auth.authorize({
		client_id: 	window.CLIENTID, 
		scope: 		window.SCOPES,
		immediate: 	true
	}, handleAuthResult);
}

function handleAuthResult(authResult) {
	console.log(authResult);
	if (authResult.error) 
		loaderError("GoogleAuthError: "+authResult.error_subtype);
	else if (authResult.status.google_logged_in) 
		loaderError("GoogleAuthError: Not logged in to Google!");
}
