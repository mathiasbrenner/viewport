window.APIKEY   = "AIzaSyCmBQxnV8pL3xQXCMvds_E_-f-RwOANJ-o";
window.TABLEID  = "1CoaFZodTJ1zEilJAN3M5KmHs316fGwAx5pt1vjqA";
window.CLIENTID = "102070515856-svjrhp1l93pnj6tgln6bqiqb5avb2iui.apps.googleusercontent.com";
window.SECRET   = "SOtDsRqbzz3f4RkrojgUEl7z";
window.SCOPES   = [
                        "https://www.googleapis.com/auth/fusiontables.readonly",
                        "https://www.googleapis.com/auth/fusiontables"
                ];

function resetLoader() {
	if (isAuthenticated()) 
        	loaderInfo("Click on the map to add an address to the table below!");
	else
        	loaderError("Unauthorized!");
}

$(window).on("load",function(){
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
                window.ACCESS_TOKEN = e.access_token;
                resetLoader();
        } else {
                loaderError("GoogleLoginError: Not authenticated!");
        }
}

function isAuthenticated() {
        return window.ACCESS_TOKEN != null;
}

