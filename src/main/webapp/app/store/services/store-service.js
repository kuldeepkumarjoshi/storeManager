(function(define) {
	"use strict";

	define([], function() {

		var StoreService = function($resource, $interpolate) {
			var data = $resource('/rest/store/:operation/:id',{
				id:"@id",
				operation:"@operation"
			},
			{
				getAllStores:{
					method : 'GET',
					params : {
						operation : 'getAll'
					}
				},
				save:{
					method : 'POST',
					url:'/rest/store/save'
				},
				getBeforeCreate:{
					method : 'GET',
					params : {
						operation : 'getBeforeCreate'
					}
				},
				getAllByZoneId:{
					method : 'GET',
					params : {
						operation : 'getAllByZoneId'
					}
				}
			});

			return data;
		};

		return [ '$resource', '$interpolate', StoreService ];
	});
}(define));