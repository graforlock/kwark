var component = require('../src/kwark-ui-component'),
    h = require('virtual-dom').h,
    createElement = require('virtual-dom/create-element'),
    test = require('tape');

function dummyController() {
        return [
            {
                id: 55, 
                username: "Jackrabbit"    
            },
            {
                id: 345,
                username: "Hellasick666"
            }
        ]
}

test('rendered succesfully', function(t) {
    t.plan(1);
    var a = new component.inline('<div></div>').nodeify().append();
    a.render = function() {
            var tree = this.state.map(function(o) {
                return h('div', {}, o.username);
            })
            var rootNode = createElement(h('div#main', tree)),
                parent = component.get(rootNode);
                parent.append(this.node);
    }
    t.equal(typeof document.querySelector('#some-id'), 'object');
    t.end();
});
