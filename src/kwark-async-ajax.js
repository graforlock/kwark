var serialize = require('./kwark-core-addons').serialize.object;

function ajax(method, options)
{
    if (this instanceof ajax)
    {
        var params = options.params ? serialize(options.params) : null;
        var state = 0,
            deferred,
            status,
            value;

        function resolve(result)
        {
            value = result;
            state = result.readyState;
            status = result.status;

            if (deferred)
            {
                handle(deferred);
            }
        }

        function handle(resolvers)
        {
            if (state < 4)
            {
                deferred = resolvers;
                return;
            }

            if (status >= 200)
            {
                if (status >= 300)
                {
                    resolvers.rejected({statusText: xhttp.statusText, statusCode: status});
                } else
                {
                    resolvers.resolved(xhttp.responseText);
                }
            }

        }

        this.then = function (resolved, rejected)
        {
            handle({
                resolved: resolved,
                rejected: rejected
            });
        };

        var xhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        xhttp.onreadystatechange = function ()
        {
            resolve(xhttp);
        };
        xhttp.open(method.toUpperCase(), options.url, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(params);

    } else
    {
        return new ajax(method, options);
    }

}

module.exports = ajax;