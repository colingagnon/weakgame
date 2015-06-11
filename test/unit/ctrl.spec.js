'use strict';
describe('controllers', function() {
	beforeEach(module('app'));
	describe('AppCtrl', function() {
		return it('should make scope testable', inject(function($rootScope, $controller) {
			//var view = $controller('AppCtrl');
			//return expect(view.content).toEqual('This is the partial for view.');
		}));
	});
});
