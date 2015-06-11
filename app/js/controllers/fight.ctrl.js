angular.module('app').controller('FightCtrl', ['$location', 'Round', 'Login', 'GameData', function FightCtrl($location, Round, Login, GameData) {
	// Set controllerAs
	var fight = this;
	
	fight.login = new Login();
	fight.round = new Round();
	
	// Export functions
	fight.loadRound = loadRound;
	
	// Setup empty error
	fight.errorShow = false;
	fight.errorMessage = "";
	
	// Init data
	fight.data = GameData.getFightData();
	fight.monster = GameData.getMonsterData();
	
	function loadRound() {
		Round.get(fight.round, function success(round){
			GameData.setFightData(round);
			fight.data = round;
			
			// Check if player now dead
			if (round.userCurrentHp <= 0) {
				$location.path('defeat');
				loadUserData();
			}
			
			// Check if monster now dead
			if (round.monsterCurrentHp <= 0) {
				$location.path('victory');
				loadUserData();
			}
		}, function error (err) {
			$location.path('game');
			// TODO error handling for fight rounds
			//console.log(err);
			//auth.errorShow = true;
			//auth.errorMessage = err.data;
		});
	}
	
	function loadUserData() {
		Login.get(fight.login, function success(user){
			GameData.setUserData(user);
		}, function error (err) {
			app.errorShow = true;
			app.errorMessage = err.data;
		});
	}
}]);

//Setup resource for signing up for an account
angular.module('app').factory('Round', ['APIDOMAIN', '$resource', function(APIDOMAIN, $resource) {
	return $resource(APIDOMAIN + '/fights/round');
}]);
