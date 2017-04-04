angular.module('services.httpRequestTracker', []);
angular.module('services.httpRequestTracker').factory('httpRequestTracker', ['$http', function ($http) {

    var httpRequestTracker = {};
    /**
     * Description
     * @method hasPendingRequests
     * @return BinaryExpression
     */
    httpRequestTracker.hasPendingRequests = function () {
        return $http.pendingRequests.length > 0;
    };

    return httpRequestTracker;
}]);