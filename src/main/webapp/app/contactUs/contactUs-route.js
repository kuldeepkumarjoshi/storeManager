(function(define){
	"use strict";
	
	define([], function() {
		
		var ContactUsRoute = function ($routeProvider, $stateProvider) {
			$stateProvider.state('Contact',{
	            url:'/contact',
	            templateUrl: 'app/contactUs/views/contact-Us.html',
	            controller: 'ContactUsCtrl',
	            data: {
                    displayName: 'Home'
                }
	        });
		}    
	return ['$routeProvider', '$stateProvider', ContactUsRoute];	
	});
	    
}(define));