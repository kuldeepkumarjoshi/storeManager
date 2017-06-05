(function(define) {
	"use strict";

	define(
			[],
			function() {

				var StoreHomeCtrl = function($scope,$q,$interval, $rootScope,$location, $http,StoreHomeData, i18nNotifications) {
					var isAdmin=true; 
					
					 console.log(StoreHomeData);
					 
					 $scope.createStore= function(){
						 $rootScope.selectedStore = {id:null,name:""};
						 $location.path('/store-createEdit');
					 };
					$scope.storeData = StoreHomeData.storeList;
					
					
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
						data : 'storeData',
						columnDefs : [
								{
									field : 'name',
									displayName: 'Store',
									enableCellEdit: false,					
									cellTemplate:'<div class="linkDiv"  style="padding-left: 2%;" ng-click="grid.appScope.$storeCreateView(row)">'+" {{row.entity.name }} "+'</div>'
								},
								{
									field : 'mostRecentOrderDate',
									displayName: 'Last Order',
									cellFilter: 'date:"dd/MM/yyyy"', 
									filterCellFiltered:true
								}],

					};
					
					
				};
				return [ '$scope','$q','$interval', '$rootScope','$location', '$http', 'StoreHomeData','i18nNotifications', StoreHomeCtrl ];
			});

}(define));