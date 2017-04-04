(function(define){
	"use strict";
	
	define(['common/common',
	        'about/about-route',
	        'about/controllers/about-ctrl',
	        'about/services/about-service'], 
			function(common, AboutRoute, AboutCtrl, AboutService) {
		
		var moduleName = 'aboutPage';
		angular.module(moduleName, [common, 'ui.grid', 'restResource', 'services.i18nNotifications'])
				.config(AboutRoute)
				.controller('AboutCtrl', AboutCtrl)
				.factory('AboutService', AboutService);
		return moduleName;
	});
	
}(define));