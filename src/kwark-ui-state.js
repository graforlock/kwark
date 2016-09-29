var utils = require('./kwark-core-utils');
var kefir = require('kefir');

function State(state) {
    if(this instanceof State) {
        //-> stateProvider is a simplified Subject of Observer :
        this.state = state;
        this.stream$ = kefir.pool();
        this.initState = state;
        this.subscribers = [];

        this.subscribe(function(state) {
            var stream$ = kefir.stream(function(emitter) {
                return emitter.emit(state)
            });
            this.stream$.plug(stream$);
        }.bind(this));

        this.updateState = function(newState) {
            var _state = this.state;
            utils.extend(_state, newState);
            if(utils.compareTo(_state, this.state)) {
                this.state = _state;
                this.notify(_state);
            }
        }.bind(this);

    } else {
        return new State(state);
    }
}


State.prototype.notify = function(newState) {
    newState = newState || this.state;
    for(var i = 0; i < this.subscribers.length; i++) {
        this.subscribers[i](newState);
    }
};

State.prototype.subscribe = function(subscriber) {
    //-> Observer(s) subscription :
    this.subscribers.push(subscriber);
};

State.prototype.getStream = function() {
  return this.stream$;
};

State.prototype.resetState = function() {
    this.updateState(this.initState);
};

State.prototype.bindState = function(components) {
    for(var i = 0; i < components.length; i++) {
        components[i].subscribe(this.stream$);
    }
};

module.exports = State;