(function(define) {
	"use strict";

	define([], function() {

		var OrderService = function($resource, $interpolate) {
			var data = $resource('/storeManager/rest/order/:operation/:id',{
				id:"@id",
				operation:"@operation"
			},
			{
				getAllOrders:{
					method : 'GET',
					params : {
						operation : 'getAll'
					}
				},
				save:{
					method : 'POST',
					url:'/rest/orderProduct/save'
					
				}
			});

			return data;
		};

		return [ '$resource', '$interpolate', OrderService ];
	});
}(define));