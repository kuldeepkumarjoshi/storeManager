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
				getGridDataForOrderPage:{
					method:'GET',
					params:{
						operation :'getGridDataForOrderPage'
					}
				},
				getBeforeEdit:{
					method :'GET',
					params : {
						operation :'getBeforeEdit'
					}
				},
				getAllByStore:{
					method : 'GET',
					params : {
						operation : 'getAllByStore'
					}
				},
				deleteOrder:{
					method : 'DELETE',
					url:'/rest/order/delete'
					
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