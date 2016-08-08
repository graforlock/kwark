var test = require('tape'),
    ajax = require('../src/kwark-async-ajax.js'),
    compose = require('../src/kwark-core.js').compose;

test('some test', function(t) {
    t.plan(2);

    function toJSON(response) {
        return JSON.parse(response);
    }

    function assertObject(response) {
        t.equal(typeof response, 'object');
        return response;
    }

    function assertContent(response) {
        t.equal(typeof response.id, 'number');
        t.end();
    }

    var testSuites = compose(assertContent, assertObject);
    var composed = compose(testSuites, toJSON);

    result = ajax('http://jsonplaceholder.typicode.com/posts/1')
        .then(composed);

})
