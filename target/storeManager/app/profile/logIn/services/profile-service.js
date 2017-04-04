(function(define) {
	"use strict";

	define([], function() {

		var ProfileService = function($resource, $interpolate) {
			var data = $resource('/rest/LogIn/:operation',{
				operation:"@operation"
			},
			{
				getLogInForGrid:{
					method : 'GET',
					params : {
						operation : 'data.do'
					}
				},
				getLogInForEdit:{
					method : 'GET',
					params : {
						operation : 'beforeEdit'
					}
				},
				getLogInForProfile:{
					method : 'GET',
					params : {
						operation : 'showDetail.do'
					}
				},
				deleteLogIn:{
					method:'DELETE',
					params:{
						operation:'delete'
					}
				},
				saveLogIn:{
					method:'POST',
					params:{
						operation:'save'
					}
				}
			});

			return data;
		};

		return [ '$resource', '$interpolate', ProfileService ];
	});
}(define));