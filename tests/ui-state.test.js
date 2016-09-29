var component = require('../src/kwark-ui-component'),
    State = require('../src/kwark-ui-state'),
    test = require('tape');


test('State stores properties', function(t) {
    t.plan(1);

    var fakeState = new State({ active: false });

    component.inline("<div id=the-div ></div>").nodeify();
    var comp = new component("#the-div", function(state) {
            return state;
        });

    comp.subscribe(fakeState.getStream());

    fakeState.updateState({ active: true });

    t.equals(fakeState.state.active, true);
    t.end();

});


