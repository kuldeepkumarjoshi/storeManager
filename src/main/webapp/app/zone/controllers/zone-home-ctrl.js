(function(define) {
	"use strict";

	define(
			[],
			function() {

				var ZoneHomeCtrl = function($scope,$q,$interval, $rootScope,$location, $http,ZoneHomeData, i18nNotifications) {
					var isAdmin=true; 
					
					 console.log(ZoneHomeData);
					 
					 $scope.createZone= function(){
						 $rootScope.selectedZone = {id:null,name:""};
						 $location.path('/zone-createEdit');
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
					$scope.gridOptions = {
						multiSelect : false,
						enableCellEditOnFocus : false,
						 exporterMenuCsv: true,
						 enableGridMenu: true,
						 gridMenuTitleFilter: fakeI18n,
						data : 'zoneData',
						columnDefs : [{
									field : 'name',
									displayName: 'Zone',
									cellTemplate:'<div class="linkDiv"  style="padding-left: 2%;" ng-click="grid.appScope.createEditZoneView(row)">'+" {{row.entity.name}} "+'</div>'
										
								}/*,
								{
									field : 'deliveryDate',
									displayName: 'Delivery',
									cellFilter: 'date:"dd/MM/yyyy"', 
									filterCellFiltered:true
								},
								{
									field : 'status',
									displayName: 'Status'
								}*/],

					};
					
				};
				return [ '$scope','$q','$interval', '$rootScope','$location', '$http', 'ZoneHomeData','i18nNotifications', ZoneHomeCtrl ];
			});

}(define));