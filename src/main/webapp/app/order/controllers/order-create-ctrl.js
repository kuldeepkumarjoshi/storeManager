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
						showFooter: true,
						footerTemplate: 
							'<div ng-show="showFooter" class="ngFooterPanel" ng-class="{\'ui-widget-content\': jqueryUITheme, \'ui-corner-bottom\': jqueryUITheme}" ' +
							'ng-style="footerStyle()"><div ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell {{col.cellClass}} " ng-cell style="text-align:right;">' +
							'{{getTotal(col.field)}}</div></div>',
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
									displayName:'Unit price'									
								},
								{
									field : ' ',
									displayName:'Quantity',
									enableCellEdit: true,
									cellTemplate:'<div class="" style="padding-left: 2%;"><input type="text" name="quantity" ng-model="row.entity.quantity" class="form-control" /></div>'
									
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