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

        function handle(resolvers) {
            if(state < 4) {
                deferred = resolvers;
                return;
            } 

            var handler;
            if(status === 200) {
                resolvers.resolved(xhttp.responseText);
            }
            if(String(status).match(/^([4-5][0-5][0-9])$/g)){
                resolvers.rejected({statusText: xhttp.statusText, statusCode: status});
            }

        }
        
        this.then = function(resolved, rejected) {
            handle({
                resolved: resolved, 
                rejected: rejected
            });
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

module.exports = ajax;