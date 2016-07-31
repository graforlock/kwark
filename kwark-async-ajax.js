kwark = kwark || {};

function ajax(options) {
    var xhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) return xhttp.responseText;
    };
    if(options.method === 'get') {
        xhttp.open("GET", options.url, true);
        xhttp.send();
    }
    if(options.method === 'post') {
        xhttp.open("POST", options.url, true);
        xhttp.send();
    }
}

function get(options) {
    return kwark.promise({method: 'get'})
}

function post(options) {
    return kwark.promise({method: 'post'})
}

kwark.ajax = ajax;
kwark.post = post;
kwark.get = get;