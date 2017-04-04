(function ( define ) {
    "use strict";

    define([], function () {
    	
        var ConfigManager = function ($stateProvider, $locationProvider, $translateProvider) {
            $translateProvider.useStaticFilesLoader({
    	        prefix: 'notification/message-',
    	        suffix: '.json'
    	    });
    	    $translateProvider.uses('en-in');
    	    $locationProvider.html5Mode(false);
    	    //$routeProvider.otherwise({redirectTo:'/consolidation'});
        };

        return ['$stateProvider', '$locationProvider', '$translateProvider', ConfigManager ];
    });

}( define ));