var select = require('../src/kwark-dom-select'),
    effects = require('../src/kwark-dom-select'),
    test = require('tape');

test('Clone, Nodeify element and Click event.', function(t) { 
    t.plan(3);

    var clicky = select.inline('<div id="sample-id"><p>Heyhoue</p></div>').nodeify(),
        paragraph = clicky.clone().find('p');
    
    t.notEqual(paragraph.node, clicky.node, '-> Cloned should are not the same.');
    t.equal(clicky.node.id, 'sample-id', '-> Id attribute is parsed properly (to the node).');

    clicky.click(function(ev) {
        t.equal(clicky.type(ev), '[object MouseEvent]', '-> Event is of correct type: MouseEvent.');
        t.end();
    });

    clicky.node.click();

})

test('Siblings and insertAfter functiionality.', function(t) {
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
