(function(define){
	"use strict";

	define([], function() {

		var OrderRoute = function ($routeProvider, $stateProvider) {
			$stateProvider.state('order',{
	            url:'/orders',
	            templateUrl: 'app/order/views/order-home.html',
	            controller: 'OrderHomeCtrl',
	            resolve: {
					OrderData : ['OrderService','$stateParams', function (OrderService,$stateParams) {
                    	return OrderService.getGridDataForOrderPage().$promise.then(function(response){
                    		return response;
                    	});
                    }]
                },
	            data: {
                    displayName: 'Order'
                }
	        }).state('orderCreate',{
	            url:'/order-createEdit?id',
	            templateUrl: 'app/order/views/order-createEdit.html',
	            controller: 'OrderCreateEditCtrl',	
	            resolve: {
	            	OrderProductData : ['OrderService','$stateParams', function (OrderService,$stateParams) {
	            		if($stateParams.id == null || $stateParams.id == undefined ){
	            			return OrderService.getBeforeCreate().$promise.then(function(response){
	                    		return response;
	                    	});
	            		}else{
	            			var obj={
	            				orderId : 	$stateParams.id,
	            			};
	            			return OrderService.getBeforeEdit(obj).$promise.then(function(response){
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
	return ['$routeProvider', '$stateProvider', OrderRoute];
	});

}(define));