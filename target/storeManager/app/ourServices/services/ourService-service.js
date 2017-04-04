(function(define) {
	"use strict";

	define([], function() {

		var OurServiceService = function($resource, $interpolate) {
			var data = $resource('/rest/OurService/:operation',{
				operation:"@operation"
			},
			{
				getOurServiceForGrid:{
					method : 'GET',
					params : {
						operation : 'data.do'
					}
				},
				getOurServiceForEdit:{
					method : 'GET',
					params : {
						operation : 'beforeEdit'
					}
				},
				getOurServiceForProfile:{
					method : 'GET',
					params : {
						operation : 'showDetail.do'
					}
				},
				deleteOurService:{
					method:'DELETE',
					params:{
						operation:'delete'
					}
				},
				saveOurService:{
					method:'POST',
					params:{
						operation:'save'
					}
				}
			});

			return data;
		};

		return [ '$resource', '$interpolate', OurServiceService ];
	});
}(define));