(function(define) {
	"use strict";

	define(
			[],
			function() {

				var QuickOrderStoreCtrl = function($scope,$q,$interval, $location, $http,$rootScope,QuickOrderStoreData, i18nNotifications) {
					var isAdmin=true; 
					$scope.$parent.quickTitle = "Select Store";				
										
					$scope.orderCreateView =function(row){
						  $rootScope.selectedStore = row.entity; 
						  $location.path('/quickOrder/selectProduct');
					 };
					 console.log(QuickOrderStoreData);
					$scope.storeData = QuickOrderStoreData.storeList;
					 var fakeI18n = function( title ){
						    var deferred = $q.defer();
						    $interval( function() {
						      deferred.resolve( 'col: ' + title );
						    }, 1000, 1);
						    return deferred.promise;
						  };
					$scope.gridOptions = {
						multiSelect : false,
						enableCellEditOnFocus : false,
						 exporterMenuCsv: true,
						 enableGridMenu: true,
						 gridMenuTitleFilter: fakeI18n,
						data : 'storeData',
						columnDefs : [
								{
									field : 'name',
									displayName: 'Store',
									enableCellEdit: false,					
									cellTemplate:'<div class="linkDiv"  style="padding-left: 2%;" ng-click="grid.appScope.orderCreateView(row)">'+" {{row.entity.name }} "+'</div>'
								},
								{
									field : 'mostRecentOrderDate',
									displayName: 'Last Order',
									cellFilter: 'date:"dd/MM/yyyy"', 
									filterCellFiltered:true
								}],

					};
					
				};
				return [ '$scope','$q','$interval', '$location', '$http','$rootScope', 'QuickOrderStoreData','i18nNotifications', QuickOrderStoreCtrl ];
			});

}(define));