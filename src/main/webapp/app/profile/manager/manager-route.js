(function(define){
	"use strict";
	
	define([], function() {
		
		var HomeRoute = function ($routeProvider, $stateProvider) {
			$stateProvider.state('Home',{
	            url:'/home',
	            templateUrl: 'app/home/views/home-page.html',
	            controller: 'HomePageCtrl',
	            data: {
                    displayName: 'Home'
                }
	        });
		}    
	return ['$routeProvider', '$stateProvider', HomeRoute];	
	});
	    
}(define));