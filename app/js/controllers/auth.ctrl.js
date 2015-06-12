angular.module('app').controller('AuthCtrl', ['$location', '$scope', 'Signup', 'Login', 'GameData', function AuthCtrl($location, $scope, Signup, Login, GameData) {
	var auth = this;
	
	// Export functions
	auth.signupProcess  = signupProcess;
	auth.loginProcess   = loginProcess;

	// Setup http resources
	auth.signup = new Signup();
	auth.login = new Login();
	
	// Init data
	// TODO remove this init data
	auth.data = {};
	//auth.data.email = 'test@test.com';
	//auth.data.password = 'test123';
	
	// Setup empty error
	auth.errorShow = false;
	auth.errorMessage = '';
	
	// If we have user data, user shouldn't be on this page
	auth.user = GameData.getUserData();
	if (auth.user.id > 0) {
		$location.path('game');
	}
	
	// Process user signup, then login
	function signupProcess() {
		Signup.save(auth.signup, auth.data, function success(data){
			auth.errorShow = false;
			loginProcess()
		}, function error (err) {
			auth.errorShow = true;
			auth.errorMessage = err.data;
		});
	}
	
	// Process login
	function loginProcess() {
		Login.save(auth.login, auth.data, function success(user, headers){
			GameData.setAuthToken(headers('X-Authorization-Token'));
			GameData.setUserData(user);
			$location.path('game');
		}, function error (err) {
			auth.errorShow = true;
			auth.errorMessage = err.data;
		});
	}
}]);

// Setup resource for signing up for an account
angular.module('app').factory('Signup', ['APIDOMAIN', '$resource', function(APIDOMAIN, $resource) {
	return $resource(APIDOMAIN + '/users/:id');
}]);

//Setup resource for login into an account
angular.module('app').factory('Login', ['APIDOMAIN', '$resource', function(APIDOMAIN, $resource) {
	return $resource(APIDOMAIN + '/users/login');
}]);
