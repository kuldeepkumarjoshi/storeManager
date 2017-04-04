(function ( define ) {
    "use strict";

    define([], function () {
    	
        var RunManager = function ($window, $rootScope, $location, $state, $timeout, $interval) {
        	$rootScope.$on('$viewContentLoaded', function(){
                sessionStorage.setItem("flag","0");
                localStorage.setItem("count","0");
                var interval = $interval(function(){
                      if (document.readyState === "complete") {
                      window.scrollTo(0, 0);
                      $interval.cancel(interval);
                  }
                },200);
                });
        };

        return ['$window', '$rootScope', '$location' , '$state', '$timeout','$interval', RunManager ];
    });

}( define ));