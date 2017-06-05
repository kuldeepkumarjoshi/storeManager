(function(define) {
	"use strict";

	define(
			[],
			function() {

				var ZoneCreateEditCtrl = function($scope, $location,$rootScope,uiGridConstants , $q,$interval, $http,ZoneService,ZoneData, i18nNotifications) {
					var isAdmin=true; 
					
						
				//	 console.log(ZoneData);
						$scope.saveZone=function(){
							var obj={
									name:$scope.selectedZone.name,
									id:$scope.selectedZone.id
							};
							ZoneService.saveZone($scope.selectedZone,function(response){
								alert("saved successfully.");
							},function(response){
								alert("error in save zone.");
							});
						};
						
						
					console.log(ZoneData);
					$scope.storeData = ZoneData.storeList;
					if($rootScope.selectedZone.id == null || $rootScope.selectedZone.id == undefined){
						$scope.quickTitle = "Create Zone";
					}else{
						$scope.quickTitle = "Edit Zone";
					}
					
					
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
				return [ '$scope', '$location', '$rootScope','uiGridConstants' , '$q','$interval','$http', 'ZoneService','ZoneData','i18nNotifications', ZoneCreateEditCtrl ];
			});

}(define));