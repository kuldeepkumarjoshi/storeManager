(function(define) {
	"use strict";

	define([], function() {

		var HomePageService = function($resource, $interpolate) {
			var data = $resource('/rest/HomePage/:operation',{
				operation:"@operation"
			}, 
			{
				getHomePageForGrid:{
					method : 'GET',
					params : {
						operation : 'data.do'
					}
				},
				getHomePageForEdit:{
					method : 'GET',
					params : {
						operation : 'beforeEdit'
					}
				},
				getHomePageForProfile:{
					method : 'GET',
					params : {
						operation : 'showDetail.do'
					}
				},
				deleteHomePage:{
					method:'DELETE',
					params:{
						operation:'delete'
					}
				},
				saveHomePage:{
					method:'POST',
					params:{
						operation:'save'
					}
				}
			});

			return data;
		};

		return [ '$resource', '$interpolate', HomePageService ];
	});
}(define));