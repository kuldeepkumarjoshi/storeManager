(function(define){
	"use strict";

	define([], function() {

		var OurServiceRoute = function ($routeProvider, $stateProvider) {
			$stateProvider.state('OurService',{
	            url:'/ourService',
	            templateUrl: 'app/ourServices/views/ourService.html',
	            controller: 'OurServiceCtrl',
	            data: {
                    displayName: 'OurService'
                }
	        });
		}
	return ['$routeProvider', '$stateProvider', OurServiceRoute];
	});

}(define));