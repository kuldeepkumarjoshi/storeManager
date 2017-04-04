(function(define){
	"use strict";
	
	define(['common/common',
	        'profile/manager/home-route',
	        'profile/manager/controllers/home-page-ctrl',
	        'profile/manager/services/home-page-service'], 
			function(common, ManagerRoute, ManagerCtrl, ManagerService) {
		
		var moduleName = 'manager';
		angular.module(moduleName, [common, 'ui.grid', 'restResource', 'services.i18nNotifications'])
				.config(ManagerRoute)
				.controller('ManagerCtrl', ManagerCtrl)
				.factory('ManagerService', ManagerService);
		return moduleName;
	});
	
}(define));