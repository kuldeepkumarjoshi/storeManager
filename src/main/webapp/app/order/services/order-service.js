(function(define) {
	"use strict";

	define([], function() {

		var OrderService = function($resource, $interpolate) {
			var data = $resource('/rest/order/:operation/:id',{
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
				getBeforeCreate:{
					method :'GET',
					params : {
						operation :'getBeforeCreate'
					}
				},
				getBeforeEdit:{
					method :'GET',
					params : {
						operation :'getBeforeEdit'
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