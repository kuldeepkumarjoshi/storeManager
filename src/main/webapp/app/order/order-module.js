(function(define){
	"use strict";
	
	define(['common/common',
	        'order/order-route',
	        'order/controllers/order-home-ctrl',
	        'order/controllers/order-createEdit-ctrl',
	        'order/services/order-service',
	        'order/services/product-service'], 
			function(common, OrderRoute, OrderHomeCtrl,OrderCreateEditCtrl, OrderService,ProductService) {
		
		var moduleName = 'orderPage';
		angular.module(moduleName, [common, 'ui.grid.exporter', 'ui.grid.autoResize','ui.grid.selection','ui.grid.edit', 'ui.grid.cellNav'])
				.config(OrderRoute)
				.controller('OrderHomeCtrl', OrderHomeCtrl)
				.controller('OrderCreateEditCtrl', OrderCreateEditCtrl)
				.factory('OrderService', OrderService)
				.factory('ProductService', ProductService);
		return moduleName;
	});
	
}(define));