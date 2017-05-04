(function(define) {
	"use strict";

	define([], function() {

		var ProductService = function($resource, $interpolate) {
			var data = $resource('/storeManager/rest/product/:operation/:id',{
				id:"@id",
				operation:"@operation"
			},
			{
				getAllProducts:{
					method : 'GET',
					params : {
						operation : 'getAll'
					}
				}
			});

			return data;
		};

		return [ '$resource', '$interpolate', ProductService ];
	});
}(define));