function component(t,o){select.call(this,t),this._controller=o,this.controller=function(t){var o;this._controller.bind(this),o=this._controller(t),o&&o!==this.state&&this.render(o)}}component.prototype=Object.create(select.prototype),component.prototype.name=select,component.prototype.ajax=function(t){kwark.ajax(t).then(function(t){t!==this.state&&(this.state=t,this.notify())}.bind(this))},component.prototype.notify=function(){this.controller(this.state)},module.exports={component:component},module.exports={component:component};