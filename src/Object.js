(function ($) {

	/**
	 *
	 * @constructor
	 */
	kiva.Object = function () {};


	/**
	 * Creates a new Constructor function that "inherits" from "this".
	 * The new args are added to the prototype of the new Constructor
	 *
	 * @param args
	 * @return {*}
	 */
	kiva.Object.extend = function (args) {
		var Child = args && args.name
			? new Function ('return function ' + args.name + ' () {}')()
			: function () {};

		Child.prototype = $.extend(true, {}, this.prototype, args);
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
		var newObj = $.extend(true, {}, this.prototype);

		return $.extend(newObj, args);
	};


}(jQuery));