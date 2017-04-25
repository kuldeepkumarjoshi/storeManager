(function(define) {
	"use strict";

	define(
			[],
			function() {

				var OrderCtrl = function($scope, $location, $http,OrderData, i18nNotifications) {
					var isAdmin=true; 
					$scope.images=[];
						var deleteBtn='<a ng-click="grid.appScope.deleteConfirmation(row)" style="cursor:pointer;margin-left:2%" uib-tooltip-placement="auto" uib-tooltip="Delete" uib-tooltip-append-to-body="true"><i class="fa fa-trash-o fa-lg text-danger"></i></a>';
						var editBtn='<a ng-click="grid.appScope.editPage(row)" style="cursor:pointer;margin-left:2%" uib-tooltip-placement="auto" uib-tooltip="Edit" uib-tooltip-append-to-body="true"><i class="fa fa-pencil-square-o fa-lg text-info"></i></a>';
					
					 console.log(OrderData);
					 
					 $scope.createOrder= function(){
						 $location.path('/zones');
					 };
					$scope.orderData = OrderData.orderList;
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
						data : 'orderData',
						columnDefs : [
								{
									name: 's.no',
									cellTemplate: '<div align="center" style="padding-top: 6%;" class="ngCellText">{{grid.renderContainers.body.visibleRowCache.indexOf(row) +1}}</div>',
									enableSorting : false,
									width:60
								},
								{
									field : 'title',
									displayName: 'Title',
									enableCellEdit: true,								
									cellTemplate:'<div class="" style="padding-left: 2%;">'+" {{row.entity.title }} "+'</div>'
								},
								{
									field : 'storeId',
									enableCellEdit: true,
								},
								{
									field : 'zoneId',
									enableCellEdit: true,
								},
								{
									field : 'productId',
									enableCellEdit: true,
								},
								{
									field : 'quantity',
									enableCellEdit: true,
								},
								{
									field : 'total',
									enableCellEdit: true,
								},
								{
									field : 'subTotal',
									enableCellEdit: true,
								},
								{
									field : 'status',
									enableCellEdit: true,
								},
								{
									field : 'remarks',
									enableCellEdit: true,
								},
								{
									field : 'deliveryDate',
									enableCellEdit: true,
								},
								{
									field:'  ',
									displayName:'  ',
									name:' ',
									enableCellEdit: false, 
									enableSorting : false,
									visible : isAdmin,
									cellTemplate:'<div class="" style="padding-top: 1%;">'+editBtn+deleteBtn+'</div>'
								}
								],

					};
					
				};
				return [ '$scope', '$location', '$http', 'OrderData','i18nNotifications', OrderCtrl ];
			});

}(define));