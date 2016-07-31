kwark = kwark || {};

function promise(fn) {
    if(this instanceof promise) {
        var state = 'pending',
            deferred,
            value;
            
        function resolve(result) {
            value = result;
            state = 'resolved';
            
            if(deferred) {
                handle(deferred);
            }
        }

        function handle(resolved) {
            if(state === 'pending') {
                deferred = resolved;
                return;
            }

            resolved(value);
        }

        this.then = function(resolved) {
            handle(resolved);
        }

        fn(resolve);
    } else {
        return new promise(fn);
    }
}

kwark.promise = promise;