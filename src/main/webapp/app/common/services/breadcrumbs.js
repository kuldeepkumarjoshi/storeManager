(function(define){
	"use strict";
	
	define([], function() {
		
		var Breadcrumbs = function ($rootScope, $location) {

		    var breadcrumbs = [];
		    var breadcrumbsService = {};

		    //we want to update breadcrumbs only when a route is actually changed
		    //as $location.path() will get updated imediatelly (even if route change fails!)
		    // Use $routeChangeSuccess if NOT using ui-route
		    $rootScope.$on('$stateChangeSuccess', function (event, current) {
		        var pathElements = $location.path().split('/'), result = [], i;
		        /**
		         * Description
		         * @method breadcrumbPath
		         * @param {} index
		         * @return BinaryExpression
		         */
		        var breadcrumbPath = function (index) {
		            return (pathElements.slice(0, index + 1)).join('/');
		        };
		        
		        //pathElements.shift();
		        pathElements.shift();
		        var previous = {};
		        
		        for (i = 0; i < pathElements.length; i++) {
		            var capitalized = pathElements[i].charAt(0).toUpperCase() + pathElements[i].substring(1);
		            var pathElement = {name: capitalized.replace("-", " ", "g"), path: breadcrumbPath(i)};
		            var intValue = parseInt(pathElement.name, 10);
		            if (intValue > 0) {
		                previous.path = pathElement.path;
		            } else {
		                result.push(pathElement);
		                previous = pathElement;
		            }
		        }
		        breadcrumbs = result;
		    });

		    /**
		     * Description
		     * @method getAll
		     * @return breadcrumbs
		     */
		    breadcrumbsService.getAll = function () {
		        return breadcrumbs;
		    };

		    /**
		     * Description
		     * @method getFirst
		     * @return LogicalExpression
		     */
		    breadcrumbsService.getFirst = function () {
		        return breadcrumbs[0] || {};
		    };

		    return breadcrumbsService;
		}
		
		return ['$rootScope', '$location', Breadcrumbs ]
	});
	
}(define));