(function(define) {
	"use strict";

	define([], function() {

		var ZoneService = function($resource, $interpolate) {
			var data = $resource('/rest/zone/:operation/:id',{
				id:"@id",
				operation:"@operation"
			},
			{
				getAllZones:{
					method : 'GET',
					params : {
						operation : 'getAll'
					}
				},
				save:{
					method :'POST',
					params:{
						operation:'save'
					}
				}
			});

			return data;
		};

		return [ '$resource', '$interpolate', ZoneService ];
	});
}(define));