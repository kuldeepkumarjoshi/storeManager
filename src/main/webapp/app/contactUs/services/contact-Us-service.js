(function(define) {
	"use strict";

	define([], function() {

		var ContactUsService = function($resource, $interpolate) {
			var data = $resource('/eventManagment/rest/contactUs/:operation',{
				operation:"@operation"
			},
			{
				sendMail:{
					method : 'POST',
					params : {
						operation : 'sendMail'
					}
				}
			});

			return data;
		};

		return [ '$resource', '$interpolate', ContactUsService ];
	});
}(define));