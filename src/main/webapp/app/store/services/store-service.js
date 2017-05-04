(function(define) {
	"use strict";

	define([], function() {

		var StoreService = function($resource, $interpolate) {
			var data = $resource('/storeManager/rest/store/:operation/:id',{
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