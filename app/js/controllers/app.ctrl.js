angular.module('app').controller('AppCtrl', ['$location', '$scope', 'Login', 'Product', 'Purchase', 'Revive', 'GameData', '$ocModal', function AppCtrl($location, $scope, Login, Product, Purchase, Revive, GameData, $ocModal) {
	var app = this;

	// Setup resources
	app.login = new Login();
	app.product = new Product();
	app.revive = new Revive();
	app.purchase = new Purchase();
	
	// Export functions
	app.openProducts = openProducts;
	app.openRevive = openRevive;
	
	// Init data
	app.products = [];
	
	app.errorShow = false;
	app.errorMessage = '';
	
	// Get user data and redirect to game
	if (_.isEmpty(GameData.getAuthToken()) === false) {
		// Get user information from old auth token
		Login.get(app.login, function success(user){
			GameData.setUserData(user);
			app.user = user;
			$location.path('game');
		}, function error (err) {
			$location.path('auth');
			//console.log(err);
			//app.errorShow = true;
			//app.errorMessage = err.data;
		});
	} else {
		// No user info send to auth route
		$location.path('auth');
	}
	
	// Watch for changes to user data
	$scope.$watch(function () {return GameData.getUserData(); }, function (newValue, oldValue) {
        if (newValue !== oldValue) {
        	app.user = newValue;
        }
    }, true);
	
	// Pre fetches product list and sets it in game data and locally
	Product.query(app.product, function success(products){
		GameData.setProductsData(products);
		app.products = products;
	}, function error (err) {
		// TODO maybe error handling, but I doubt it, not sure what the point would be
		//console.log(err);
		//app.errorShow = true;
		//app.errorMessage = err.data;
	});
	
	// Open a modal with all products
	function openProducts() {
		$ocModal.open({
			url: 'partials/products.html',
		    init: {
		        products: app.products,
		        buyProduct: buyProduct
		    }
		});
	}

	// Buys a specific product
	function buyProduct(id) {
		// Pre fetches product list and sets it in game data and locally
		Product.purchase(app.purchase, {id: id}, function success(user){
			GameData.setUserData(user);
			app.user = user;
			$ocModal.close();
			app.errorShow = false;
			app.errorMessage = '';
		}, function error (err) {
			app.errorShow = true;
			app.errorMessage = err.data;
		});
		
	}
	
	// Open modal for purchase a revive
	function openRevive() {
		Revive.get(app.revive, function success(revive){
			$ocModal.open({
				url: 'partials/revive.html',
			    init: {
			        user: app.user,
			        fee: revive.fee,
			        buyRevive: buyRevive
			    }
			});
		}, function error (err) {
		});
	}
	
	// Open modal for purchase a revive
	function buyRevive() {
		Revive.save(app.revive, {}, function success(user){
			GameData.setUserData(user);
			$ocModal.close();
			$location.path('game');
		}, function error (err) {
			$ocModal.close();
			app.errorShow = true;
			app.errorMessage = err.data;
		});
	}
	
}]);

//Setup resource for signing up for an account
angular.module('app').factory('Product', ['APIDOMAIN', '$resource', function(APIDOMAIN, $resource) {
	return $resource(APIDOMAIN + '/products/:productId', {productId: '@id'}, {
		purchase: {
			url: APIDOMAIN + '/products/purchase/:productId',
			method: 'PUT'
		}
	});
}]);

//Setup resource for purchasing a product
angular.module('app').factory('Purchase', ['APIDOMAIN', '$resource', function(APIDOMAIN, $resource) {
	return $resource(APIDOMAIN + '/products/purchase/:productId', {productId: '@id'});
}]);

//Setup resource for signing up for an account
angular.module('app').factory('Revive', ['APIDOMAIN', '$resource', function(APIDOMAIN, $resource) {
	return $resource(APIDOMAIN + '/users/revive');
}]);
