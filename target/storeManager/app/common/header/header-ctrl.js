(function(define){
	"use strict";
	
	define([], function() {
		
		var HeaderCtrl = function($scope, $http, $window, cfpLoadingBar) {
			
			cfpLoadingBar.start();
		    
		    $scope.mainMenuList = []; 
		    $scope.moreMenuList = []; 

		    /**
		     * Description
		     * @method incLength
		     * @return 
		     */
		    $scope.incLength = function () {
		        angular.element("#advSearch").animate({'width': '250px'});
		    };

		    /**
		     * Description
		     * @method decLength
		     * @return 
		     */
		    $scope.decLength = function () {
		        angular.element("#advSearch").animate({'width': '150px'});
		    };
		    
		     
		    
		    $scope.getHeaderInfo = function() {
		        $http.get('/rest/general/getHeaderInfo').success(function(data) {
		            $scope.currentUser = data.appUser;
		            $scope.initialLoggedUser = data.initialLoggedUser;
		            $scope.currentAcdYearName = data.currentSelectedAcademicYear;
		            $scope.currentAcdYearKey = data.currentSelectedAcademicYearKey;
		            $scope.acdYearList = data.acdYearList;
		            
		            $scope.currentAcdYearUnitName = data.currentSelectedAcademicYearUnit;
		            $scope.currentAcdYearUnitKey = data.currentSelectedAcademicYearUnitKey;
		            $scope.acdYearUnitList = data.acdYearUnitList;
		            
		            $scope.mainMenuList = data.mainMenuList;
		            $scope.moreMenuList = data.moreMenuList;	
		            
		            $scope.headerTitle = data.headerTitle;
		            
		            $scope.selectedAcademicYearKey = $scope.currentAcdYearKey;
		            $scope.selectedAcademicYearUnitKey = $scope.currentAcdYearUnitKey;
		        });
		        console.log("header");
		    };
		    $scope.getHeaderInfo();

		    /**
		     * Description
		     * @method setDataContext
		     * @param {} selectedAcadYearKey
		     * @return 
		     */
		    $scope.setDataContext = function () {
		    	console.log("yes");
	            $window.location.href = '/rest/setDataContext?acadYear=' + $scope.selectedAcademicYearKey+ '&acadYearUnit=' +$scope.selectedAcademicYearUnitKey;
		    };
		    
		    $scope.setAcademicYear = function (key) {
		    	console.log(key);
		        if (key != undefined && key != null) {
		        	$scope.selectedAcademicYearKey = key;
		        	$scope.setDataContext();
		        }
		    };
		    
		    $scope.setAcademicYearUnit = function (key) {
		    	console.log(key);
		        if (key != undefined && key != null) {
		        	$scope.selectedAcademicYearUnitKey = key;
		        	$scope.setDataContext();
		        }
		    };
			
		};
		
		return ['$scope', '$http', '$window', 'cfpLoadingBar', HeaderCtrl];
	});
	
}(define));