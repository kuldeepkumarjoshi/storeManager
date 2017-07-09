(function(define) {
	"use strict";

	define(
			[],
			function() {

				var ZoneHomeCtrl = function($scope,$q,$interval, $rootScope,$location,ZoneService, $http,ZoneHomeData, i18nNotifications) {
					var isAdmin=true; 
					
					 console.log(ZoneHomeData);
					 $scope.zoneSearch ={};
					 $scope.zoneSearch.isDateWise = false;
					 $scope.createZone= function(){
						 $rootScope.selectedZone = {id:null,name:""};
						 $location.path('/zone-createEdit');
					 };
					 $scope.getZoneDetail  = function(){
						var obj={};		 
						if( $scope.zoneSearch.isDateWise){
							 obj.fromDate = $scope.zoneSearch.deliveryFromDate.getTime();	
							 obj.toDate = $scope.zoneSearch.deliveryToDate.getTime();	
						}else{
							obj.month = $scope.zoneSearch.selectedMonth.id;
						}
						 
						 ZoneService.getAllZonesForZonePage(obj,function(res){
							 $scope.zoneData = res.zoneList;
							 $scope.zoneSearch.deliveryFromDate=new Date(res.fromDate);
							 $scope.zoneSearch.deliveryToDate =new Date( res.toDate);
							 // $scope.gridOptions;
						 },function(response){
							 $scope.$internalErrorMsg(response);
						 });
					 };
						$scope.open1 = function($event) {
						    $event.preventDefault();
						    $event.stopPropagation();
						    $scope.opened1 = !$scope.opened1;
						    $scope.opened2 = false;
					  };
						$scope.open2 = function($event) {
						    $event.preventDefault();
						    $event.stopPropagation();
						    $scope.opened2 = ! $scope.opened2;
						    $scope.opened1 = false;
					  };
					$scope.zoneData = ZoneHomeData.zoneList;
					 var fakeI18n = function( title ){
						    var deferred = $q.defer();
						    $interval( function() {
						      deferred.resolve( 'col: ' + title );
						    }, 1000, 1);
						    return deferred.promise;
						  };
					  $scope.createEditZoneView =function(row){
						  $rootScope.selectedZone = row.entity;
						  $location.path('/zone-createEdit').search({id:row.entity.id});
					 };
					 
					 $scope.storeHomePage =function(row){
						  $rootScope.selectedZone = row.entity;
						  $location.path('/stores').search({zoneId:row.entity.id});
					 };
					$scope.gridOptions = {
						multiSelect : false,
						enableCellEditOnFocus : false,
						 exporterMenuCsv: true,
						 enableGridMenu: true,
						 gridMenuTitleFilter: fakeI18n,
						data : 'zoneData',
						columnDefs : [{
									field : 'name',
									displayName: 'Zones',
									cellTemplate:'<div class="linkDiv"  style="padding-left: 2%;" ng-click="grid.appScope.storeHomePage(row)">'+" {{row.entity.name}} "+'</div>'
										
								},
								{
									field : 'totalStores',
									displayName: 'No. of Stores'
								},
								{
									field : 'totalSales',
									displayName: 'Total Sale'
								}],

					};
					
				
					 var initialValue = (new Date()).getMonth();
				$scope.zoneSearch.selectedMonth  = $scope.months[initialValue];
					
				};
				return [ '$scope','$q','$interval', '$rootScope','$location','ZoneService', '$http', 'ZoneHomeData','i18nNotifications', ZoneHomeCtrl ];
			});

}(define));