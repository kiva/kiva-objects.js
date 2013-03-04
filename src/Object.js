// @todo Probably need to revisit this code
// @hack to get around jshint (https://github.com/jshint/jshint/issues/525)
var Fn = Function;


/**
 *
 * @constructor
 */
kiva.Object = function () {};


/**
 * Creates a new Constructor function that "inherits" from "this".
 *
 * @param {Object} props
 * @return {Object}
 */
kiva.Object.extend = function (props) {
	var Func = function (){}
    , Child = props && props.name
		? new Fn ('return function ' + props.name + ' () {}')()
		: function () {};

    Func.prototype = this.prototype;
    Child.prototype = new Func();

    $.extend(Child.prototype, props);
    $.extend(Child, this);

    Child.__proto__ = this.prototype;
    Child.__super__ = this;

	return Child;
};


/**
 * Creates a new object that inherits from "this"
 *
 * @param args
 */
kiva.Object.create = function (args) {
	// @todo again, this if for jshint...
	var This = this;
	var newObj = new This();

	return $.extend(newObj, args);
};