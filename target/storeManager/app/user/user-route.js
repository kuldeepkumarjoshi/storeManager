(function(define){
	"use strict";

	define([], function() {

		var UserRoute = function ($routeProvider, $stateProvider) {
			$stateProvider.state('User',{
	            url:'/user',
	            templateUrl: 'app/user/views/user.html',
	            controller: 'UserCtrl',
	            resolve: {
					UserData : ['UserService','$stateParams', function (UserService,$stateParams) {
                    	return UserService.getUserForGrid().$promise.then(function(response){
                    		return response;
                    	});
                    }]
                },
	            data: {
                    displayName: 'User'
                }
	        })
	        .state('Requester',{
	            url:'/requester',
	            templateUrl: 'app/user/views/requester.html',
	            controller: 'RequesterCtrl',
	            resolve: {
					UserData : ['RequesterService','$stateParams', function (RequesterService,$stateParams) {
                    	return RequesterService.getRequesterForGrid().$promise.then(function(response){
                    		return response;
                    	});
                    }]
                },
	            data: {
                    displayName: 'Requester'
                }
	        });
		}
	return ['$routeProvider', '$stateProvider', UserRoute];
	});

}(define));