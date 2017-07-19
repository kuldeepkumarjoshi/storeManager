(function(define){
	"use strict";

	define([], function() {

		var QuickOrderRoute = function ($routeProvider, $stateProvider) {
			$stateProvider.state('quickOrder',{
	            url:'/quickOrder',
	            templateUrl: 'app/quickOrder/views/quickOrder-base.html',
	            controller: 'QuickOrderBaseCtrl',                
	            data: {
                    displayName: 'QuickOrderBase'
                }
	        }).state('quickOrder.selectZone',{
	            url:'/selectZone',
	            templateUrl: 'app/quickOrder/views/quickOrder-zonePage.html',
	            controller: 'QuickOrderZoneCtrl',
	            resolve: {
	            	QuickOrderZoneData : ['ZoneService','$stateParams', function (ZoneService,$stateParams) {
                    	return ZoneService.getAllZones().$promise.then(function(response){
                    		return response;
                    	});
                    }]
                },
	            data: {
                    displayName: 'QuickOrderZone'
                }
	        }).state('quickOrder.selectStore',{
	            url:'/selectStore?id',
	            templateUrl: 'app/quickOrder/views/quickOrder-storePage.html',
	            controller: 'QuickOrderStoreCtrl',	
	            resolve: {
	            	QuickOrderStoreData : ['StoreService','$stateParams', function (StoreService,$stateParams) {
						
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
                    displayName: 'QuickOrderStore'
                }
	        }).state('quickOrder.selectProduct',{
	            url:'/selectProduct',
	            templateUrl: 'app/quickOrder/views/quickOrder-productPage.html',
	            controller: 'QuickOrderProductCtrl',	
	            resolve: {
	            	QuickOrderProductData : ['ProductService','$stateParams', function (ProductService,$stateParams) {
                    	return ProductService.getAllOrderProducts().$promise.then(function(response){
                    		return response;
                    	});
                    }]
                },
	            data: {
                    displayName: 'QuickOrderProduct'
                }
	        });
		}
	return ['$routeProvider', '$stateProvider', QuickOrderRoute];
	});

}(define));