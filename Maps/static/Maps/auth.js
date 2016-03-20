window.APIKEY    = "AIzaSyCmBQxnV8pL3xQXCMvds_E_-f-RwOANJ-o";
window.CLIENTID  = "102070515856-svjrhp1l93pnj6tgln6bqiqb5avb2iui.apps.googleusercontent.com";
window.TABLENAME = "ViewPortTable MartinAlejandroCastroAlvarez Mar2016";
window.TABLEID   = null;
window.SECRET    = "SOtDsRqbzz3f4RkrojgUEl7z";
window.SCOPES    = [
                        "https://www.googleapis.com/auth/fusiontables.readonly",
                        "https://www.googleapis.com/auth/fusiontables"
                 ];

function resetLoader() {
	if (isAuthenticated()) 
        	loaderInfo("Click on the map to add an address to the table below!");
	else
        	loaderError("Unauthorized! Please allow pop-ups!");
}

$(window).on("load",function(){
	$("#tableLink").hide();
        $("#map").height($(window).height()/2)
        $("#meta-google-client").attr("content",window.CLIENTID);
        loadTableFromDatabase();
        loadScript('http://maps.googleapis.com/maps/api/js?v=3&callback=startMap&key='+window.APIKEY);
        loadScript('https://apis.google.com/js/client.js?onload=onGapiLoad');
});


function onGapiLoad() {
        loaderON("Authenticating...");
        gapi.client.setApiKey(window.APIKEY);
        gapi.auth.authorize({
                client_id:      window.CLIENTID,
                immediate:      false,
                scope:          window.SCOPES,
        },onAuthentication);
}

window.ACCESS_TOKEN = null;
function onAuthentication(e) {
        if (e.access_token) {
		retrieveFusionTable();
		window.ACCESS_TOKEN = e.access_token;
	} else 
                loaderError("GoogleLoginError: Not authenticated!");
}

function isAuthenticated() {
        return window.ACCESS_TOKEN != null;
}

function retrieveFusionTable() {
	loaderON("Retrieving Google Fusion Table...");
	gapi.client.request({
		path:  	"/fusiontables/v2/tables",
		method:	"GET",
	}).then(function(resp) {
		loaderON("Trying to find the right table...");
		var tables = resp.result.items;
		var i = 0;
		while (i<tables.length && tables[i].name != window.TABLENAME ) { 
			i++;
		}
		if (i<tables.length && tables[i].name != window.TABLENAME ) { 
			window.TABLEID = tables[i].tableId;
			showTableLink();
			resetLoader();
		} else { 
			createNewTable();
		}
	}, function(reason) {
		loaderError("GoogleAPIError while listing tables: "+reason.result.error.message);
	});
}

function createNewTable() { 
	loaderON("Creating table...");
	gapi.client.request({
		path:  	"/fusiontables/v2/tables",
		method:	"POST",
		params: { 
				isExportable: 	true,
				name: 		window.TABLENAME,
				columns: 	[
							{ name: "address",	type:"STRING", 		},
							{ name: "location",	type:"LOCATION", 	},
							{ name: "Date",		type:"DATETIME", 	},
							{ name: "x",		type:"NUMBER", 		},
							{ name: "y",		type:"NUMBER", 		},
						],
			},	
	}).then(function(resp) {
		window.TABLEID = resp.tableId;
		resetLoader();
		showTableLink();
	}, function(reason) {
		loaderError("GoogleAPIError while creating table: "+reason.result.error.message);
	});
}

function showTableLink() {
	if (window.TABLEID) {
		var u = "https://www.google.com/fusiontables/DataSource?docid="+window.TABLEID
		$("#tableLink").attr("href",u);
		$("#tableLink").show();
	}
}
