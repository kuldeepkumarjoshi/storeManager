(function(define) {
	"use strict";

	define(
			[],
			function() {

				var QuickOrderZoneCtrl = function($scope,$q, $interval,$location, $rootScope,QuickOrderZoneData, i18nNotifications) {
					var isAdmin=true;
					$scope.newQuickOrder ={};
					$scope.$parent.quickTitle = "Select Zone";
					
					 console.log(QuickOrderZoneData);
					
					    
					$scope.quickOrderZoneData = QuickOrderZoneData.zoneList;
					
					
					 var fakeI18n = function( title ){
						    var deferred = $q.defer();
						    $interval( function() {
						      deferred.resolve( 'col: ' + title );
						    }, 1000, 1);
						    return deferred.promise;
						  };
						  
					  $scope.quickStoreView =function(row){
						  $rootScope.selectedZone = row.entity;
						  $location.path('/quickOrder/selectStore').search({id:row.entity.id});
					  }
					$scope.gridOptions = {
						multiSelect : false,
						enableCellEditOnFocus : false,
						 exporterMenuCsv: true,
						 enableGridMenu: true,
						 gridMenuTitleFilter: fakeI18n,
						data : 'quickOrderZoneData',
						columnDefs : [
								{
									field : 'name',
									displayName: 'Zone',
									enableCellEdit: false,
									cellTemplate:'<div class="linkDiv"  style="padding-left: 2%;" ng-click="grid.appScope.quickStoreView(row)">'+" {{row.entity.name }} "+'</div>'
								}
								],

					};
					
				};
				return [ '$scope','$q','$interval', '$location','$rootScope', 'QuickOrderZoneData','i18nNotifications', QuickOrderZoneCtrl ];
			});

}(define));