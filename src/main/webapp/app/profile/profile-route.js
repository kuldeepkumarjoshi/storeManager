(function(define){
	"use strict";

	define([], function() {

		var ProfileRoute = function ($routeProvider, $stateProvider) {
			$stateProvider.state('profile',{
	            url:'/profile',
	            templateUrl: 'app/profile/logIn/views/profile.html',
	            controller: 'ProfileCtrl',
	            data: {
                    displayName: 'Profile'
                }
	        });
		}
	return ['$routeProvider', '$stateProvider', ProfileRoute];
	});

}(define));