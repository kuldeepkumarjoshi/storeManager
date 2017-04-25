(function(define){
	"use strict";
	
	define(['common/common',
	        'order/order-route',
	        'order/controllers/order-ctrl',
	        'order/controllers/order-create-ctrl',
	        'order/services/order-service',
	        'order/services/product-service'], 
			function(common, OrderRoute, OrderCtrl,OrderCreateCtrl, OrderService,ProductService) {
		
		var moduleName = 'orderPage';
		angular.module(moduleName, [common, 'ui.grid.exporter', 'ui.grid.autoResize','ui.grid.selection','ui.grid.edit', 'ui.grid.cellNav'])
				.config(OrderRoute)
				.controller('OrderCtrl', OrderCtrl)
				.controller('OrderCreateCtrl', OrderCreateCtrl)
				.factory('OrderService', OrderService)
				.factory('ProductService', ProductService);
		return moduleName;
	});
	
}(define));