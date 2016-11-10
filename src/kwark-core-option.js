//var exists = require('./utils').exists;

function Option(v)
{
    return exists(v) ? Just.of(v) : None.of(v);
}

Option.of = function(v)
{
  return new Option(v);
};


Option.prototype.map = function(f)
{
    return this.isNone() ? None.of(null) : Just.of(f(this.__value));
};

Option.prototype.isNone = function()
{
    return this.constructor === None;
};

Option.prototype.orElse = function(other)
{
    return this.isNone() ? Option.of(other.unwrap()) : Option.of(this.unwrap());
};

Option.prototype.empty = function()
{
    return None.of(null);
};

Option.prototype.unwrap = function()
{
  return this.__value;
};

Option.prototype.concat = function(other, f)
{
    return this.isNone() ? None.of(null) : f(this.unwrap(), other.unwrap());
};

function Just(v)
{
    this.__value = v;
}

Just.prototype = Object.create(Option.prototype);
Just.prototype.constructor = Just;

Just.of = function(v) {
    return new Just(v);
};

function None(v)
{
    this.__value = v;
}

None.prototype = Object.create(Option.prototype);
None.prototype.constructor = None;

None.of = function(v) {
    return new None(v);
};