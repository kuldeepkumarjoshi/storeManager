(function(define) {
	"use strict";

	define(
			[],
			function() {

				var StoreCtrl = function($scope, $location, $http,$rootScope,StoreData, i18nNotifications) {
					var isAdmin=true; 
					$scope.images=[];
						var deleteBtn='<a ng-click="grid.appScope.deleteConfirmation(row)" style="cursor:pointer;margin-left:2%" uib-tooltip-placement="auto" uib-tooltip="Delete" uib-tooltip-append-to-body="true"><i class="fa fa-trash-o fa-lg text-danger"></i></a>';
						var editBtn='<a ng-click="grid.appScope.editPage(row)" style="cursor:pointer;margin-left:2%" uib-tooltip-placement="auto" uib-tooltip="Edit" uib-tooltip-append-to-body="true"><i class="fa fa-pencil-square-o fa-lg text-info"></i></a>';
					
					$scope.createStore = function(){
						$location.path("/store-create");
					}
					
					$scope.orderCreateView =function(row){
						  $rootScope.selectedStore = row; 
						  $location.path('/order-create');
					 };
					 console.log(StoreData);
					$scope.storeData = StoreData.storeList;
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
									name: 's.no',
									cellTemplate: '<div align="center" style="padding-top: 6%;" class="ngCellText">{{grid.renderContainers.body.visibleRowCache.indexOf(row) +1}}</div>',
									enableSorting : false,
									width:60
								},
								{
									field : 'name',
									displayName: 'Name',
									enableCellEdit: true,
									width:300,
									cellTemplate:'<div class="" style="padding-left: 2%;cursor:pointer;" ng-click="grid.appScope.orderCreateView(row)">'+" {{row.entity.name }} "+'</div>'
								},
								{
									field : 'zoneId',
									enableCellEdit: true,
								},
								{
									field : 'contactId',
									enableCellEdit: true, 
								}/*,
								{
									field:'  ',
									displayName:'  ',
									name:' ',
									enableCellEdit: false, 
									enableSorting : false,
									visible : isAdmin,
									cellTemplate:'<div class="" style="padding-top: 1%;">'+editBtn+deleteBtn+'</div>'
								}*/
								],

					};
					
				};
				return [ '$scope', '$location', '$http','$rootScope', 'StoreData','i18nNotifications', StoreCtrl ];
			});

}(define));