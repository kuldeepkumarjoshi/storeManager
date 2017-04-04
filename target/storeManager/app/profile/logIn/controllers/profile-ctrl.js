(function(define) {
	"use strict";

	define(
			[],
			function() {

				var ProfileCtrl = function($scope, $location, $state, $rootScope, i18nNotifications) {

					function getCredencial(){
						return "read";
					}
					
					$scope.login=function(){
						$scope.permission=getCredencial();
					};
					
					$scope.setView=function(type){
						$location.path('/party');
					};

				};
				return [ '$scope', '$location', '$state', '$rootScope', 'i18nNotifications', ProfileCtrl ];
			});

}(define));