(function(define) {
	"use strict";

	define(
			[],
			function() {

				var StoreHomeCtrl = function($scope,$q,$interval, $rootScope,$location,StoreService,StoreHomeData) {
					var isAdmin=true; 
					
					 console.log(StoreHomeData);
					 
					 $scope.createStore= function(){
						 $rootScope.selectedStore = {id:null,name:""};
						 $location.path('/store-createEdit');
					 };
					$scope.storeData = StoreHomeData.storeList;
					
					$scope.storeSearch = {};
				  $scope.storeCreateView =function(row){
					
					 $rootScope.selectedStore = row.entity.store; 
					  $location.path('/store-createEdit').search({id:row.entity.id});
				 };
					 $scope.getStoreDetail  = function(){
							var obj={
									month:$scope.storeSearch.selectedMonth.id
							};		 
							
							StoreService.getGridDataForStorePage(obj,function(res){
								 $scope.storeData = res.storeList;
								 
							 },function(res){
								 $scope.$internalErrorMsg(res);
							 });
						 };
				
					
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
						 enableColumnResizing: true,
						 gridMenuTitleFilter: fakeI18n,
						data : 'storeData',
						columnDefs : [
								{
									field : 'store.name',
									displayName: 'Store',
									enableCellEdit: false,					
									cellTemplate:'<div class="linkDiv"  style="padding-left: 2%;" ng-click="grid.appScope.storeCreateView(row)">'+" {{row.entity.store.name }} "+'</div>'
								},{
									field : 'weekWiseOrdersSubtotal[1]',
									  enableColumnResize: true,
									displayName: 'W 1',
								},{
									field : 'weekWiseOrdersSubtotal[2]',
									  enableColumnResize: true,
									displayName: 'W 2',
								},{
									field : 'weekWiseOrdersSubtotal[3]',
									  enableColumnResize: true,
									displayName: 'W 3',
								},{
									field : 'weekWiseOrdersSubtotal[4]',
									  enableColumnResize: true,
									displayName: 'W 4',
								},{
									field : 'weekWiseOrdersSubtotal[5]',
									displayName: 'W 5',
								}],

					};
					
					var  initialValue = (new Date()).getMonth();
					 $scope.storeSearch.selectedMonth  = $scope.months[initialValue];
					
				};
				return [ '$scope','$q','$interval', '$rootScope','$location','StoreService', 'StoreHomeData', StoreHomeCtrl ];
			});

}(define));