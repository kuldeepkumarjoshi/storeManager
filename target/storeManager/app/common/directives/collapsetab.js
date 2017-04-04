(function(define){
	"use strict";
	
	define([], function() {
		
		var moduleName = 'directives.collapsetab';
		angular.module(moduleName, [])
			.directive('collapsetab', function () {
			    return {
			        restrict: "E",
			        templateUrl: "app-ace/common/collapsetab.tpl.html"
			    };
			});
		
		return moduleName;
	});
	
}(define));