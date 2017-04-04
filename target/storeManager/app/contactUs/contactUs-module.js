(function(define){
	"use strict";
	
	define(['common/common',
	        'contactUs/contactUs-route',
	        'contactUs/controllers/contact-Us-ctrl',
	        'contactUs/services/contact-Us-service'], 
			function(common, ContactUsRoute, ContactUsCtrl, ContactUsService) {
		
		var moduleName = 'contactUs';
		angular.module(moduleName, [common, 'ui.grid', 'restResource', 'services.i18nNotifications'])
				.config(ContactUsRoute)
				.controller('ContactUsCtrl', ContactUsCtrl)
				.factory('ContactUsService', ContactUsService);
		return moduleName;
	});
	
}(define));