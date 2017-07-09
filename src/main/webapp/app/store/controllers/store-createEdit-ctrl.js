(function(define) {
	"use strict";

	define(
			[],
			function() {

				var StoreCreateEditCtrl = function($scope, $location,$rootScope,uiGridConstants , $q,$interval,StoreService,StoreData) {
					var isAdmin=true; 
					
					
				
					
				//	 console.log(StoreData);
					$scope.deleteStore =function(){
						var obj={
								storeId :$scope.store.id
						};
						StoreService.deleteStore(obj,function(response){							
							$scope.notifications.removeAll();
							$scope.notifications.pushForCurrentRoute('store.delete.success', 'success', {}, {});							
							$scope.$back();
						},function(response){							
							  $scope.$internalErrorMsg(response);
						});
					}
						$scope.saveStore=function(){
							$scope.store.zoneId = $scope.selectedZone.id;
							StoreService.save($scope.store,function(response){
								$scope.notifications.removeAll();
								$scope.notifications.pushForCurrentRoute($scope.saveSuccessMsg, 'success', {}, {});	
								$scope.$back();
							},function(response){								
								$scope.$internalErrorMsg(response);
							});
						};
						
						
					console.log(StoreData);
					$scope.store = $rootScope.selectedStore;
					$scope.zones = StoreData.zones;
					
					$scope.quickTitle = "Create Store";
					$scope.saveSuccessMsg = 'store.create.success';
					$scope.selectedZone = $scope.zones[0];
					if($scope.store != null){
						
						$scope.quickTitle = "Edit Store";
						$scope.saveSuccessMsg = 'store.edit.success';
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
									field : 'id',
									displayName: 'Order Id'
								},{
									field : 'orderProductStr',
									displayName: 'P.Q.',
									cellTooltip: true
								},{
									field : 'poNumber',
									displayName: 'PO Number'
								},{
									field : 'total',
									displayName: 'Total'
								},{
									field : 'status',
									displayName: 'Status'
								}],

					};
					
				};
				return [ '$scope', '$location', '$rootScope','uiGridConstants' , '$q','$interval', 'StoreService','StoreData', StoreCreateEditCtrl ];
			});

}(define));