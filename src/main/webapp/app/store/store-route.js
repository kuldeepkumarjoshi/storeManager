(function(define){
	"use strict";

	define([], function() {

		var StoreRoute = function ($routeProvider, $stateProvider) {
			$stateProvider.state('store',{
	            url:'/stores?zoneId',
	            templateUrl: 'app/store/views/store-home.html',
	            controller: 'StoreHomeCtrl',
	            resolve: {
					StoreHomeData : ['StoreService','$stateParams', function (StoreService,$stateParams) {
						var obj = {
								zoneId:$stateParams.zoneId
						};
							return StoreService.getGridDataForStorePage(obj).$promise.then(function(response){
	                    		return response;
	                    	});						                    	
                    }]
                },
	            data: {
                    displayName: 'Store'
                }
	        }).state('store-create',{
	            url:'/store-createEdit?id',
	            templateUrl: 'app/store/views/store-createEdit.html',
	            controller: 'StoreCreateEditCtrl',	           
	            resolve: {
					StoreData : ['StoreService','OrderService','$stateParams', function (StoreService,OrderService,$stateParams) {
						
						if($stateParams.id == null || $stateParams.id == undefined ){
							return StoreService.getBeforeCreate().$promise.then(function(response){
	                    		return response;
	                    	});
						}else{
							var obj={
									storeId:$stateParams.id
							};
							return OrderService.getAllByStore(obj).$promise.then(function(response){
	                    		return response;
	                    	});
						}                    	
                    }]
                },
                data: {
                    displayName: 'Store-Create'
                }
	        });
		}
	return ['$routeProvider', '$stateProvider', StoreRoute];
	});

}(define));