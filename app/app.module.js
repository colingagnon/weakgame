// Declare app level module which depends on filters, and services
angular.module('app', ['ngResource', 'ngSanitize', 'ui.router', 'oc.modal', 'GameServices'])
	.constant('VERSION', '0.0.1')
	// CHANGE THIS TO POINT THE APP AT A DIFFERENT DOMAIN
	.constant('APIDOMAIN', 'http://weakgame.maxxjs.com:8080')
	//.constant('APIDOMAIN', 'http://weakgame.maxxjs.local:8080')
	//.constant('APIDOMAIN', 'http://localhost:8080')
	.config(function appConfig($stateProvider, $locationProvider, $urlRouterProvider) {
		$locationProvider.hashPrefix('!');
		$urlRouterProvider.otherwise('/auth');
		
		// Signup / Login route
		$stateProvider.state('auth', {
			url: '/auth',
			views: {
				'mainView': {
					templateUrl: '/partials/auth.html',
					controller: 'AuthCtrl',
					controllerAs: 'auth'
				}
			}
		});
		
		// Main Game Controller
		$stateProvider.state('game', {
			url: '/game',
			views: {
				'mainView': {
					templateUrl: '/partials/game.html',
					controller: 'GameCtrl',
					controllerAs: 'game'
				}
			}
		});
		
		// Fight Controller
		$stateProvider.state('fight', {
			url: '/fight',
			views: {
				'mainView': {
					templateUrl: '/partials/fight.html',
					controller: 'FightCtrl',
					controllerAs: 'fight'
				}
			}
		});
		
		// Victory & Defeat
		$stateProvider.state('victory', {
			url: '/victory',
			views: {
				'mainView': {
					templateUrl: '/partials/victory.html'
				}
			}
		});
		
		$stateProvider.state('defeat', {
			url: '/defeat',
			views: {
				'mainView': {
					templateUrl: '/partials/defeat.html'
				}
			}
		});
		
		$stateProvider.state('level', {
			url: '/level',
			views: {
				'mainView': {
					templateUrl: '/partials/level.html'
				}
			}
		});
		
		// /!\ Without server side support html5 must be disabled.
		return $locationProvider.html5Mode(true);
	});

