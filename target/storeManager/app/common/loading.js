(function(define){
	"use strict";
	
	define([], function() {
		
		var moduleName = "services.loading";
		var mod = angular.module(moduleName, []);

		mod.factory('loadingService', function () {
		    var service = {
		        requestCount: 0,
		        /**
		         * Description
		         * @method isLoading
		         * @return BinaryExpression
		         */
		        isLoading: function () {
		            return service.requestCount > 0;
		        }
		    };
		    return service;
		});

		
		mod.factory('onStartInterceptor', ['loadingService', function (loadingService) {
		    return function (data, headersGetter) {
		        loadingService.requestCount++;
		        return data;
		    };
		}]);
		
		

		// This is just a delay service for effect!
		mod.factory('delayedPromise', ['$q', '$timeout', function ($q, $timeout) {
		    return function (promise, delay) {
		        var deferred = $q.defer();
		        /**
		         * Description
		         * @method delayedHandler
		         * @return 
		         */
		        var delayedHandler = function () {
		            $timeout(function () {
		                deferred.resolve(promise);
		            }, delay);
		        };
		        promise.then(delayedHandler, delayedHandler);
		        return deferred.promise;
		    };
		}]);

		mod.factory('onCompleteInterceptor', ['loadingService', 'delayedPromise', '$location', function (loadingService, delayedPromise, location) {
		    return function (promise) {
		        /**
		         * Description
		         * @method decrementRequestCount
		         * @param {} response
		         * @return response
		         */
		    	
		        var decrementRequestCount = function (response) {
		            loadingService.requestCount--;
		            return response;
		        };
		        var decrementRequestCountError = function (response) {
		            loadingService.requestCount--;
		            if(response.status == 401){
		            	window.location.assign("logout.do");
		            }else{
		            	location.path("error");
		            }
		            
		            return response;
		        };
		        // Normally we would just chain on to the promise but ...
		        return promise.then(decrementRequestCount, decrementRequestCountError);
		        // ... we are delaying the response by 2 secs to allow the loading to be seen.
		        //return delayedPromise(promise, 2000).then(decrementRequestCount, decrementRequestCount);
		    };
		}]);

		mod.config(['$httpProvider', function ($httpProvider) {
		    $httpProvider.responseInterceptors.push('onCompleteInterceptor');
		}]);

		mod.run(['$http', 'onStartInterceptor', function ($http, onStartInterceptor) {
		    $http.defaults.transformRequest.push(onStartInterceptor);
		}]);

		mod.controller('LoadingCtrl', ['$scope', 'loadingService', function ($scope, loadingService) {
		    $scope.$watch(function () {
		        return loadingService.isLoading();
		    }, function (value) {
		        $scope.loading = value;
		    });
		}]);
		
		return moduleName;
	});
	
}(define));