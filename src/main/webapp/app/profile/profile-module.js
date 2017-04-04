(function(define){
	"use strict";

	define(['common/common',
	        'profile/profile-route',
	        'profile/logIn/controllers/profile-ctrl',
	        'profile/logIn/services/profile-service',
	        'profile/party/party-module'],
			function(common, ProfileRoute,ProfileCtrl,ProfileService,party) {

		var moduleName = 'profile';
		angular.module(moduleName, [common, 'ui.grid', 'restResource', 'services.i18nNotifications',party])
				.config(ProfileRoute)
				.controller('ProfileCtrl', ProfileCtrl)
				.factory('ProfileService', ProfileService);
		return moduleName;
	});

}(define));