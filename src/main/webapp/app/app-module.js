(function(define, angular) {
	"use strict";

	define(['app-ctrl','home/home-module','contactUs/contactUs-module','about/about-module','store/store-module','zone/zone-module'
	        ,'order/order-module','ourServices/ourServices-module','profile/profile-module','event/event-module','user/user-module'],
			function(AppCtrl,homePage,contactUs,about,store,zone,order,ourService,profile,event,user) {

		/**
         * Specify main application dependencies...
         * one of which is the Authentication module.
         *
         * @type {Array}
         */
		var app, appName = "app.eventManagement";

		/**
         * Start the main application
         *
         * We manually start this bootstrap process; since ng:app is gone
         * ( necessary to allow Loader splash pre-AngularJS activity to finish properly )
         */

		app = angular.module(appName, ['ngRoute','angular-loading-bar','ngAnimate',homePage,contactUs,about,store,zone,order,ourService,profile,event,user])
		                               .controller('AppCtrl', AppCtrl)
		                               .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
		                            	  
		                            	   //---to custmize loading bar
		                            	   /* cfpLoadingBarProvider.includeBar = false;
		                            	   cfpLoadingBarProvider.includeSpinner = false;
		                            	   cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">Loading...</div>';
		                            	   cfpLoadingBarProvider.latencyThreshold = 500;
		                            	//--- ignore a particular $http GET:
		                            	   $http.get('/status', {
		                            	     ignoreLoadingBar: true
		                            	   });*/

		                               	}]);


        angular.bootstrap(document.getElementsByTagName("html")[0], [appName]);
        return app;
	});

}(define, angular));