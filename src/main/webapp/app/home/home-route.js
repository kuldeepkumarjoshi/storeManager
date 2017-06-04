(function(define){
	"use strict";
	
	define([], function() {
		
		var HomeRoute = function ($routeProvider, $stateProvider) {
			$stateProvider.state('Home',{
	            url:'/home',
	            templateUrl: 'app/home/views/home-page.html',
	            controller: 'HomePageCtrl',
	            resolve: {
	            	DashboadData : ['HomePageService','$stateParams', function (HomePageService,$stateParams) {
	            		var obj={
	            				status:'IN_PROGRESS'
	            		};
                    	return HomePageService.getDashboadData(obj).$promise.then(function(response){
                    		return response;
                    	});
                    }]
                },
	            
	            data: {
                    displayName: 'Home'
                }
	        });
		}    
	return ['$routeProvider', '$stateProvider', HomeRoute];	
	});
	    
}(define));