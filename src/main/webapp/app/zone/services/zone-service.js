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
				saveZone:{
					method :'POST',
					url:'/rest/zone/save'
				}
			});

			return data;
		};

		return [ '$resource', '$interpolate', ZoneService ];
	});
}(define));