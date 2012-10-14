describe('.Object', function () {

	describe('static function: .extend()', function () {
		it('returns a new Constructor function that inherits from the current object', function () {
			var NewConstructor = kiva.Object.extend();

			expect(NewConstructor).toEqual(jasmine.any(Function));

			$.each(kiva.Object, function (key, prop) {
				expect(NewConstructor.key).toEqual(kiva.Object.key);
			});

			expect(NewConstructor._super).toBeDefined();
		});


		it('creates a pointer (__proto__) directly to the parents prototype', function () {
		});


		it('returns a new Constructor function who\'s prototype gets extended with the supplied arguments', function () {
			var NewConstructor = kiva.Object.extend({prop1: 'uno', prop2: 'dos'});

			expect(NewConstructor.prototype.prop1).toBe('uno');
			expect(NewConstructor.prototype.prop2).toBe('dos');
		});
	});


	describe('static function: .create()', function () {
		it('returns an object instance of the current object', function () {
			var myObj = kiva.Object.create();

			expect(myObj).toEqual(kiva.Object.prototype);
		});


		it('returns an object instance of the current object and extends it with the supplied arguments', function () {
			var dummyProperties = {prop1: 'uno', prop2: 'dos'}
			, myObj = kiva.Object.create(dummyProperties);

			$.each(dummyProperties, function (key, prop) {
				expect(myObj.key).toBe(dummyProperties.key);
			});
		});


		it('leaves a pointer directly to the parents prototype', function () {
		});

		// @todo opted to remove this from the .create() routine, it seems it should go higher up in the chain
		xit('sets some default properties', function () {
			var myObj = kiva.Object.create();

			expect($.isArray(myObj.members)).toBe(true);
		})
	});
});