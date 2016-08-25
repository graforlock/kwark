var select = require('../src/kwark-dom-select'),
    effects = require('../src/kwark-dom-select'),
    test = require('tape');

test('Siblings, insertAfter, select.type() functiionality.', function(t) {
    t.plan(2);
    
    var len = 4,
        id4;
        
    for(var i = 0; i < len; i++) {
        var span = document.createElement('span');
        span.id = 'id-' + (i + 1);
        document.body.appendChild(span);
    }

    id4 = select('#id-4').insertBefore(document.querySelector('#id-1'));

    t.equal(document.querySelector('span').id, 'id-4', 
        '-> Id has successfully been inserted before.');
    t.equal(id4.siblings(function(el) { return !el.src && id4.type(el) !== '[object HTMLDivElement]';}).node.length, 3, 
        '-> Id has exatcly three siblings.');
    t.end();


})
