(function(define) {
	"use strict";

	define(
			[],
			function() {

				var HomePageCtrl = function($scope,$http, $location, $state, $rootScope,HomePageService, i18nNotifications) {

					$scope.login=function(){
						HomePageService.login(obj)
							.success(function(res){
								console.log(res);
							})
							.error(function(res){
								console.log(res);
							});
					};
					
					$scope.postData=function(){
						$http.post('/eventManagment/dataFile/contacts.json',{
							params:{
								name:"kuldeep"
							}
						})
						.success(function(response){
							console.log(response);
						})
						.error(function(response){
							console.log(response);
						});
					}
				};
				return [ '$scope','$http', '$location', '$state', '$rootScope','HomePageService', 'i18nNotifications', HomePageCtrl ];
			});

}(define));