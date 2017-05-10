(function(define) {
	"use strict";

	define(
			[],
			function() {

				var QuickOrderZoneCtrl = function($scope,$q, $interval,$location, $rootScope,QuickOrderZoneData, i18nNotifications) {
					var isAdmin=true;
					$scope.newQuickOrder ={};
					$scope.$parent.quickTitle = "Select Zone";
					$scope.images=[];
						var deleteBtn='<a ng-click="grid.appScope.deleteConfirmation(row)" style="cursor:pointer;margin-left:2%" uib-tooltip-placement="auto" uib-tooltip="Delete" uib-tooltip-append-to-body="true"><i class="fa fa-trash-o fa-lg text-danger"></i></a>';
						var editBtn='<a ng-click="grid.appScope.editPage(row)" style="cursor:pointer;margin-left:2%" uib-tooltip-placement="auto" uib-tooltip="Edit" uib-tooltip-append-to-body="true"><i class="fa fa-pencil-square-o fa-lg text-info"></i></a>';
					
					 console.log(QuickOrderZoneData);
					
					    
					$scope.quickOrderZoneData = QuickOrderZoneData.zoneList;
					
					
					 var fakeI18n = function( title ){
						    var deferred = $q.defer();
						    $interval( function() {
						      deferred.resolve( 'col: ' + title );
						    }, 1000, 1);
						    return deferred.promise;
						  };
						  
					  $scope.quickStoreView =function(row){
						  $rootScope.selectedZone = row;
						  $location.path('/quickOrder/selectStore').search({id:row.entity.id});
					  }
					$scope.gridOptions = {
						multiSelect : false,
						enableCellEditOnFocus : false,
						 exporterMenuCsv: true,
						 enableGridMenu: true,
						 gridMenuTitleFilter: fakeI18n,
						data : 'quickOrderZoneData',
						columnDefs : [
								{
									field : 'name',
									displayName: 'Name',
									enableCellEdit: false,
									cellTemplate:'<a class="" href="#" style="padding-left: 2%;" ng-click="grid.appScope.quickStoreView(row)">'+" {{row.entity.name }} "+'</a>'
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
				return [ '$scope','$q','$interval', '$location','$rootScope', 'QuickOrderZoneData','i18nNotifications', QuickOrderZoneCtrl ];
			});

}(define));