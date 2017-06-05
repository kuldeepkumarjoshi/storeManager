(function(define) {
	"use strict";

	define(
			[],
			function() {

				var StoreCreateEditCtrl = function($scope, $location,$rootScope,uiGridConstants , $q,$interval, $http,StoreService,StoreData, i18nNotifications) {
					var isAdmin=true; 
					
						
				//	 console.log(StoreData);
						$scope.saveStore=function(){
							$scope.store.zoneId = $scope.selectedZone.id;
							StoreService.save($scope.store,function(response){
								alert("saved successfully.");
							},function(response){
								alert("error in save store.");
							});
						};
						
						
					console.log(StoreData);
					$scope.store = $rootScope.selectedStore;
					$scope.zones = StoreData.zones;
					if($scope.store.id == null){
						$scope.quickTitle = "Create Store";
						$scope.selectedZone = $scope.zones[0];
					}else{
						$scope.quickTitle = "Edit Store";
						_.each($scope.zones,function(item){
							if(item.id == $scope.store.zoneId){
								$scope.selectedZone = item;
							}
						});
					}
					
					$scope.orderData = StoreData.orders;
					
					 var fakeI18n = function( title ){
						    var deferred = $q.defer();
						    $interval( function() {
						      deferred.resolve( 'col: ' + title );
						    }, 1000, 1);
						    return deferred.promise;
						  };
					  $scope.createEditOrderView =function(row){
						  $rootScope.selectedOrder = row.entity;
						  $location.path('/order-createEdit').search({id:row.entity.id});
					 };
					$scope.gridOptions = {
						multiSelect : false,
						enableCellEditOnFocus : false,
						 exporterMenuCsv: true,
						 enableGridMenu: true,
						 gridMenuTitleFilter: fakeI18n,
						data : 'orderData',
						columnDefs : [/*{
									field : 'name',
									displayName: 'Store',
									cellTemplate:'<div class="linkDiv"  style="padding-left: 2%;" ng-click="grid.appScope.createEditOrderView(row)">'+" {{row.entity.store.name}} "+'</div>'
										
								},*/
								{
									field : 'deliveryDate',
									displayName: 'Delivery',
									cellFilter: 'date:"dd/MM/yyyy"', 
									filterCellFiltered:true
								},
								{
									field : 'total',
									displayName: 'Total'
								},
								{
									field : 'status',
									displayName: 'Status'
								}],

					};
					
				};
				return [ '$scope', '$location', '$rootScope','uiGridConstants' , '$q','$interval','$http', 'StoreService','StoreData','i18nNotifications', StoreCreateEditCtrl ];
			});

}(define));