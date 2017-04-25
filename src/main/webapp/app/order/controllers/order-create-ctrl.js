(function(define) {
	"use strict";

	define(
			[],
			function() {

				var OrderCreateCtrl = function($scope, $location,$rootScope, $http,ProductData,OrderService, i18nNotifications) {
					var isAdmin=true; 
					$scope.images=[];
						var deleteBtn='<a ng-click="grid.appScope.deleteConfirmation(row)" style="cursor:pointer;margin-left:2%" uib-tooltip-placement="auto" uib-tooltip="Delete" uib-tooltip-append-to-body="true"><i class="fa fa-trash-o fa-lg text-danger"></i></a>';
						var editBtn='<a ng-click="grid.appScope.editPage(row)" style="cursor:pointer;margin-left:2%" uib-tooltip-placement="auto" uib-tooltip="Edit" uib-tooltip-append-to-body="true"><i class="fa fa-pencil-square-o fa-lg text-info"></i></a>';
					
				//	 console.log(OrderData);
						$scope.saveOrder=function(){
							var obj={
									orderItemVO:	$scope.productData,
									title:'order name',
									total: 200,
									status:"start",
									storeId: $rootScope.selectedStore.entity.id,
									store:$rootScope.selectedStore.entity,
									orderDate:new Date()
							};
							OrderService.save(obj,function(response){
								alert("saved successfully.");
							},function(response){
								alert("error in save order.");
							});
						};
					$scope.productData = ProductData.productList;
					 var fakeI18n = function( title ){
						    var deferred = $q.defer();
						    $interval( function() {
						      deferred.resolve( 'col: ' + title );
						    }, 1000, 1);
						    return deferred.promise;
						  };
					$scope.gridOptions = {
						multiSelect : false,
						enableCellEditOnFocus : true,
						 exporterMenuCsv: true,
						 enableGridMenu: true,
						 gridMenuTitleFilter: fakeI18n,
						data : 'productData',
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
									enableCellEdit: false,
									width:300,
									cellTemplate:'<div class="" style="padding-left: 2%;cursor:pointer;">'+" {{row.entity.name}} "+'</div>'
								},
								{
									field : 'price',
									enableCellEdit: true,
									displayName:'Unit price'									
								},
								{
									field : ' ',
									displayName:'Quantity',
									enableCellEdit: false,
									cellTemplate:'<div class="" style="padding-left: 2%;"><input type="text" name="quantity" ng-model="row.entity.quantity" class="form-control" /></div>'
									
								},
								{
									field : ' ',
									displayName:'Sub total',
									cellTemplate:'<div class="" style="padding-left: 2%;">'+"{{row.entity.quantity*row.entity.price }}"+'</div>'
									
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
				return [ '$scope', '$location', '$rootScope','$http', 'ProductData','OrderService','i18nNotifications', OrderCreateCtrl ];
			});

}(define));