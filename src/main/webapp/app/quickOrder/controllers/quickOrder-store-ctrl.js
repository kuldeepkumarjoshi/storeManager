(function(define) {
	"use strict";

	define(
			[],
			function() {

				var QuickOrderStoreCtrl = function($scope,$q,$interval, $location, $http,$rootScope,QuickOrderStoreData, i18nNotifications) {
					var isAdmin=true; 
					$scope.$parent.quickTitle = "Select Store";
					$scope.images=[];
						var deleteBtn='<a ng-click="grid.appScope.deleteConfirmation(row)" style="cursor:pointer;margin-left:2%" uib-tooltip-placement="auto" uib-tooltip="Delete" uib-tooltip-append-to-body="true"><i class="fa fa-trash-o fa-lg text-danger"></i></a>';
						var editBtn='<a ng-click="grid.appScope.editPage(row)" style="cursor:pointer;margin-left:2%" uib-tooltip-placement="auto" uib-tooltip="Edit" uib-tooltip-append-to-body="true"><i class="fa fa-pencil-square-o fa-lg text-info"></i></a>';
					
										
					$scope.orderCreateView =function(row){
						  $rootScope.selectedStore = row; 
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
									displayName: 'Store Name',
									enableCellEdit: false,					
									cellTemplate:'<a class="" href="#" style="padding-left: 2%;cursor:pointer;" ng-click="grid.appScope.orderCreateView(row)">'+" {{row.entity.name }} "+'</a>'
								},
								{
									field : 'mostRecentOrderDate',
									displayName: 'Last Order',
									enableCellEdit: false,
								}],

					};
					
				};
				return [ '$scope','$q','$interval', '$location', '$http','$rootScope', 'QuickOrderStoreData','i18nNotifications', QuickOrderStoreCtrl ];
			});

}(define));