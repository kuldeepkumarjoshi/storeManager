(function(define) {
	"use strict";

	define(
			[],
			function() {

				var OrderCreateEditCtrl = function($scope, $location,$rootScope,uiGridConstants , $q,$interval, $http,OrderService,OrderProductData, i18nNotifications) {
					var isAdmin=true; 
					$scope.$parent.quickTitle = "Enter Detail";
					$scope.opened = false;
					$scope.orderTotal = 0 ;
				
					//$scope.maxDate = new Date();
				 //	$scope.minDate = new Date();
					$scope.open = function($event) {
					    $event.preventDefault();
					    $event.stopPropagation();
					    $scope.opened = true;
				  };
				  
				  $scope.setStores = function(zone){
					  $scope.zoneStores = _.filter($scope.stores,function(item){
						  return (zone.id == item.zoneId);							  
					  });
					  $scope.orderItemVo.store  = $scope.zoneStores[0] ;
				  };
				  function setSelectedZones(selecetedStore){
					  var calZone ={};
					 _.each($scope.zones,function(item){
						  if (selecetedStore.zoneId == item.id){
							  calZone =item;
							  return item;
						  }							  
					  });
					 return calZone;
					}	
				//	 console.log(OrderData);
						$scope.saveOrder=function(){
							var obj={
									id:$scope.orderItemVo.id,
									title:$scope.selectedZone.name+"_"+$scope.orderItemVo.store.name,
									orderProducts:	$scope.orderItemVo.orderProducts,	
									status:$scope.orderItemVo.status,
									poNumber:$scope.orderItemVo.poNumber,
									deliveryDate:$scope.orderItemVo.deliveryDate,
									remarks:$scope.orderItemVo.remarks,
									storeId: $scope.orderItemVo.store.id,
									store: $scope.orderItemVo.store,
									poReceivedOnEmail:$scope.orderItemVo.poReceivedOnEmail
							};
							OrderService.save(obj,function(response){
								alert("saved successfully.");
							},function(response){
								alert("error in save order.");
							});
						};
						$scope.calculateOrderTotal = function(){
							$scope.orderItemVo.total = 0 ;
							_.forEach($scope.productData,function(item){
								if(item.quantity != undefined || item.quantity !=null){
									$scope.orderItemVo.total= $scope.orderItemVo.total+ (item.price*item.quantity);
								}	
								
							});							
						}
						
						console.log(OrderProductData);
						$scope.orderItemVo = OrderProductData.orderItemVo;
					$scope.productData = OrderProductData.orderItemVo.orderProducts;
					$scope.stores = OrderProductData.stores;
					$scope.zones = OrderProductData.zones;
					$scope.statusList = OrderProductData.statusList;
					
					$scope.selectedStatus =  $scope.orderItemVo.status;
					
					if($scope.orderItemVo.id == null || $scope.orderItemVo.id == undefined){
						$scope.quickTitle = "Create Order";
						$scope.selectedZone = $scope.zones[0];
					}else{
						$scope.selectedZone = setSelectedZones($rootScope.selectedStore);
						$scope.quickTitle = "Edit Order";
					}
					
					$scope.setStores($scope.selectedZone);
					
					 var fakeI18n = function( title ){
						    var deferred = $q.defer();
						    $interval( function() {
						      deferred.resolve( 'col: ' + title );
						    }, 1000, 1);
						    return deferred.promise;
						  };
						
						
					$scope.gridOptions = {
						multiSelect : false,
						showColumnFooter: true,
						
						enableCellEditOnFocus : true,
						 exporterMenuCsv: true,
						 enableGridMenu: true,
						 gridMenuTitleFilter: fakeI18n,
						data : 'productData',
						columnDefs : [
								{
									field : 'name',
									displayName: 'Product',
									cellTemplate:'<div class="" style="padding-left: 2%;cursor:pointer;">'+" {{row.entity.name}} "+'</div>'
								},
								{
									field : 'price',
									displayName:'Unit price',
									footerCellTemplate: '<div class="ui-grid-cell-contents">Order total : </div>'
								},
								{
									field : ' ',
									displayName:'Quantity',									
									aggregationType: uiGridConstants.aggregationTypes.sum,
									footerCellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.orderItemVo.total}}</div>',
									cellTemplate:'<div class="row"><div class="" >'+
									'<input type="number" min="0" step="1" ng-change="grid.appScope.calculateOrderTotal()" class="form-control"  ng-model="row.entity.quantity" style="text-align:center;margin: 1%;padding: 1%;"  ></button>'
		                       }],

					};
					
					
				};
				return [ '$scope', '$location', '$rootScope','uiGridConstants' , '$q','$interval','$http', 'OrderService','OrderProductData','i18nNotifications', OrderCreateEditCtrl ];
			});

}(define));