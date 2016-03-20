function saveDataToDatabase(data) {
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
					} else if (response.status==500) { 
						loaderError(response.responseJSON.error_message);
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
