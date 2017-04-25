(function(define){
	"use strict";
	
	define(['common/common',
	        'zone/zone-route',
	        'zone/controllers/zone-ctrl',
	        'zone/services/zone-service'], 
			function(common, ZoneRoute, ZoneCtrl, ZoneService) {
		
		var moduleName = 'zonePage';
		angular.module(moduleName, [common, 'ui.grid.exporter', 'ui.grid.autoResize','ui.grid.selection','ui.grid.edit', 'ui.grid.cellNav'])
				.config(ZoneRoute)
				.controller('ZoneCtrl', ZoneCtrl)
				.factory('ZoneService', ZoneService);
		return moduleName;
	});
	
}(define));