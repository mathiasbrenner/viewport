function loadScript(src){
        var script = document.createElement("script");
        script.type = "text/javascript";
        document.getElementsByTagName("head")[0].appendChild(script);
        script.src = src;
}
