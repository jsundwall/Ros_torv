angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/jg_index.html',
			controller: 'MainController'
		})

		// After login
		.when('/jg_afterlogin', {
			templateUrl: 'views/jg_afterlogin.html',
			controller: 'MainController'
		})

		// Achievements
		.when('/jg_achievements', {
			templateUrl: 'views/jg_achievements.html',
			controller: 'MainController'
		})

		// Settings
		.when('/jg_settings', {
			templateUrl: 'views/jg_settings.html',
			controller: 'MainController'
		})

		// Go to map one
		.when('/jg_mapone', {
			templateUrl: 'views/jg_mapone.html',
			controller: 'MainController'
		})

		// Register
		.when('/jg_register', {
			templateUrl: 'views/jg_register.html',
			controller: 'MainController'
		})

		// Map One
		.when('/jg_maptwo', {
			templateUrl: 'views/jg_maptwo.html',
			controller: 'MainController'
		})

		// Banana Catcher Game
		.when('/jg_bananacatcher', {
			templateUrl: 'views/jg_bananacatcher.html',
			controller: 'MainController'
		})

		// Fish game
		.when('/jg_fishgame', {
			templateUrl: 'views/jg_fishgame.html',
			controller: 'MainController'
		})

		// Forgotten Password
		.when('/jg_forgottenpassword', {
			templateUrl: 'views/jg_forgottenpassword.html',
			controller: 'MainController'
		})

	$locationProvider.html5Mode(true);

}]);
