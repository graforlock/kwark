var test = require('tape'),
    ajax = require('../src/kwark-async-ajax.js'),
    compose = require('../src/kwark-core.js').compose;

test('some test', function(t) {
    t.plan(1);

    function toJSON(response) {
        return JSON.parse(response);
    }

    function assert(response) {
        t.equal(typeof response, 'object');
        t.end();
    }

    var composed = compose(assert, toJSON);

    result = ajax('http://jsonplaceholder.typicode.com/posts/1')
        .then(composed);

})
