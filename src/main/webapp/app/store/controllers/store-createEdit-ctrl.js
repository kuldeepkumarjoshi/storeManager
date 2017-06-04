(function(define) {
	"use strict";

	define(
			[],
			function() {

				var StoreCreateEditCtrl = function($scope, $location,$rootScope,uiGridConstants , $q,$interval, $http,StoreService,StoreData, i18nNotifications) {
					var isAdmin=true; 
					$scope.quickTitle = "Create Store";
						
				//	 console.log(StoreData);
						$scope.saveStore=function(){
							var obj={
									name:$scope.selectedStore.name+"_"+$scope.storeItemVo.store.name,									
							};
							StoreService.save(obj,function(response){
								alert("saved successfully.");
							},function(response){
								alert("error in save store.");
							});
						};
						
						
					console.log(StoreData);
					$scope.storeItemVo = StoreData.storeItemVo;
					
					$scope.selectedStatus =  $scope.storeItemVo.status;
					$scope.setStores($scope.selectedStore);
				
					
				};
				return [ '$scope', '$location', '$rootScope','uiGridConstants' , '$q','$interval','$http', 'StoreService','StoreData','i18nNotifications', StoreCreateEditCtrl ];
			});

}(define));