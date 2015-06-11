angular.module('app').controller('MenuCtrl', ['$location', '$scope', 'GameData', function MenuCtrl($location, $scope, GameData) {
	// Set controllerAs
	var menu = this;
	
	// Export functions
	menu.logout = logout;
	
	// Destroys local storage and actually refreshes
	function logout() {
		if (Modernizr.localstorage) {
			localStorage.removeItem('X-Authorization-Token');
		}
		
		window.location.href = '/';
	}
	
}]);
