(function(define){
	"use strict";
	
	define([], function() {
		
		var Notifications = function ($rootScope, $timeout) {

		    var notifications = {
		        'STICKY': [],
		        'ROUTE_CURRENT': [],
		        'ROUTE_NEXT': []
		    };
		    var notificationsService = {};

		    /**
		     * Description
		     * @method addNotification
		     * @param {} notificationsArray
		     * @param {} notificationObj
		     * @return notificationObj
		     */
		    var addNotification = function (notificationsArray, notificationObj) {
		        if (!angular.isObject(notificationObj)) {
		            throw new Error("Only object can be added to the notification service");
		        }
		        notificationsArray.push(notificationObj);
		        return notificationObj;
		    };

		    $rootScope.$on('$routeChangeSuccess', function () {
		        notifications.ROUTE_CURRENT.length = 0;
		        notifications.ROUTE_CURRENT = angular.copy(notifications.ROUTE_NEXT);
		        notifications.ROUTE_NEXT.length = 0;
		    });

		    /**
		     * Description
		     * @method getCurrent
		     * @return CallExpression
		     */
		    notificationsService.getCurrent = function () {
		        return [].concat(notifications.STICKY, notifications.ROUTE_CURRENT);
		    };

		    /**
		     * Description
		     * @method pushSticky
		     * @param {} notification
		     * @return CallExpression
		     */
		    notificationsService.pushSticky = function (notification) {
		        return addNotification(notifications.STICKY, notification);
		    };

		    /**
		     * Description
		     * @method pushForCurrentRoute
		     * @param {} notification
		     * @return anNotification
		     */
		    notificationsService.pushForCurrentRoute = function (notification) {
		        var anNotification = addNotification(notifications.ROUTE_CURRENT, notification);

		        // Only removing success type notifications with timeout
		        if (notification.type === "success") {
		            notificationsService.removeAuto(notification, 5000);
		        } else if (notification.type === "warning") {
		            notificationsService.removeAuto(notification, 7000);
		        } 
		        return anNotification;
		    };

		    /**
		     * Description
		     * @method pushForNextRoute
		     * @param {} notification
		     * @return anNotification
		     */
		    notificationsService.pushForNextRoute = function (notification) {
		        var anNotification = addNotification(notifications.ROUTE_NEXT, notification);

		        // Only removing success type notifications with timeout
		        if (notification.type === "success") {
		            notificationsService.removeAuto(notification);
		        } else if (notification.type === "warning") {
		            notificationsService.removeAuto(notification, 5000);
		        }
		        return anNotification;
		    };

		    /**
		     * Description
		     * @method removeAuto
		     * @param {} notification
		     * @param {} timeout
		     * @return 
		     */
		    notificationsService.removeAuto = function (notification, timeout) {
		        if (timeout === undefined || timeout == null) {
		            timeout = 3000;
		        }
		        $timeout(function () {
		            var routeCurrent = notifications.ROUTE_CURRENT;
		            angular.forEach(routeCurrent, function (notification) {
		                notificationsService.remove(notification);
		            });
		        }, timeout);
		    };

		    /**
		     * Description
		     * @method remove
		     * @param {} notification
		     * @return 
		     */
		    notificationsService.remove = function (notification) {
		        angular.forEach(notifications, function (notificationsByType) {
		            var idx = notificationsByType.indexOf(notification);
		            if (idx > -1) {
		                notificationsByType.splice(idx, 1);
		            }
		        });
		    };

		    /**
		     * Description
		     * @method removeAll
		     * @return 
		     */
		    notificationsService.removeAll = function () {
		        angular.forEach(notifications, function (notificationsByType) {
		            notificationsByType.length = 0;
		        });
		    };

		    return notificationsService;
		};
		
		return ['$rootScope', '$timeout', Notifications];
	});
	
}(define));