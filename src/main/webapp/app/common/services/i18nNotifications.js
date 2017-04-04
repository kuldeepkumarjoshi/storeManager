(function(define){
	"use strict";
	
	define([], function() {
		
		var I18nNotifications = function (localizedMessages, notifications) {

		    /**
		     * Description
		     * @method prepareNotification
		     * @param {} msgKey
		     * @param {} type
		     * @param {} interpolateParams
		     * 
		     * @param {} otherProperties
		     * @return CallExpression
		     */
		    var prepareNotification = function (msgKey, type, interpolateParams, otherProperties) {
		        return angular.extend({
		            message: localizedMessages.get(msgKey, interpolateParams),
		            type: type
		        }, otherProperties);
		    };

		    var I18nNotifications = {
		        /**
		         * Description
		         * @method pushSticky
		         * @param {} msgKey
		         * @param {} type
		         * @param {} interpolateParams
		         * @param {} otherProperties
		         * @return CallExpression
		         */
		        pushSticky: function (msgKey, type, interpolateParams, otherProperties) {
		            return notifications.pushSticky(prepareNotification(msgKey, type, interpolateParams, otherProperties));
		        },
		        /**
		         * Description
		         * @method pushForCurrentRoute
		         * @param {} msgKey
		         * @param {} type
		         * @param {} interpolateParams
		         * @param {} otherProperties
		         * @return CallExpression
		         */
		        pushForCurrentRoute: function (msgKey, type, interpolateParams, otherProperties) {
		            return notifications.pushForCurrentRoute(prepareNotification(msgKey, type, interpolateParams, otherProperties));
		        },
		        /**
		         * Description
		         * @method pushForNextRoute
		         * @param {} msgKey
		         * @param {} type
		         * @param {} interpolateParams
		         * @param {} otherProperties
		         * @return CallExpression
		         */
		        pushForNextRoute: function (msgKey, type, interpolateParams, otherProperties) {
		            return notifications.pushForNextRoute(prepareNotification(msgKey, type, interpolateParams, otherProperties));
		        },
		        /**
		         * Description
		         * @method getCurrent
		         * @return CallExpression
		         */
		        getCurrent: function () {
		            return notifications.getCurrent();
		        },
		        /**
		         * Description
		         * @method remove
		         * @param {} notification
		         * @return CallExpression
		         */
		        remove: function (notification) {
		            return notifications.remove(notification);
		        },
		        
		        removeAll: function (notification) {
		            return notifications.removeAll();
		        }
		    };

		    return I18nNotifications;
		}
		
		return ['localizedMessages', 'notifications', I18nNotifications];
	});
	
}(define));