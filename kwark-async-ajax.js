kwark = kwark || {};

function ajax(url) {
    if(this instanceof ajax) {
        var state = 0,
            deferred,
            status,
            value;


        function resolve(result) {
            value = result;
            state = result.readyState;
            status = result.status;

            if(deferred) {
                handle(deferred);
            }
        }

        function handle(onResolved) {
            if(state < 4 || status !== 200) {
                deferred = onResolved;
                return;
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

    } else {
        return new ajax(url);
    }

}

kwark.ajax = ajax;
