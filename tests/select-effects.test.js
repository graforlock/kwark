var select = require('../src/kwark-dom-select'),
    effects = require('../src/kwark-dom-select'),
    test = require('tape');

test('nodeify element and click it', function(t) { 
    t.plan(2);

    var clicky = select.inline('<div id="sample-id"><p>Heyhoue</p></div>').nodeify().find('p');
    t.equal(typeof clicky.node, 'object');

    clicky.click(function(ev) {
        t.equal(clicky.type(ev), '[object MouseEvent]');
        t.end();
    });

    clicky.node.click();

});



