var select = require('./kwark-dom-select');

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

component.inline = select.inline;
component.one = select.one;
component.get = select.get;

module.exports = component;