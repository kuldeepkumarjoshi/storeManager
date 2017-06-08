(function(define){
	"use strict";

	define([], function() {

		var AppCtrl = function($scope, $rootScope, $location, $interval,$timeout, $interpolate, $http, $window, breadcrumbs, i18nNotifications, logoutTimer, cfpLoadingBar) {
			//logoutTimer.startLogoutTimer(60*10*1000);
			var oneDay = 24*60*60*1000;

			$scope.headerText="";
			$scope.notifications = i18nNotifications;
	        $scope.breadcrumbs = breadcrumbs;
	        //cfpLoadingBar.start();
	        $scope.$back=function(){
				$window.history.back();
			}
	        $scope.$storeCreateView =function(row){
				  $rootScope.selectedStore = row.entity; 
				  $location.path('/store-createEdit').search({id:row.entity.id});
			 };
			 $scope.$getClassByLastDate = function(lastDate){
					var diff = new Date().getTime()  - new Date(lastDate).getTime(); 
					if( diff > 7*oneDay ){
						return "bgRed";
					}else{
						return "";
					}
				}
	        $scope.$on('$routeChangeError', function (event, current, previous, rejection) {
	            i18nNotifications.pushForCurrentRoute('errors.route.changeError', 'danger', {}, {rejection: rejection});
	        });

	        if($window.innerWidth<600){
	        	 $scope.isMobile=true;
	        };

	        $scope.$watch(function(){
	            return $window.innerWidth;
	         }, function(value) {
	        	 if(value<600){
	        		 $scope.isMobile=true;
	        	 }else{
	        		 $scope.isMobile=false;
	        	 }

	        },true);
	       /* $scope.$on("$stateChangeSuccess", function updatePage() {
	            $scope.page = $state.params.slug;
	        });*/
	        /**
	         * Description
	         * @method removeNotification
	         * @param {} notification
	         * @return
	         */
	        $scope.removeNotification = function (notification) {
	            i18nNotifications.remove(notification);
	        };

	        /**
	         * Description
	         * @method redirect
	         * @param {} path
	         * @return
	         */
	        $scope.redirect = function (path) {
	            $location.path(path);
	        };

	        /**
	         *
	         * @param dataList
	         * @returns {{height: string}}
	         */
	        $scope.getTableHeight = function (dataList,extraAdd ) {
	        	if(extraAdd == null){
	        		extraAdd = 0 ;
	        	}
	        	 if(! $scope.isMobile){
	        		 extraAdd = extraAdd + 9;
		            }
	            var rowHeight = 30;
	            var headerHeight = 30 + 5;
	           
	            if (dataList == null || dataList === undefined && dataList.length === 0) {
	                return {
	                    height: 0 + "px"
	                };
	            } else {
	                return {
	                    height: (dataList.length * rowHeight + headerHeight)+extraAdd + "px"
	                };
	            }
	        };
	       

	        $scope.setBG=function(type){
	        	$scope.home='';
	        	$scope.about='';
	        	$scope.stores='';
	        	$scope.zones='';
	        	switch(type){
	        	case "/home":$scope.home='back-color';$scope.headerText ="Welcome";
	        		break;
	        	case "/stores":				        	$scope.headerText ="Select Store";	
	        					$scope.stores='back-color';
	        		break;
	        	case "/about":$scope.about='back-color';
	        		break;
	        	case "/zones":$scope.zones='back-color'; $scope.headerText ="Select Zone";
        			break;	        	
	        	/*case "/contact":$scope.contact='back-color';
	        		break;*/
	        	default:$location.path('/quickOrder/selectZone');
	        			$scope.home='back-color';
	        			break;

	        	}
	        }
	        $scope.setBG($location.$$path);

		};

		return ['$scope', '$rootScope', '$location', '$interval','$timeout', '$interpolate', '$http', '$window', 'breadcrumbs', 'i18nNotifications', 'logoutTimer', 'cfpLoadingBar', AppCtrl ];
	});

}(define));