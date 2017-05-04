(function(define) {
	"use strict";

	define(
			[],
			function() {

				var ZoneCtrl = function($scope,$q, $interval,$location, $http,$rootScope,ZoneData,ZoneService, i18nNotifications) {
					var isAdmin=true;
					$scope.newZone ={};
					
					$scope.images=[];
						var deleteBtn='<a ng-click="grid.appScope.deleteConfirmation(row)" style="cursor:pointer;margin-left:2%" uib-tooltip-placement="auto" uib-tooltip="Delete" uib-tooltip-append-to-body="true"><i class="fa fa-trash-o fa-lg text-danger"></i></a>';
						var editBtn='<a ng-click="grid.appScope.editPage(row)" style="cursor:pointer;margin-left:2%" uib-tooltip-placement="auto" uib-tooltip="Edit" uib-tooltip-append-to-body="true"><i class="fa fa-pencil-square-o fa-lg text-info"></i></a>';
					
					 console.log(ZoneData);
					
					    
					$scope.zoneData = ZoneData.zoneList;
					
					$scope.saveZone=function(){
						var obj={
								zoneName:$scope.newZone.name
						}
						ZoneService.save(obj,function(response){
							alert("success");
						},function(response){
							alert("error in saving zone");
						});
					};
					 var fakeI18n = function( title ){
						    var deferred = $q.defer();
						    $interval( function() {
						      deferred.resolve( 'col: ' + title );
						    }, 1000, 1);
						    return deferred.promise;
						  };
						  
					  $scope.storeView =function(row){
						  $rootScope.selectedZone = row;
						  $location.path('/stores').search({id:row.entity.id});;
					  }
					$scope.gridOptions = {
						multiSelect : false,
						enableCellEditOnFocus : false,
						 exporterMenuCsv: true,
						 enableGridMenu: true,
						 gridMenuTitleFilter: fakeI18n,
						data : 'zoneData',
						columnDefs : [
								{
									field : 'name',
									displayName: 'Name',
									enableCellEdit: false,
									cellTemplate:'<a class="" href="#" style="padding-left: 2%;" ng-click="grid.appScope.storeView(row)">'+" {{row.entity.name }} "+'</a>'
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
				return [ '$scope','$q','$interval', '$location', '$http','$rootScope', 'ZoneData','ZoneService','i18nNotifications', ZoneCtrl ];
			});

}(define));