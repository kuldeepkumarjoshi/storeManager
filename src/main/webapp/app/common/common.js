(function(define){
	"use strict";

	define(['common/header/header-module',
	        'common/directives/tree',
	        'common/directives/collapsetab',
	        'common/directives/slider',
	        'common/config-manager',
	        'common/run-manager',
	        'common/services/breadcrumbs',
	        'common/services/notifications',
	        'common/services/localizedMessages',
	        'common/services/i18nNotifications',
	        'common/services/rest-resource',
	        'common/services/logout-timer',
	        'common/services/logout-timer-config',
	        'common/services/easypiechart',
	        'common/services/uiBreadcrumbs',
	        'common/directives/listValues'],
	        function(header,  tree, collapsetab, slider, ConfigManager, RunManager, Breadcrumbs, Notifications, LocalizedMessages, I18nNotifications, RestResource, logoutTimer, LogoutTimerConfig, easyPieChart, uiBreadcrumbs, listValues) {

		// Module for BreadCrumbs
		var breadcrumb = 'services.breadcrumbs';
		angular.module(breadcrumb, []).factory('breadcrumbs', Breadcrumbs);

		// Module definitions for Notifications and i18n
		var notificationService = 'services.notifications';
		angular.module(notificationService, []).factory('notifications', Notifications);

		var localizedMessages = 'services.localizedMessages';
		angular.module(localizedMessages, []).factory('localizedMessages', LocalizedMessages);

		var i18nNotifications = 'services.i18nNotifications';
		angular.module(i18nNotifications, [notificationService, localizedMessages])
				.factory('i18nNotifications', I18nNotifications);

		// Module for Rest call
		var restResource = 'restResource';
		angular.module(restResource, []).factory('restResource', RestResource);

		// Common Module which includes all common services/modules required for app
		var moduleName = 'app.common';
		var commonModule = angular.module(moduleName, ['angular-underscore', 'pascalprecht.translate', 'ui.grid', 'ngRoute', 'ngResource', 'ui.router', 'ui.bootstrap', 'ui.select2', 'ngIdle', 'datePicker','ngSanitize', 'textAngular'
		                                               ,'angularFileUpload','ngDragDrop', 'ngAnimate',breadcrumb, header,tree, collapsetab, slider, i18nNotifications, restResource, easyPieChart, uiBreadcrumbs, listValues]);
		commonModule.run(RunManager);
		commonModule.config(ConfigManager);

		commonModule.factory('_', function () {
		    return window._; // assumes underscore has already been loaded on the page
		});

		commonModule.config(LogoutTimerConfig)
					.factory('logoutTimer', logoutTimer);

		return moduleName;
	});

}(define));