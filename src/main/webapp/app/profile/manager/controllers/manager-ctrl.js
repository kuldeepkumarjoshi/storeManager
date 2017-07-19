(function(define) {
	"use strict";

	define(
			[],
			function() {

				var HomePageCtrl = function($scope,$http, $location, $state, $rootScope, i18nNotifications) {

					$scope.postData=function(){
						$http.post('/eventManagement/dataFile/contacts.json',{
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
				return [ '$scope','$http', '$location', '$state', '$rootScope', 'i18nNotifications', HomePageCtrl ];
			});

}(define));