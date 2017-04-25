(function(define){
	"use strict";

	define([], function() {

		var StoreRoute = function ($routeProvider, $stateProvider) {
			$stateProvider.state('store',{
	            url:'/stores?id',
	            templateUrl: 'app/store/views/store.html',
	            controller: 'StoreCtrl',
	            resolve: {
					StoreData : ['StoreService','$stateParams', function (StoreService,$stateParams) {
						
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
	            url:'/store-create',
	            templateUrl: 'app/store/views/store-create.html',
	            controller: 'StoreCreateCtrl',	           
	            data: {
                    displayName: 'Store-Create'
                }
	        });
		}
	return ['$routeProvider', '$stateProvider', StoreRoute];
	});

}(define));