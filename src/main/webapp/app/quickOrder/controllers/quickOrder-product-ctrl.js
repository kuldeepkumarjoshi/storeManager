(function(define) {
	"use strict";

	define(
			[],
			function() {

				var QuickOrderProductCtrl = function($scope, $location,$rootScope,uiGridConstants , $q,$interval,QuickOrderProductData,OrderService, i18nNotifications) {
					var isAdmin=true; 
					$scope.$parent.quickTitle = "Enter Detail";
					$scope.images=[];
					$scope.opened = false;
					$scope.orderTotal = 0 ;
					//$scope.maxDate = new Date();
				 //	$scope.minDate = new Date();
					$scope.open = function($event) {
					    $event.preventDefault();
					    $event.stopPropagation();
					    $scope.opened = true;
				  };
						var deleteBtn='<a ng-click="grid.appScope.deleteConfirmation(row)" style="cursor:pointer;margin-left:2%" uib-tooltip-placement="auto" uib-tooltip="Delete" uib-tooltip-append-to-body="true"><i class="fa fa-trash-o fa-lg text-danger"></i></a>';
						var editBtn='<a ng-click="grid.appScope.editPage(row)" style="cursor:pointer;margin-left:2%" uib-tooltip-placement="auto" uib-tooltip="Edit" uib-tooltip-append-to-body="true"><i class="fa fa-pencil-square-o fa-lg text-info"></i></a>';
					
				//	 console.log(OrderData);
						$scope.saveOrder=function(){
							var obj={
									title:$rootScope.selectedZone.entity.name+"_"+$rootScope.selectedStore.entity.name,
									orderProducts:	$scope.productData,	
									status:"inProgress",
									poNumber:$scope.poNumber,
									deliveryDate:$scope.deliveryDate,
									remarks:$scope.remarks,
									storeId: $rootScope.selectedStore.entity.id,
									store: $rootScope.selectedStore.entity,
									poReceivedOnEmail:$scope.poReceivedOnEmail
							};
							OrderService.save(obj,function(response){
								alert("saved successfully.");
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
									'<input type="number" ng-change="grid.appScope.calculateOrderTotal()" class="form-control"  ng-model="row.entity.quantity" style="text-align:center;margin: 1%;padding: 1%;"  ></button>'
		                       
									
								}
								  
								/*,
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
				return [ '$scope', '$location', '$rootScope','uiGridConstants','$q','$interval', 'QuickOrderProductData','OrderService','i18nNotifications', QuickOrderProductCtrl ];
			});

}(define));