(function(define){
	"use strict";

	define([], function() {

		var ZoneRoute = function ($routeProvider, $stateProvider) {
			$stateProvider.state('zone',{
	            url:'/zones',
	            templateUrl: 'app/zone/views/zone-home.html',
	            controller: 'ZoneHomeCtrl',
	            resolve: {
					ZoneHomeData : ['ZoneService','$stateParams', function (ZoneService,$stateParams) {
                    	return ZoneService.getAllZonesForZonePage().$promise.then(function(response){
                    		return response;
                    	});
                    }]
                },
	            data: {
                    displayName: 'Zone'
                }
	        }).state('zoneCreate',{
	            url:'/zone-createEdit?id',
	            templateUrl: 'app/zone/views/zone-createEdit.html',
	            controller: 'ZoneCreateEditCtrl',	
	            resolve: {
	            	ZoneData : ['ZoneService','StoreService','$stateParams', function (ZoneService,StoreService,$stateParams) {
	            		if($stateParams.id == null || $stateParams.id == undefined ){
	            			return {id:null,name:""};
	            		}else{
	            			var obj={
	            				zoneId : 	$stateParams.id,
	            			};
	            			return StoreService.getAllByZoneId(obj).$promise.then(function(response){
	                    		return response;
	                    	});
	            		}
                    	
                    }]
                },
	            data: {
                    displayName: 'Product'
                }
	        });
		}
	return ['$routeProvider', '$stateProvider', ZoneRoute];
	});

}(define));