var select = require('./kwark-dom-select');
var kefir = require('kefir');

function component(selector, controller) {
    select.call(this, selector);
    this._controller = controller.bind(this);
    this.controller = function(state) {
        var ready;
        ready = this._controller(state);
        if(ready && JSON.stringify(ready) !== JSON.stringify(this.state)) {
            this.state = ready;
            if(this.render) this.render(ready);
        }
    }.bind(this);
}

component.prototype = Object.create(select.prototype);
component.prototype.name = select;

select.statics_decorator(component);

component.prototype.subscribe = function(stream) {
    stream.onValue(this.render);
};

module.exports = component;