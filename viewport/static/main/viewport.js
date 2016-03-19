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
	loaderOFF();
	$("#top-progress-bar .progress-bar").addClass('progress-bar-info progress-bar-striped active');	
	$("#top-progress-bar .progress-bar").html(text);
}

function loaderError(text) {
	loaderOFF();
	$("#top-progress-bar .progress-bar").addClass('progress-bar-danger');
	$("#top-progress-bar .progress-bar").html(text);
}
