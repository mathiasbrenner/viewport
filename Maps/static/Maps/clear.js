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
	$.ajax({
		url:            "https://www.googleapis.com/fusiontables/v2/query?sql=DELETE+FROM+"+window.TABLEID+"&key="+window.APIKEY,
		type:           "POST",
		complete:       function(response) {
					if (response.responseJSON.error.code) 
						loaderError("FusionTableError: "+response.responseJSON.error.erros[0].message);
				}
		});
	}
}
