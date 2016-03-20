function deleteAll() {
	if (confirm("Are you sure?")) {
		loaderON("Deleting database...");
		deleteFromDatabase();
		deleteFromFusionTable();
	}
}

function deleteFromDatabase() {
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
					loaderON("Reading response from server...");
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

function deleteFromFusionTable() {
	if (isAuthenticated()) {
        	gapi.client.request({
               		path:   "/fusiontables/v2/query",
                	method: "POST",
                	params: {
                        	sql: "DELETE FROM "+window.TABLEID,
                	}
        		}).then(function(resp) {
				resetLoader();
        		}, function(reason) {
                		loaderError("GoogleAPIError while clearing the database: "+reason.result.error.message);
        		});
	} else { 
                alert ("Please login to google account by refreshing this page!");
	}
};

