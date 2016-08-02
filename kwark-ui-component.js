kwark = kwark || {};

function component(selector, controller) {
    select.call(this, selector);
    this._controller = controller;
    this.controller = function(state) {
        this._controller.bind(this);
        this._controller(state);
    }
}

component.prototype = Object.create(select.prototype);
component.prototype.name = select;

component.prototype.ajax = function(url) {
    kwark.ajax(url)
        .then(function(data) {
            var _compare = data;
            if(_compare !== this.state) {
                this.state = data;
                this.notify();
            }
        }.bind(this));
}

component.prototype.notify = function() {
    this.controller(this.state);
}

kwark.component = component;