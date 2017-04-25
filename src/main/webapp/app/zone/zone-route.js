(function(define){
	"use strict";

	define([], function() {

		var ZoneRoute = function ($routeProvider, $stateProvider) {
			$stateProvider.state('zone',{
	            url:'/zones',
	            templateUrl: 'app/zone/views/zone.html',
	            controller: 'ZoneCtrl',
	            resolve: {
					ZoneData : ['ZoneService','$stateParams', function (ZoneService,$stateParams) {
                    	return ZoneService.getAllZones().$promise.then(function(response){
                    		return response;
                    	});
                    }]
                },
	            data: {
                    displayName: 'Zone'
                }
	        });
		}
	return ['$routeProvider', '$stateProvider', ZoneRoute];
	});

}(define));