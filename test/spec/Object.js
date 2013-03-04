/*global afterEach, beforeEach, describe, expect, it, jasmine, runs, spyOn, waits, waitsFor, xdescribe, xit */
describe('.Object', function () {
	'use strict';

	describe('static function: .extend()', function () {
		it('returns a new Constructor function that inherits from the current object', function () {
			var NewConstructor = kiva.Object.extend();

			expect(NewConstructor).toEqual(jasmine.any(Function));

			$.each(kiva.Object, function (key, prop) {
				expect(NewConstructor.key).toEqual(kiva.Object.key);
			});

			expect(NewConstructor.__super__).toBeDefined();
		});


		it('extends it\'s prototype with the supplied arguments', function () {
			var NewConstructor = kiva.Object.extend({prop1: 'uno', prop2: 'dos'});

			expect(NewConstructor.prototype.prop1).toBe('uno');
			expect(NewConstructor.prototype.prop2).toBe('dos');
		});


		it('creates a pointer (__proto__) directly to the parent\'s prototype', function () {
			var NewConstructor = kiva.Object.extend({prop1: 'uno'});

			expect(NewConstructor.prototype.__proto__).toBeDefined();
			expect(NewConstructor.prototype.__proto__.prop1).not.toBeDefined();
		});
	});


	describe('static function: .create()', function () {
		it('returns an object instance of the current object', function () {
			var myObj = kiva.Object.create();

			expect(myObj).toEqual(kiva.Object.prototype);
		});


		it('extends it with the supplied arguments', function () {
			var dummyProperties = {prop1: 'uno', prop2: 'dos'}
			, myObj = kiva.Object.create(dummyProperties);

			$.each(dummyProperties, function (key, prop) {
				expect(myObj.key).toBe(dummyProperties.key);
			});
		});


		it('leaves the "__proto__" pointer pointing directly to the parents prototype', function () {
			var obj = kiva.Object.create({prop: 'someValue'})
			, NewConstructor
			, YetAnotherNewConstructor;

			// Simple test.  __proto__ points to the default, Object.prototype
			expect(obj.__proto__.prop).not.toBeDefined();

			// Now make sure it also works when creating an object that has been extended
			NewConstructor = kiva.Object.extend({prop: 'uno'});
			obj = NewConstructor.create({prop: 'not uno!'});

			expect(obj.__proto__.prop).toBeDefined();
			expect(obj.prop).toBe('not uno!');
			expect(obj.__proto__.prop).toBe('uno');

			// Lets go one level deeper!
			YetAnotherNewConstructor = NewConstructor.extend({prop: 'override uno'});
			obj = YetAnotherNewConstructor.create({prop: 'override the override!'});

			expect(obj.__proto__.__proto__.prop).toBeDefined();
			expect(obj.prop).toBe('override the override!');
			expect(obj.__proto__.prop).toBe('override uno');
			expect(obj.__proto__.__proto__.prop).toBe('uno');
		});
	});
});