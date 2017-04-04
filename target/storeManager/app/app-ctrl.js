(function(define){
	"use strict";

	define([], function() {

		var AppCtrl = function($scope, $rootScope, $location, $interval,$timeout, $interpolate, $http, $window, breadcrumbs, i18nNotifications, logoutTimer, cfpLoadingBar) {
			//logoutTimer.startLogoutTimer(60*10*1000);



			$scope.notifications = i18nNotifications;
	        $scope.breadcrumbs = breadcrumbs;
	        //cfpLoadingBar.start();

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
	        $scope.getTableStyle = function (dataList) {

	            var rowHeight = 30;
	            var headerHeight = 30 + 5;
	            if (dataList == null || dataList === undefined && dataList.length === 0) {
	                return {
	                    height: 0 + "px"
	                };
	            } else {
	                return {
	                    height: (dataList.length * rowHeight + headerHeight) + "px"
	                };
	            }
	        };
	        var imageNo=1;
	        setBackGround();
	        $interval(setBackGround, 8000);
	        function setBackGround(){
	        	if(imageNo>3){
	        	imageNo=1;
	        	}
	        	 $scope.url="url('images/back"+imageNo+".jpg')  no-repeat border-box";
	        	 $scope.style={"background":  $scope.url,"background-size":"cover"};
	        	 imageNo=imageNo+1;
	        }

	        $scope.setBG=function(type){
	        	$scope.home='';
	        	$scope.gallery='';
	        	$scope.about='';
	        	$scope.contact='';
	        	$scope.event='';
	        	$scope.service='';
	        	$scope.profile='';
	        	$scope.user='';
	        	$scope.requester='';
	        	switch(type){
	        	case "/home":$scope.home='back-color';
	        		break;
	        	case "/store":				        		
	        					$scope.stores='back-color';
	        		break;
	        	case "/about":$scope.about='back-color';
	        		break;
	        	case "/contact":$scope.contact='back-color';
	        		break;
	        	case "/event":$scope.event='back-color';
	        		break;
	        	case "/ourService":$scope.service='back-color';
	        		break;
	        	case "/profile":$scope.profile='back-color';
	        		break;
	        	case "/user":$scope.user='back-color';
        			break;
	        	case "/requester":$scope.requester='back-color';
	        		break;
	        	default:$location.path('/home');
	        			$scope.home='back-color';
	        			break;

	        	}
	        }
	        $scope.setBG($location.$$path);

		};

		return ['$scope', '$rootScope', '$location', '$interval','$timeout', '$interpolate', '$http', '$window', 'breadcrumbs', 'i18nNotifications', 'logoutTimer', 'cfpLoadingBar', AppCtrl ];
	});

}(define));