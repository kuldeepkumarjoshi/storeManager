(function(define){
	"use strict";
	
	define(['common/common',
	        'store/store-route',
	        'store/controllers/store-home-ctrl',
	        'store/controllers/store-createEdit-ctrl',
	        'store/services/store-service'], 
			function(common, StoreRoute, StoreHomeCtrl,StoreCreateEditCtrl, StoreService) {
		
		var moduleName = 'storePage';
		angular.module(moduleName, [common, 'ui.grid.exporter', 'ui.grid.autoResize','ui.grid.resizeColumns','ui.grid.selection','ui.grid.edit', 'ui.grid.cellNav'])
				.config(StoreRoute)
				.controller('StoreHomeCtrl', StoreHomeCtrl)
				.controller('StoreCreateEditCtrl', StoreCreateEditCtrl)
				.factory('StoreService', StoreService);
		return moduleName;
	});
	
}(define));
