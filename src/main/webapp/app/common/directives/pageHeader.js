(function(define) {
	"use strict";
	define(	[],	function() {
		var moduleName = 'directives.pageHeader';
		angular.module(moduleName, [])
		.directive('pageHeader', function() {
					return {
						   restrict:'AE',
						   replace: true,
						   scope : {    titleHtml: '=',
							   			buttonHtml: '='},
							templateUrl: 'app/common/templates/pageHeader.html',
							link: function(scope, elem, attrs) {
							    
							},
						
					}
				});
				return moduleName;
			});

}(define));
