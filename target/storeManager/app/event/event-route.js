(function(define){
	"use strict";

	define([], function() {

		var EventRoute = function ($routeProvider, $stateProvider) {
			$stateProvider.state('Event',{
	            url:'/event',
	            templateUrl: 'app/event/views/event.html',
	            controller: 'EventCtrl',
	            resolve: {
					EventData : ['EventService','$stateParams', function (EventService,$stateParams) {
                    	return EventService.getEventForGrid().$promise.then(function(response){
                    		return response;
                    	});
                    }]
                },
	            data: {
                    displayName: 'Event'
                }
	        });
		}
	return ['$routeProvider', '$stateProvider', EventRoute];
	});

}(define));