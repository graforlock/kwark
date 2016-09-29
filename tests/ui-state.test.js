var component = require('../src/kwark-ui-component'),
    State = require('../src/kwark-ui-state'),
    test = require('tape');


test('State stores properties', function(t) {
    t.plan(2);

    var fakeState = new State({ active: false }),
        emittedState = null;

    component.inline("<div id=the-div ></div>").nodeify();
    var comp = new component("#the-div", function(state) {
            return state;
        });

    fakeState.stream().onValue(function(value) {
        emittedState = value;
    });

    fakeState.updateState({active: !fakeState.state.active});

    t.equals(fakeState.state.active, true);
    t.notEqual(emittedState, null);
    t.end();

});


