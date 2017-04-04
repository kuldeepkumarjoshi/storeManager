(function(define) {
	"use strict";

	define(
			[],
			function() {

				var UserCtrl = function($scope,$http, $location, $state, $rootScope,UserData, i18nNotifications,UserService,UserManager) {
					$scope.notification = [];

					$scope.closeAlert = function(index) {
	                
	               };
					    
		           	$scope.dobOpen = function($user) {
						$user.preventDefault();
						$user.stopPropagation();
						$scope.isDOBOpened = true;
					};
					$scope.userGridData=angular.copy(UserData.userVOs);
					$scope.isAdmin=UserManager.isAdmin;
					
					$scope.deleteConfirmation=function(row){
						angular.element("#deleteModel").modal("show");
						$scope.deleteRow=row.entity;
					};
					$scope.getTableHeight = function() {
						return  UserManager.setTableHeight($scope.userGridData);
					 };
					
					$scope.deleteUser=function(){
						var obj ={	userId:$scope.deleteRow.id	};
						UserManager.deleteUser($scope.userGridData,obj,'user.delete.success',$scope.deleteRow);
					};
					$scope.gridOptions=UserManager.gridOptions;
					$scope.currentFocused = "";
					 
				   
				 
				    $scope.gridOptions.onRegisterApi = function(gridApi){
				       $scope.gridApi = gridApi;
				    };	
				    
					$scope.editPage=function(row){
						$scope.newUser=row.entity;
						angular.element("#createEditModel").modal("show");
					};
					$scope.beforeCreate=function(){
						$scope.newUser=[];
						$scope.newUser.dob = new Date();
						angular.element("#createEditModel").modal("show");
					};

					$scope.redirect=function(contact){
						$scope.setBG(contact);
						$location.path(contact);
					};

					$scope.saveUser=function(){
						//angular.copy($scope.newUser,UserVO);
						var path='/rest/user/insert';
						var userVO={
								firstName:$scope.newUser.firstName,
								lastName:$scope.newUser.lastName,
								email:$scope.newUser.email,
								role:$scope.newUser.role,
								dob:$scope.newUser.dob,
							};
						if(!UserManager.isValidUser(userVO,$scope.notification)){
							return false;
						}
						if($scope.newUser.id!=null){
							UserManager.saveUser(path,userVO,null);
						}else{
							UserManager.saveUser(path,userVO,$scope.userGridData);
						}
						console.log(userVO);
						
					};

				};
				return [ '$scope','$http', '$location', '$state', '$rootScope', 'UserData','i18nNotifications','UserService','UserManager', UserCtrl ];
			});

}(define));