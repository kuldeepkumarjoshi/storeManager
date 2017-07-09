(function(define) {
	"use strict";

	define(
			[],
			function() {

				var QuickOrderProductCtrl = function($scope, $location,$rootScope,uiGridConstants , $q,$interval,QuickOrderProductData,OrderService, i18nNotifications) {
					var isAdmin=true; 
					$scope.$parent.quickTitle = "Select Products";
					$scope.opened = false;
					$scope.orderTotal = 0 ;
					//$scope.maxDate = new Date();
				 //	$scope.minDate = new Date();
					$scope.open = function($event) {
					    $event.preventDefault();
					    $event.stopPropagation();
					    $scope.opened = true;
				  };
						
				//	 console.log(OrderData);
						$scope.saveOrder=function(){
							var obj={
									title:$rootScope.selectedZone.name+"_"+$rootScope.selectedStore.name,
									orderProducts:	$scope.productData,	
									status:"IN_PROGRESS",
									poNumber:$scope.poNumber,
									deliveryDate:$scope.deliveryDate,
									remarks:$scope.remarks,
									storeId: $rootScope.selectedStore.id,
									store: $rootScope.selectedStore,
									poReceivedOnEmail:$scope.poReceivedOnEmail
							};
							OrderService.save(obj,function(response){
								alert("saved successfully.");
								$scope.$back();
							},function(response){
								alert("error in save order.");
							});
						};
						$scope.calculateOrderTotal = function(){
							$scope.orderTotal = 0 ;
							_.forEach($scope.productData,function(item){
								if(item.quantity != undefined || item.quantity !=null){
									$scope.orderTotal= $scope.orderTotal+ (item.price*item.quantity);
								}	
								
							});							
						}
						
						
					$scope.productData = QuickOrderProductData.productList;
					
				
					
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
									footerCellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.orderTotal}}</div>',
									cellTemplate:'<div class="row"><div class="" >'+
									'<input type="number" min="0" step="1" ng-change="grid.appScope.calculateOrderTotal()" class="form-control"  ng-model="row.entity.quantity" style="text-align:center;margin: 1%;padding: 1%;"  ></button>'
		                       
									
								}
								],

					};
					
				};
				return [ '$scope', '$location', '$rootScope','uiGridConstants','$q','$interval', 'QuickOrderProductData','OrderService','i18nNotifications', QuickOrderProductCtrl ];
			});

}(define));