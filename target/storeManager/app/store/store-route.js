(function(define){
	"use strict";

	define([], function() {

		var StoreRoute = function ($routeProvider, $stateProvider) {
			$stateProvider.state('store',{
	            url:'/store',
	            templateUrl: 'app/store/views/store.html',
	            controller: 'StoreCtrl',
	            data: {
                    displayName: 'Gallery'
                }
	        });
		}
	return ['$routeProvider', '$stateProvider', StoreRoute];
	});

}(define));