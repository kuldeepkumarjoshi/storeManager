(function(define) {
	"use strict";

	define(
			[],
			function() {

				var HomePageCtrl = function($scope,$q, $location, $interval, $rootScope,DashboadData,HomePageService, i18nNotifications) {

					var isAdmin=true;
					$scope.newQuickOrder ={};					
						
					 console.log(DashboadData);
					
					    
					$scope.inprogressOrders = DashboadData.inprogressOrders;
					$scope.opportunityData = DashboadData.passiveOppotunity;
					 $scope.createEditOrderView2 =function(row){
						  $rootScope.selectedOrder = row.entity;
						  $location.path('/order-createEdit').search({id:row.entity.id});
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
						 gridMenuTitleFilter: fakeI18n,
						data : 'inprogressOrders',
						columnDefs : [
								{
									field : 'name',
									displayName: 'Store',
									enableCellEdit: false,
									cellTemplate:'<div class="linkDiv"  style="padding-left: 2%;" ng-click="grid.appScope.createEditOrderView2(row)">'+" {{row.entity.store.name }} "+'</div>'
								},{
									field : 'subTotal',
									displayName: 'Sub-Total'
								},{
									field : 'deliveryDate',
									displayName: 'Delivery',
									cellFilter: 'date:"dd/MM/yyyy"', 
									filterCellFiltered:true,
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
										displayName: 'Store',
										enableCellEdit: false,
										cellTemplate:'<div class="linkDiv" style="padding-left: 2%;" ng-click="grid.appScope.quickStoreView(row)">'+" {{row.entity.name }} "+'</div>'
									},{
										field : 'mostRecentOrderDate',
										displayName: 'Last order',
										cellFilter: 'date:"dd/MM/yyyy"', 
										filterCellFiltered:true
									}],

					};
				};
				return [ '$scope','$q', '$location', '$interval', '$rootScope','DashboadData','HomePageService', 'i18nNotifications', HomePageCtrl ];
			});

}(define));