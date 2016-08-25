var select = require('../src/kwark-dom-select'),
    effects = require('../src/kwark-dom-select'),
    test = require('tape');

test('Clone, Nodeify element and Click event.', function(t) { 
    t.plan(3);

    var clicky = select.inline('<div id="sample-id"><p>Heyhoue</p></div>').nodeify(),
        paragraph = clicky.clone().find('p');
    
    t.notEqual(paragraph.node, clicky.node, '-> Cloned nodes should not be the same.');
    t.equal(clicky.node.id, 'sample-id', '-> Id attribute is parsed properly (to the node).');

    clicky.click(function(ev) {
        t.equal(clicky.type(ev), '[object MouseEvent]', '-> Event is of correct type: MouseEvent.');
        t.end();
    });
    clicky.node.click();

})

