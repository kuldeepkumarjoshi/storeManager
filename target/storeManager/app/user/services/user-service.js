(function(define) {
	"use strict";

	define([], function() {

		var UserService = function($resource, $interpolate) {
			var data = $resource('/rest/user/:operation',{
				operation:"@operation"
			},
			{
				getUserForGrid:{
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
				deleteUser:{
					method:'DELETE',
					params:{
						operation:'delete'
					}
				},
				saveUser:{
					method:'POST',
					params:{
						operation:'save'
					}
				}
			});

			return data;
		};

		return [ '$resource', '$interpolate', UserService ];
	});
}(define));