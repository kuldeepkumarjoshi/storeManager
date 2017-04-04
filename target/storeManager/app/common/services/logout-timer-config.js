(function ( define ) {
    "use strict";

    define([], function () {
    	
        var LogoutTimerConfig = function ($idleProvider) {
        	$idleProvider.idleDuration(5);
            $idleProvider.warningDuration(60);
        };

        return ['$idleProvider', LogoutTimerConfig];
    });

}( define ));