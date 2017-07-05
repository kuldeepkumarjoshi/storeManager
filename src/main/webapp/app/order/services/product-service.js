(function(define) {
	"use strict";

	define([], function() {

		var ProductService = function($resource, $interpolate) {
			var data = $resource('/rest/product/:operation/:id',{
				id:"@id",
				operation:"@operation"
			},
			{ 	getAllOrderProducts:{
					method : 'GET',
					url:'/rest/product/getAllOrderProducts',
					
				},
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