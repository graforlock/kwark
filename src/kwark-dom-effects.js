var select = require('./kwark-dom-select');

function effects(selector)
{
    if (this instanceof effects)
    {
        select.call(this, selector);
    } else
    {
        return new effects(selector);
    }
}

effects.prototype = Object.create(select.prototype);
effects.prototype.name = select;

select.statics_decorator(effects);

effects.prototype.frame_decorator = function ()
{
};

effects.prototype.fadeIn = function (target)
{
    target = target || 1.0;
    var opacity = parseFloat(this.node.style.opacity) || 0.00;
    var self = this;
    (function frame()
    {
        if (opacity >= target)
        {
            self.node.style.opacity = target;
            return self;
        } else
        {
            opacity += 0.01;
            self.node.style.opacity = opacity;
            window.requestAnimationFrame(frame);
        }
    })();
};

effects.prototype.fadeOut = function (target)
{
    target = target || 0.0;
    var opacity = parseFloat(this.node.style.opacity) || 1.0;
    var self = this;
    (function frame()
    {
        if (opacity <= target)
        {
            self.node.style.opacity = target;
            return self;
        } else
        {
            opacity -= 0.01;
            self.node.style.opacity = opacity;
            window.requestAnimationFrame(frame);
        }
    })();

};

effects.prototype.move = function (direction, velocity)
{
};

module.exports = effects;