(function(define) {
	"use strict";

	define(
			[],
			function() {

				var RequesterCtrl = function($scope,$http, $location, $state, $rootScope,RequesterData, i18nNotifications,RequesterService,RequesterManager) {
					$scope.newRequester=[];
					$scope.newRequester.dob = new Date();
					$scope.dobOpen = function($user) {
						$user.preventDefault();
						$user.stopPropagation();

						$scope.isDOBOpened = true;
					};
					
					$scope.userGridData=angular.copy(RequesterData.userVOs);
					 $scope.isAdmin=RequesterManager.isAdmin;
					
					$scope.deleteConfirmation=function(row){
						$scope.deleteRow=row.entity;
					};
					$scope.deleteRequester=function(){
						var obj ={	userId:$scope.deleteRow.id	};
						RequesterManager.deleteRequester(obj);
					};
					$scope.gridOptions=RequesterManager.gridOptions;
					$scope.currentFocused = "";
					 
				    $scope.getCurrentFocus = function(){
				      var rowCol = $scope.gridApi.cellNav.getFocusedCell();
				      if(rowCol !== null) {
				          $scope.currentFocused = 'Row Id:' + rowCol.row.entity.id + ' col:' + rowCol.col.colDef.name;
				      }
				    }
				 
				    $scope.gridOptions.onRegisterApi = function(gridApi){
				       $scope.gridApi = gridApi;
				    };	
					
					$scope.redirect=function(contact){
						$scope.setBG(contact);
						$location.path(contact);
					};

					$scope.saveRequester=function(){
						//angular.copy($scope.newRequester,userVO);
						
						var userVO={
							firstName:$scope.newRequester.firstName,
							lastName:$scope.newRequester.lastName,
							dob:$scope.newRequester.dob,
							email:$scope.newRequester.email,
							role:$scope.newRequester.role
						};
						console.log(userVO);
						RequesterManager.saveRequester(userVO);
					}

				};
				return [ '$scope','$http', '$location', '$state', '$rootScope', 'RequesterData','i18nNotifications','RequesterService','RequesterManager', RequesterCtrl ];
			});

}(define));