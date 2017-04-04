(function(define) {
	"use strict";

	define([], function() {

		var RequesterService = function($resource, $interpolate) {
			var data = $resource('/rest/user/:operation',{
				operation:"@operation"
			},
			{
				getRequesterForGrid:{
					method : 'GET',
					params : {
						operation : 'getAll'
					}
				},
				getRequesterForEdit:{
					method : 'GET',
					params : {
						operation : 'beforeEdit'
					}
				},
				getRequesterForProfile:{
					method : 'GET',
					params : {
						operation : 'showDetail.do'
					}
				},
				deleteRequester:{
					method:'DELETE',
					params:{
						operation:'delete'
					}
				},
				saveRequester:{
					method:'POST',
					params:{
						operation:'save'
					}
				}
			});

			return data;
		};

		return [ '$resource', '$interpolate', RequesterService ];
	});
}(define));