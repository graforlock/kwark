var select = require('../src/kwark-dom-select'),
    effects = require('../src/kwark-dom-select'),
    test = require('tape');

test('Nodeify element and click it', function(t) { 
    t.plan(3);

    var clicky = select.inline('<div id="sample-id"><p>Heyhoue</p></div>').nodeify();
    var paragraph = clicky.clone().find('p');
    
    t.notEqual(paragraph.node, clicky.node);
    t.equal(clicky.node.id, 'sample-id', '-> Id assigned properly to the node.');

    clicky.click(function(ev) {
        t.equal(clicky.type(ev), '[object MouseEvent]', '-> Event is of type MouseEvent.');
        t.end();
    });

    clicky.node.click();

})

test('All siblings selected after insertAfter', function(t) {
    t.plan(2);
    
    var len = 4,
        id4;
    for(var i = 0; i < len; i++) {
        var div = document.createElement('div');
        div.id = 'id-' + (i + 1);
        document.body.appendChild(div);
    }

    id4 = select('#id-4').insertBefore(document.querySelector('#id-1'));

    t.equal(document.querySelector('div').id, 'id-4', 
        '-> Id has successfully been inserted before.');
    t.equal(id4.siblings(function(el) { return !el.src;}).node.length, 3, 
        '-> Id has exatcly three siblings.');
    t.end();


})

test.onFinish