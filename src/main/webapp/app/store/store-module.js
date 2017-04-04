(function(define){
	"use strict";
	
	define(['common/common',
	        'store/store-route',
	        'store/controllers/store-ctrl',
	        'store/services/store-service'], 
			function(common, StoreRoute, StoreCtrl, StoreService) {
		
		var moduleName = 'storePage';
		angular.module(moduleName, [common, 'ui.grid', 'restResource', 'services.i18nNotifications'])
				.config(StoreRoute)
				.controller('StoreCtrl', StoreCtrl)
				.factory('StoreService', StoreService);
		return moduleName;
	});
	
}(define));