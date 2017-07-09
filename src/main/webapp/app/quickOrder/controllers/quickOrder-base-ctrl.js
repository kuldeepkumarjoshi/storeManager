(function(define) {
	"use strict";

	define(
			[],
			function() {

				var QuickOrderBaseCtrl = function($scope,$location, i18nNotifications) {
					$scope.quickTitle = "";
					if($location.path() == "/quickOrder"){
						$location.path("/quickOrder/selectZone");
					}
					
					 
				}	
				return [ '$scope','$location', 'i18nNotifications', QuickOrderBaseCtrl ];
			});

}(define));