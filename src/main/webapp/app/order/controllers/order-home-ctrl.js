(function(define) {
	"use strict";

	define(
			[],
			function() {

				var OrderHomeCtrl = function($scope,$q,$interval, $rootScope,$location, $http,OrderData, i18nNotifications) {
					var isAdmin=true; 
					
					 console.log(OrderData);
					 
					 $scope.createOrder= function(){
						 $location.path('/order-createEdit');
					 };
					$scope.orderData = OrderData.orderList;
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
						columnDefs : [{
									field : 'store.name',
									displayName: 'Store',
									cellTemplate:'<div class="linkDiv"  style="padding-left: 2%;" ng-click="grid.appScope.createEditOrderView(row)">'+" {{row.entity.store.name}} "+'</div>'
										
								},
								{
									field : 'deliveryDate',
									displayName: 'Delivery',
									cellFilter: 'date:"dd/MM/yyyy"', 
									filterCellFiltered:true
								},
								{
									field : 'status',
									displayName: 'Status'
								}],

					};
					
				};
				return [ '$scope','$q','$interval', '$rootScope','$location', '$http', 'OrderData','i18nNotifications', OrderHomeCtrl ];
			});

}(define));