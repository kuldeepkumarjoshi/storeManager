(function(define) {
	"use strict";

	define([], function() {

		var AboutService = function($resource, $interpolate) {
			var data = $resource('/rest/About/:operation',{
				operation:"@operation"
			}, 
			{
				getAboutForGrid:{
					method : 'GET',
					params : {
						operation : 'data.do'
					}
				},
				getAboutForEdit:{
					method : 'GET',
					params : {
						operation : 'beforeEdit'
					}
				},
				getAboutForProfile:{
					method : 'GET',
					params : {
						operation : 'showDetail.do'
					}
				},
				deleteAbout:{
					method:'DELETE',
					params:{
						operation:'delete'
					}
				},
				saveAbout:{
					method:'POST',
					params:{
						operation:'save'
					}
				}
			});

			return data;
		};

		return [ '$resource', '$interpolate', AboutService ];
	});
}(define));