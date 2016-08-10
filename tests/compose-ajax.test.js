var test = require('tape'),
    ajax = require('../src/kwark-async-ajax.js'),
    compose = require('../src/kwark-core-utils.js').compose;

test('Ajax and compose test', function(t) {
    t.plan(2);

    function toJSON(response) {
        return JSON.parse(response);
    }

    function assertObject(response) {
        t.equal(typeof response, 'object', '-> JSON data successfully fetched and parsed.');
        return response;
    }

    function assertContent(response) {
        t.equal(typeof response.id, 'number', '-> JSON data has correct structure and numeric type id.');
        t.end();
    }

    var testSuites = compose(assertContent, assertObject),
        composed = compose(testSuites, toJSON);

    result = ajax('http://jsonplaceholder.typicode.com/posts/1')
        .then(composed);

})
