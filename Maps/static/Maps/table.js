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
