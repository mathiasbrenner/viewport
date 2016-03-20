function loadScript(src){
        var script = document.createElement("script");
        script.type = "text/javascript";
        document.getElementsByTagName("head")[0].appendChild(script);
        script.src = src;
}

function loaderOFF() {
	$("#top-progress-bar .progress-bar").removeClass('progress-bar-danger');	
	$("#top-progress-bar .progress-bar").removeClass('progress-bar-info progress-bar-striped active');	
	$("#top-progress-bar .progress-bar").html("");
}

function loaderInfo(text) {
	loaderOFF();
	$("#top-progress-bar .progress-bar").html(text);
}

function loaderON(text) {
	console.log(text);
	loaderOFF();
	$("#top-progress-bar .progress-bar").addClass('progress-bar-info progress-bar-striped active');	
	$("#top-progress-bar .progress-bar").html(text);
}

function loaderError(text) {
	console.log("ERROR "+text);
	loaderOFF();
	$("#top-progress-bar .progress-bar").addClass('progress-bar-danger');
	$("#top-progress-bar .progress-bar").html(text);
}

function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                        var cookie = jQuery.trim(cookies[i]);
                        if (cookie.substring(0, name.length + 1) == (name + '=')) {
                                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;  
                }
                }
        }
        return cookieValue;
}
