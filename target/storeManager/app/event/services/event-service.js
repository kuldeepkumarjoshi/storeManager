(function(define) {
	"use strict";

	define([], function() {

		var EventService = function($resource, $interpolate) {
			var data = $resource('/rest/event/:operation',{
				operation:"@operation"
			},
			{
				getEventForGrid:{
					method : 'GET',
					params : {
						operation : 'getAll'
					}
				},
				beforeCreate:{
					method : 'GET',
					params : {
						operation : 'beforeCreate'
					}
				},
				beforeEdit:{
					method : 'GET',
					params : {
						operation : 'beforeEdit'
					}
				},
				deleteEvent:{
					method:'DELETE',
					params:{
						operation:'delete'
					}
				},
				saveEvent:{
					method:'POST',
					params:{
						operation:'save'
					}
				}
			});

			return data;
		};

		return [ '$resource', '$interpolate', EventService ];
	});
}(define));