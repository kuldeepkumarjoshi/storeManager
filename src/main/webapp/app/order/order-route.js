(function(define){
	"use strict";

	define([], function() {

		var OrderRoute = function ($routeProvider, $stateProvider) {
			$stateProvider.state('order',{
	            url:'/orders',
	            templateUrl: 'app/order/views/order.html',
	            controller: 'OrderCtrl',
	            resolve: {
					OrderData : ['OrderService','$stateParams', function (OrderService,$stateParams) {
                    	return OrderService.getAllOrders().$promise.then(function(response){
                    		return response;
                    	});
                    }]
                },
	            data: {
                    displayName: 'Order'
                }
	        }).state('orderCreate',{
	            url:'/order-create',
	            templateUrl: 'app/order/views/order-create.html',
	            controller: 'OrderCreateCtrl',	
	            resolve: {
					ProductData : ['ProductService','$stateParams', function (ProductService,$stateParams) {
                    	return ProductService.getAllProducts().$promise.then(function(response){
                    		return response;
                    	});
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