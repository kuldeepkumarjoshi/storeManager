(function(define){
	"use strict";

	define([], function() {

		var StoreRoute = function ($routeProvider, $stateProvider) {
			$stateProvider.state('store',{
	            url:'/stores?id',
	            templateUrl: 'app/store/views/store-home.html',
	            controller: 'StoreHomeCtrl',
	            resolve: {
					StoreHomeData : ['StoreService','$stateParams', function (StoreService,$stateParams) {
						
						if($stateParams.id == null || $stateParams.id == undefined ){
							return StoreService.getAllStores().$promise.then(function(response){
	                    		return response;
	                    	});
						}else{
							var obj={
									zoneId:$stateParams.id
							};
							return StoreService.getAllByZoneId(obj).$promise.then(function(response){
	                    		return response;
	                    	});
						}
                    	
                    }]
                },
	            data: {
                    displayName: 'Store'
                }
	        }).state('store-create',{
	            url:'/store-createEdit',
	            templateUrl: 'app/store/views/store-createEdit.html',
	            controller: 'StoreCreateEditCtrl',	           
	            data: {
                    displayName: 'Store-Create'
                }
	        });
		}
	return ['$routeProvider', '$stateProvider', StoreRoute];
	});

}(define));