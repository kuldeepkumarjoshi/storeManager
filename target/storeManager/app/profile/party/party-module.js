(function(define){
	"use strict";
	
	define(['common/common',
	        'profile/party/party-route',
	        'profile/party/controllers/party-home-ctrl',
	        'profile/party/controllers/party-create-edit-ctrl',
	        'profile/party/services/party-service'], 
			function(common, PartyRoute, PartyHomeCtrl,PartyCreateEditCtrl,PartyService) {
		
		var moduleName = 'party';
		angular.module(moduleName, [common, 'ui.grid', 'restResource', 'services.i18nNotifications'])
				.config(PartyRoute)
				.controller('PartyHomeCtrl', PartyHomeCtrl)
				.controller('PartyCreateEditCtrl',PartyCreateEditCtrl)
				.factory('PartyService', PartyService);
		return moduleName;
	});
	
}(define));