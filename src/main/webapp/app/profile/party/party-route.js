(function(define){
	"use strict";
	
	define([], function() {
		
		var PartyRoute = function ($routeProvider, $stateProvider) {
			$stateProvider.state('party',{
	            url:'/party',
	            templateUrl: 'app/profile/party/views/party-home.html',
	            controller: 'PartyHomeCtrl',
	            data: {
                    displayName: 'party'
                }
	        }).state('party.create',{
	            url:'/create',
	            templateUrl: 'app/profile/party/views/party-create-edit.html',
	            controller: 'PartyCreateEditCtrl',
	            data: {
                    displayName: 'create'
                }
	        });;
		}    
	return ['$routeProvider', '$stateProvider', PartyRoute];	
	});
	    
}(define));