(function(define){
	"use strict";
	
	define([], function() {
		
		var LocalizedMessages = function ($interpolate, $translate) {

		    /**
		     * Description
		     * @method handleNotFound
		     * @param {} msg
		     * @param {} msgKey
		     * @return LogicalExpression
		     */
		    var handleNotFound = function (msg, msgKey) {
		        return msg || '?' + msgKey + '?';
		    };

		    return {
		        /**
		         * Description
		         * @method get
		         * @param {} msgKey
		         * @param {} interpolateParams
		         * @return 
		         */
		        get: function (msgKey, interpolateParams) {
		            //var msg =  i18nmessages[msgKey];
		            var msg = $translate(msgKey);
		            if (msg) {
		                return $interpolate(msg)(interpolateParams);
		            } else {
		                return handleNotFound(msg, msgKey);
		            }
		        }
		    };
		};
		
		return ['$interpolate', '$translate', LocalizedMessages];
	});
	
}(define));