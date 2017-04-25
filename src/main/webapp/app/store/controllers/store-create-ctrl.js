(function(define) {
	"use strict";

	define(
			[],
			function() {

				var StoreCreateCtrl = function($scope, $location, $http,StoreData, i18nNotifications) {
					var isAdmin=true; 
					$scope.images=[];
					
					
					 console.log(StoreData);
					$scope.storeData = StoreData.storeList;
					 var fakeI18n = function( title ){
						    var deferred = $q.defer();
						    $interval( function() {
						      deferred.resolve( 'col: ' + title );
						    }, 1000, 1);
						    return deferred.promise;
						  };
				
					
				};
				return [ '$scope', '$location', '$http', 'StoreData','i18nNotifications', StoreCreateCtrl ];
			});

}(define));