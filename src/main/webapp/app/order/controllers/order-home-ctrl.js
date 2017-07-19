(function(define) {
	"use strict";

	define(
			[],
			function() {

				var OrderHomeCtrl = function($scope,$q,$interval, $rootScope,$location, $http,OrderData,OrderService, i18nNotifications) {
					var isAdmin=true; 
					$scope.monthsAvail =  angular.copy($scope.months);
				
					 $scope.orderFilter=[];   
					$scope.filters = [{id:1,name:"Store"},{id:2,name:"Status"},{id:3,name:"Month"}];
					
					   $scope.orderFilter.selectedFilter = $scope.filters[2];              
					 console.log(OrderData);
					 
					 $scope.loadFilterOptions=function(){
						 var initialValue = 0; 
						  if( $scope.orderFilter.selectedFilter.id ==1){
							 $scope.filterOptions = OrderData.stores;
						 }else if( $scope.orderFilter.selectedFilter.id ==2){
							 $scope.filterOptions = OrderData.statusList;
						 }else{
							 $scope.filterOptions = $scope.monthsAvail;
							 initialValue = (new Date()).getMonth();
						 }
						 $scope.orderFilter.selectedValue = $scope.filterOptions[initialValue];
					 };
					 $scope.loadFilterOptions();
					 $scope.createOrder= function(){
						 $location.path('/order-createEdit');
					 };
					 $scope.getOrderDetail = function(){
						 var obj = {};
						 if( $scope.orderFilter.selectedFilter.id ==1){							 
							 obj.storeId =  $scope.orderFilter.selectedValue.id;
						 }else if( $scope.orderFilter.selectedFilter.id ==2){							 
							 obj.status =  $scope.orderFilter.selectedValue.name;
						 }else{							 
							 obj.month =  $scope.orderFilter.selectedValue.id;
						 }
						 OrderService.getGridDataForOrderPage(obj,function(res){
							 console.log(res);
							 $scope.orderData = res.orderList;
						 },function(res){
							 $scope.$internalErrorMsg(res);
						 });
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
						  
						  $rootScope.selectedStore = row.entity.store;
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
									field : 'id',
									displayName: 'Id',
									visible: false,	
								},{
									field : 'createdDate',
									displayName: 'Created',
									// cellFilter: 'date:"dd/MM/yyyy"', 
									cellTemplate:'<div class="linkDiv"  style="padding-left: 2%;" ng-click="grid.appScope.createEditOrderView(row)">'+" {{row.entity.createdDate | date:'dd/MM/yyyy'}} "+'</div>',
									width:'25%',
									filterCellFiltered:true,
								},{
									field : 'total',
									displayName: 'Total', 									
								},{
									field : 'orderProductStr',
									displayName: 'Products',
										width:'50%'
								},{
									field : 'status',
									displayName: 'Status',
									cellTemplate:'<div style="padding-left: 2%;" ng-if="row.entity.status==\'COMPLETED\'">C</div><div style="padding-left: 2%;" ng-if="row.entity.status==\'IN_PROGRESS\'">IP</div>'
										
								}],

					};
					
				};
				return [ '$scope','$q','$interval', '$rootScope','$location', '$http', 'OrderData','OrderService','i18nNotifications', OrderHomeCtrl ];
			});

}(define));