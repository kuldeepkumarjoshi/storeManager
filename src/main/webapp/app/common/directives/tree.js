(function(define){
	"use strict";
	
	define([], function() {
		
		var moduleName = 'directives.tree';
		angular.module(moduleName, [])
			.directive('tree', function () {
			    return {
			        restrict: "E",
			        templateUrl: "app/common/tree.tpl.html"
			    };
			})
			.directive('csttree', function () {
			    return {
			        restrict: "E",
			        templateUrl: "app/common/csttree.tpl.html"
			    };
			});
		
		return moduleName;
	});
	
}(define));



