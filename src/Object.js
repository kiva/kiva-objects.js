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
 * @param args
 * @return {*}
 */
kiva.Object.extend = function (args) {
	var Child = args && args.name
		? new Fn ('return function ' + args.name + ' () {}')()
		: function () {};

	Child.prototype = $.extend({}, this.prototype, args);
	Child.prototype.__proto__ = this.prototype;
	Child._super = this;
	Child = $.extend(Child, this);

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

