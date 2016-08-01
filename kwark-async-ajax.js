kwark = kwark || {};

function ajax(url) {
    var state = 0,
        deferred,
        value;
    
    function resolve(result) {
        value = result;
        state = result.readyState;

        if(deferred) {
            handle(deferred);
        }
    }

    function handle(onResolved) {
        if( state !== 4) {
            deferred = onResolved;
        }
        onResolved(value.responseText)
    }
    
    this.then = function(resolved) {
        handle(resolved);
    }

    var xhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhttp.onreadystatechange = function() {
        resolve(xhttp);
    };
    xhttp.open("GET", url, true);
    xhttp.send();

}

kwark.ajax = ajax;
