(function(define){
	"use strict";
	
	define(['common/common',
	        'zone/zone-route',
	        'zone/controllers/zone-home-ctrl',
	        'zone/controllers/zone-createEdit-ctrl',
	        'zone/services/zone-service'], 
			function(common, ZoneRoute, ZoneHomeCtrl,ZoneCreateEditCtrl, ZoneService) {
		
		var moduleName = 'zonePage';
		angular.module(moduleName, [common, 'ui.grid.exporter', 'ui.grid.autoResize','ui.grid.selection','ui.grid.edit', 'ui.grid.cellNav'])
				.config(ZoneRoute)
				.controller('ZoneHomeCtrl', ZoneHomeCtrl)
				.controller('ZoneCreateEditCtrl', ZoneCreateEditCtrl)
				.factory('ZoneService', ZoneService);
		return moduleName;
	});
	
}(define));