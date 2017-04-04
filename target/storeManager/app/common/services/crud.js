angular.module('services.crud', ['services.crudRouteProvider']);
angular.module('services.crud').factory('crudEditMethods', function () {

    return function (itemName, item, formName, successcb, errorcb) {

        var mixin = {};

        mixin[itemName] = item;
        mixin[itemName + 'Copy'] = angular.copy(item);

        /**
         * Description
         * @method save
         * @return 
         */
        mixin.save = function () {
            this[itemName].$saveOrUpdate(successcb, successcb, errorcb, errorcb);
        };

        /**
         * Description
         * @method canSave
         * @return LogicalExpression
         */
        mixin.canSave = function () {
            return this[formName].$valid && !angular.equals(this[itemName], this[itemName + 'Copy']);
        };

        /**
         * Description
         * @method revertChanges
         * @return 
         */
        mixin.revertChanges = function () {
            this[itemName] = angular.copy(this[itemName + 'Copy']);
        };

        /**
         * Description
         * @method canRevert
         * @return UnaryExpression
         */
        mixin.canRevert = function () {
            return !angular.equals(this[itemName], this[itemName + 'Copy']);
        };

        /**
         * Description
         * @method remove
         * @return 
         */
        mixin.remove = function () {
            if (this[itemName].$id()) {
                this[itemName].$remove(successcb, errorcb);
            } else {
                successcb();
            }
        };

        /**
         * Description
         * @method canRemove
         * @return CallExpression
         */
        mixin.canRemove = function () {
            return item.$id();
        };

        /**
         * Get the CSS classes for this item, to be used by the ng-class directive
         * @param {string} fieldName The name of the field on the form, for which we want to get the CSS classes
         * @return {object} A hash where each key is a CSS class and the corresponding value is true if the class is to be applied.
         */
        /**
         * Description
         * @method getCssClasses
         * @param {} fieldName
         * @return ObjectExpression
         */
        mixin.getCssClasses = function (fieldName) {
            var ngModelController = this[formName][fieldName];
            return {
                error: ngModelController.$invalid && ngModelController.$dirty,
                success: ngModelController.$valid && ngModelController.$dirty
            };
        };

        /**
         * Whether to show an error message for the specified error
         * @param {string} fieldName The name of the field on the form, of which we want to know whether to show the error
         * @param  {string} error - The name of the error as given by a validation directive
         * @return {Boolean} true if the error should be shown
         */
        /**
         * Description
         * @method showError
         * @param {} fieldName
         * @param {} error
         * @return MemberExpression
         */
        mixin.showError = function (fieldName, error) {
            return this[formName][fieldName].$error[error];
        };

        return mixin;
    };
});

angular.module('services.crud').factory('crudListMethods', ['$location', function ($location) {

    return function (pathPrefix) {

        var mixin = {};

        /**
         * Description
         * @return 
         */
        mixin['new'] = function () {
            $location.path(pathPrefix + '/new');
        };

        /**
         * Description
         * @param {} itemId
         * @return 
         */
        mixin['edit'] = function (itemId) {
            $location.path(pathPrefix + '/' + itemId);
        };

        return mixin;
    };
}]);