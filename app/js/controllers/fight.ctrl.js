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
	
	// Combat log 
	var combatlog = [];

	var fightNumber = 1;

	function loadRound() {
		Round.get(fight.round, function success(round){
			var delta = 0;
			if (round.userCurrentHp < fight.data.userCurrentHp) {
				// dmg received
				loadFightAnimations($('body'), 'jello');

				delta = Math.abs(round.userCurrentHp - fight.data.userCurrentHp);
				combatlog.unshift({round: fightNumber, action: 'Damage received', dmg: delta });

			} else if (round.monsterCurrentHp < fight.data.monsterCurrentHp) {
				// dmg done
				loadFightAnimations($('#fightMonster'), 'shake');

				delta = Math.abs(round.monsterCurrentHp - fight.data.monsterCurrentHp);
				combatlog.unshift({round: fightNumber, action: 'Damage monster', dmg: delta });
			} else {
				// fizzle
				loadFightAnimations($('#fightMonster'), 'flipOutX');
				combatlog.unshift({round: fightNumber, action: 'Miss', dmg: 0 });
			}

			GameData.setFightData(round);
			fight.data = round;
			fight.combatlogs = combatlog;

			// Check if player now dead
			if (round.userCurrentHp <= 0) {
				$('body').addClass('animated fadeOutDown');
				$('body').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
					$('body').removeClass('animated fadeOutDown');
					$location.path('defeat');
					loadUserData();
				});
			}
			
			// Check if monster now dead
			if (round.monsterCurrentHp <= 0) {
				$('#fightMonster').addClass('animated hinge');
				$('#fightMonster').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
					$('#fightMonster').removeClass('animated hinge');
					$location.path('victory');
					loadUserData();
				});
			}

			fightNumber++;
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

	function loadFightAnimations(obj, animationClass){
		obj.addClass('animated ' + animationClass);
		obj.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			obj.removeClass('animated ' + animationClass);
		});
	}
}]);

//Setup resource for signing up for an account
angular.module('app').factory('Round', ['APIDOMAIN', '$resource', function(APIDOMAIN, $resource) {
	return $resource(APIDOMAIN + '/fights/round');
}]);
