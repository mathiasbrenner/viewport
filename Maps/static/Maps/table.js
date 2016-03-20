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
                beforeSend:     function(xhr) { xhr.setRequestHeader("X-CSRFToken", data.csrftoken); },
                complete:       function(response) {
                                        if (response.status>=200 && response.status<300) {
						for (var row of response.responseJSON.objects) { 
							createTableRow(row);
						}
					} else {
						loaderError(response.statusText);
                                        }
                                } /* complete */ 
	}); /* AJAX */ 
}

function deleteAll() {
        if (window.TABLEID && isAuthenticated()) {
		if (confirm("Are you sure?")) {
			deleteDatabase();
			deleteFusionTable();
		} /* confirm */
	} /* isAuthenticated */
	else {
		loaderError("Unauthorized.");
                alert ("Please login to google account!");
		location.reload();
	}
}

function deleteDatabase() {
	loaderON("Deleting database...");
	var data = {};
	data.csrftoken = getCookie('csrftoken');
	$.ajax({
		url:            "/Maps/api/marker/",
		data:           JSON.stringify(data),
		type:           "DELETE",
		contentType:    "application/json",
		dataType:       'json',
		beforeSend:     function(xhr) { xhr.setRequestHeader("X-CSRFToken", data.csrftoken); },
		complete:       function(response) {
					loaderON("Reading response from server...");
					if (response.status>=200 && response.status<300) {
						$("#address_book tbody tr").remove();
						$("#total_entries").html(0);
						resetLoader();
					} else {
						loaderError(response.statusText);
					}
				} /* complete */
	}); /* AJAX */
}

function deleteFusionTable() {
	loaderON("Deleting from Google Fusion Table...");
	gapi.client.request({
		path:   "/fusiontables/v2/query",
		method: "POST",
		params: { sql: "DELETE FROM "+window.TABLEID, }
	}).then(function(resp) {
		resetLoader();
	}, function(reason) {
		loaderError("GoogleAPIError: "+reason.result.error.message);
	});
}

function saveData(data) { 
        if (window.TABLEID && isAuthenticated()) {
		saveDatabase();
	} /* isAuthenticated */ 
	else {
		loaderError("Unauthorized.");
                alert ("Please login to google account!");
		location.reload();
	}
}

function saveDatabase(data) { 
	loaderON("Saving address...");
	data.csrftoken = getCookie('csrftoken');
	$.ajax({
		url:            "/Maps/api/marker/",
		data:           JSON.stringify(data),
		type:           "POST",
		contentType:    "application/json",
		dataType:       'json',
		beforeSend:     function(xhr) { xhr.setRequestHeader("X-CSRFToken", data.csrftoken); },
		complete:       function(response) {
					loaderON("Reading response from server");
					if (response.status>=200 && response.status<300) {
						createTableRow(response.responseJSON);
						var counter = parseInt($("#total_entries").html());
						$("#total_entries").html(counter+1);
						saveFusionTable(data);
					} else if (response.status==500) { 
						loaderError(response.responseJSON.error_message);
					} else {
						loaderError(response.statusText);
					}
				} /* complete */
	}); /* AJAX */
}

function saveFusionTable(data) { 
	loaderON("Saving to Google Fusion Table...");
	var q = "INSERT INTO "+window.TABLEID+" (x,y,address,Date,location) VALUES ";
	q += "("+data.x+","+data.y+",'"+data.address+"','"+new Date()+"','"+data.x+" "+data.y+"')";
	gapi.client.request({
		path:   "/fusiontables/v2/query",
		method: "POST",
		params: { sql: q, }
	}).then(function(resp) {
		resetLoader();
	}, function(reason) {
		loaderError("GoogleAPIError while creating marker: "+reason.result.error.message);
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
