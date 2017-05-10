(function(define){
	"use strict";
	
	define(['common/common',
	        'quickOrder/quickOrder-route',
	        'quickOrder/controllers/quickOrder-base-ctrl',
	        'quickOrder/controllers/quickOrder-zone-ctrl',
	        'quickOrder/controllers/quickOrder-product-ctrl',
	        'quickOrder/controllers/quickOrder-store-ctrl'], 
			function(common, QuickOrderRoute,QuickOrderBaseCtrl, QuickOrderZoneCtrl,QuickOrderProductCtrl,QuickOrderStoreCtrl) {
		
	var moduleName = 'quickOrder';
		angular.module(moduleName, [common, 'ui.grid.exporter', 'ui.grid.autoResize','ui.grid.selection','ui.grid.edit', 'ui.grid.cellNav'])
				.config(QuickOrderRoute)
				.controller('QuickOrderBaseCtrl', QuickOrderBaseCtrl)
				.controller('QuickOrderZoneCtrl', QuickOrderZoneCtrl)
				.controller('QuickOrderProductCtrl', QuickOrderProductCtrl)
				.controller('QuickOrderStoreCtrl', QuickOrderStoreCtrl);
		return moduleName;
	});
	
}(define));