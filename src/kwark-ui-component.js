kwark = kwark || {};

function component(selector, controller) {
    select.call(this, selector);
    this._controller = controller;
    this.controller = function(state) {
        var ready;
        this._controller.bind(this);
        ready = this._controller(state);
        if(ready && ready !== this.state) this.render(ready);
    }
}

component.prototype = Object.create(select.prototype);
component.prototype.name = select;

component.prototype.ajax = function(url) {
    kwark.ajax(url)
        .then(function(data) {
            if(data !== this.state) {
                this.state = data;
                this.notify();
            }
        }.bind(this));
}

component.prototype.notify = function() {
    this.controller(this.state);
}


kwark.component = component;