(function(define){
	"use strict";
	
	define([], function() {
		var TermdataResource = function (restResource, $http, $interpolate) {
			var TermData = restResource('/rest/academicYear/');
		    return TermData;
		};
    	return ['restResource', '$http', '$interpolate', TermdataResource ];
	});
}(define));