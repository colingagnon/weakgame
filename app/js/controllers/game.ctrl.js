angular.module('app').controller('GameCtrl', ['$location', '$scope', '$ocModal', 'Fight', 'Monster', 'GameData', '$log', function GameCtrl($location, $scope, $ocModal, Fight, Monster, GameData, $log) {
	// Set controllerAs
	var game = this;
	game.$log = $log;
	// Setup resources
	game.fight = new Fight();
	game.monster = new Monster();
	
	// Export functions
	game.loadFight = loadFight;
	
	// Setup empty error
	game.errorShow = false;
	game.errorMessage = '';

	// Init data and watch for changes
	game.user = GameData.getUserData();
	$scope.$watch(function () {return GameData.getUserData(); }, function (newValue, oldValue) {
        if (newValue !== oldValue) {
        	game.user = newValue;
        }
    }, true);
	
	// Gets a fight with a random monster, sets the data, and sends to fight
	function loadFight() {
		Fight.get(game.fight, function success(fight){
			GameData.setFightData(fight);
			Monster.get({monsterId: fight.monsterId}, function(monster) {
				GameData.setMonsterData(monster);
				$location.path('fight');
			});
		}, function error (err) {
			game.errorShow = true;
			game.errorMessage = err.data;
		});
	}
	
}]);

//Setup resource for signing up for an account
angular.module('app').factory('Fight', ['APIDOMAIN', '$resource', function(APIDOMAIN, $resource) {
	return $resource(APIDOMAIN + '/fights/random');
}]);

//Setup resource for signing up for an account
angular.module('app').factory('Monster', ['APIDOMAIN', '$resource', function(APIDOMAIN, $resource) {
	return $resource(APIDOMAIN + '/monsters/:monsterId', {monsterId: '@id'});
}]);