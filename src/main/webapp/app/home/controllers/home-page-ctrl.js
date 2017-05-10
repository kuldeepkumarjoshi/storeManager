(function(define) {
	"use strict";

	define(
			[],
			function() {

				var HomePageCtrl = function($scope,$q, $location, $interval, $rootScope,DashboadData,HomePageService, i18nNotifications) {

					var isAdmin=true;
					$scope.newQuickOrder ={};
					
					$scope.images=[];
						var deleteBtn='<a ng-click="grid.appScope.deleteConfirmation(row)" style="cursor:pointer;margin-left:2%" uib-tooltip-placement="auto" uib-tooltip="Delete" uib-tooltip-append-to-body="true"><i class="fa fa-trash-o fa-lg text-danger"></i></a>';
						var editBtn='<a ng-click="grid.appScope.editPage(row)" style="cursor:pointer;margin-left:2%" uib-tooltip-placement="auto" uib-tooltip="Edit" uib-tooltip-append-to-body="true"><i class="fa fa-pencil-square-o fa-lg text-info"></i></a>';
					
					 console.log(DashboadData);
					
					    
					$scope.inprogressOrders = DashboadData.inprogressOrders;
					$scope.opportunityData = DashboadData.passiveOppotunity;
					
					
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
						data : 'inprogressOrders',
						columnDefs : [
								{
									field : 'name',
									displayName: 'Store Name',
									enableCellEdit: false,
									cellTemplate:'<a class="" href="#" style="padding-left: 2%;" ng-click="grid.appScope.quickStoreView(row)">'+" {{row.entity.store.name }} "+'</a>'
								},{
									field : 'subTotal',
									displayName: 'Sub-Total',
									enableCellEdit: false,
								},{
									field : 'deliveryDate',
									displayName: 'Delivery Date',
									enableCellEdit: false,
								}],

					};
					
					$scope.gridOptionOpportunity={
							multiSelect : false,
							enableCellEditOnFocus : false,
							 exporterMenuCsv: true,
							 enableGridMenu: true,
							 gridMenuTitleFilter: fakeI18n,
							data : 'opportunityData',
							columnDefs : [
									{
										field : 'name',
										displayName: 'Store Name',
										enableCellEdit: false,
										cellTemplate:'<a class="" href="#" style="padding-left: 2%;" ng-click="grid.appScope.quickStoreView(row)">'+" {{row.entity.name }} "+'</a>'
									},{
										field : 'mostRecentOrderDate',
										displayName: 'Last order date',
										enableCellEdit: false,
									}],

					};
				};
				return [ '$scope','$q', '$location', '$interval', '$rootScope','DashboadData','HomePageService', 'i18nNotifications', HomePageCtrl ];
			});

}(define));