(function(define){
	"use strict";
	
	define(['common/common',
	        'store/store-route',
	        'store/controllers/store-ctrl',
	        'store/controllers/store-create-ctrl',
	        'store/services/store-service'], 
			function(common, StoreRoute, StoreCtrl,StoreCreateCtrl, StoreService) {
		
		var moduleName = 'storePage';
		angular.module(moduleName, [common, 'ui.grid.exporter', 'ui.grid.autoResize','ui.grid.selection','ui.grid.edit', 'ui.grid.cellNav'])
				.config(StoreRoute)
				.controller('StoreCtrl', StoreCtrl)
				.controller('StoreCreateCtrl', StoreCreateCtrl)
				.factory('StoreService', StoreService);
		return moduleName;
	});
	
}(define));