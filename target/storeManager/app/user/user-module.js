(function(define){
	"use strict";

	define(['common/common',
	        'user/user-route',
	        'user/controllers/user-ctrl',
	        'user/manager/user-manager',
	        'user/services/user-service',
	        'user/controllers/requester-ctrl',
	        'user/manager/requester-manager',
	        'user/services/requester-service'],
			function(common, UserRoute, UserCtrl,UserManager, UserService,RequesterCtrl,RequesterManager,RequesterService) {

		var moduleName = 'user';
		angular.module(moduleName, [common,'ui.grid.exporter', 'ui.grid.autoResize','ui.grid.selection','ui.grid.edit', 'ui.grid.cellNav'])
				.config(UserRoute)
				.controller('UserCtrl', UserCtrl)
				.controller('RequesterCtrl', RequesterCtrl)
				.factory('UserManager', UserManager)
				.factory('RequesterManager', RequesterManager)
				.factory('UserService', UserService)
				.factory('RequesterService', RequesterService);
		return moduleName;
	});

}(define));	