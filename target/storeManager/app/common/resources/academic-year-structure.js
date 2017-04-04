(function(define){
	"use strict";
	
	define([], function() {
		var AcademicyearstructureResource = function (restResource, $http, $interpolate) {
			var Academicyearstructure = restResource('/rest/academicYear/');
		    return Academicyearstructure;
		};
    	return ['restResource', '$http', '$interpolate', AcademicyearstructureResource ];
	});
}(define));
