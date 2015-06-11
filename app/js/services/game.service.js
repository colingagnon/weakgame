var gameServices = angular.module('GameServices', []);

// Holds private data and accessor methods for our game data
gameServices.factory('GameData', ['$http', '$location', function($http, $location) {

	var data = {
			token: '',
			user: {},
			fight: {},
			monster: {},
			products: {}
		};
	
	return {
		
		// Sets Authorization-Token
		setAuthToken: function (token) {
			data.token = token;

			if (Modernizr.localstorage) {
				localStorage.setItem('X-Authorization-Token', token);	
			}
			
			$http.defaults.headers.common['X-Authorization-Token'] = token;

			return true;
		},
		
		// Gets Authorization-Token
		getAuthToken: function () {
			if (_.isEmpty(data.token) === true) {
				if (Modernizr.localstorage) {
					data.token = localStorage.getItem('X-Authorization-Token');
					$http.defaults.headers.common['X-Authorization-Token'] = data.token;
				}
			}
			
			return data.token;
		},
		
		// Replaces user data with parameter
		setUserData: function (user) {
			data.user = user;
			return true;
		},
	
		// Gets current user data
		getUserData: function () {
			// If no user data, send to auth
			if (_.isEmpty(data.user) === true) {
				//$location.path('auth');
			}
			
			return data.user;
		},
		
		// Replaces fight data with parameter
		setFightData: function (fight) {
			data.fight = fight;
			return true;
		},
	
		// Gets fight user data
		getFightData: function () {
			return data.fight;
		},
		
		// Replaces monster data with parameter
		setMonsterData: function (monster) {
			data.monster = monster;
			return true;
		},
	
		// Gets monster data
		getMonsterData: function () {
			return data.monster;
		},
		
		// Replaces products data with parameter
		setProductsData: function (products) {
			data.products = products;
			return true;
		},
	
		// Gets product data
		getProductsData: function () {
			return data.products;
		}
	};
}]);
