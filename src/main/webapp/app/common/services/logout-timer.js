(function(define){
	"use strict";
	
	define([], function() {
		
		var logoutTimer = function($idle, $modal,$rootScope,$interval,$window) {
			var logoutTimer = {};
	        localStorage.metaCampusLastAccessTime = (new Date()).getTime();
	        $rootScope.started = false;
	        
	        $rootScope.closeModals = function() {
	            if ($rootScope.warning) {
	                $rootScope.warning.close();
	                $rootScope.warning = null;
	            }

	            if ($rootScope.timedout) {
	                $rootScope.timedout.close();
	                $window.location.href = '/logout.do';
	                $rootScope.timedout = null;
	            }
	        };

	        $rootScope.$on('$idleStart', function() {
	            $rootScope.closeModals();
	            $rootScope.warning = $modal.open({
	              templateUrl: 'warning-dialog.html',
	              windowClass: 'modal-danger'
	            });
	        });

	        $rootScope.$on('$idleEnd', function() {
	            $rootScope.closeModals();
	        });

	        $rootScope.$on('$idleTimeout', function() {
	            $rootScope.closeModals();
	            $rootScope.timedout = $modal.open({
	              templateUrl: 'timedout-dialog.html',
	              windowClass: 'modal-danger'
	            });
	        });
	         
	        $rootScope.startNgIdlemodule = function() {
	            $rootScope.closeModals();
	            $idle.watch();
	            $rootScope.started = true;
	        };
	       
	        $rootScope.stopNgIdlemodule = function() {
	            $rootScope.closeModals();
	            $idle.unwatch();
	            $rootScope.started = false;
	        };
	            
	        /*Events Listeners Starts*/
	        document.addEventListener('keyup', function() {
	            $rootScope.$apply(function() {
	                localStorage.metaCampusLastAccessTime = (new Date()).getTime();
	            });
	        });
	        
	        document.addEventListener('click', function() {
	            $rootScope.$apply(function() {
	                localStorage.metaCampusLastAccessTime = (new Date()).getTime();
	            });
	        });
	        
	        document.addEventListener('DOMMouseScroll', function() {
	            $rootScope.$apply(function() {
	                localStorage.metaCampusLastAccessTime = (new Date()).getTime();
	            });
	        });
	        
	        document.addEventListener('mousewheel', function() {
	            $rootScope.$apply(function() {
	                localStorage.metaCampusLastAccessTime = (new Date()).getTime();
	            });
	        });
	        document.addEventListener('mousemove', function() {
	            $rootScope.$apply(function() {
	                localStorage.metaCampusLastAccessTime = (new Date()).getTime();
	            });
	        });
	        
	        /*For Continuously Monitoring the change of last Access Time in every Tab*/
	        logoutTimer.startLogoutTimer = function(sessionTime) {
	            $rootScope.logoutTimerInterval = setInterval(function(){
	                if((new Date()).getTime() - Number(localStorage.metaCampusLastAccessTime) >= sessionTime){
	                    if($rootScope.started === false){
	                        $rootScope.startNgIdlemodule();	
	                    }
	                } else if($rootScope.started === true){
	                    $rootScope.stopNgIdlemodule();
	                }
	            }, 200);
	        };
	        return logoutTimer;
		};		
		return ['$idle', '$modal','$rootScope','$interval','$window', logoutTimer ];
	});
	
}(define));