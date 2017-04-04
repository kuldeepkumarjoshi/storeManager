(function(define){
	"use strict";
	
	define([], function() {
		
		var AboutRoute = function ($routeProvider, $stateProvider) {
			$stateProvider.state('About',{
	            url:'/about',
	            templateUrl: 'app/about/views/about.html',
	            controller: 'AboutCtrl',
	            data: {
                    displayName: 'About'
                }
	        });
		}    
	return ['$routeProvider', '$stateProvider', AboutRoute];	
	});
	    
}(define));