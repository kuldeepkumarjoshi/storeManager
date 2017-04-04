(function(define){
	"use strict";
	
	define([], function() {
		
		var moduleName = 'directives.common';
		angular.module(moduleName, [])
			.directive('listValues', function () {
			    return {
		            restrict: "AE",
		            scope: {
		                setName: '=setName',
		                metamodel: '=metamodel',
		                form: '=',
		                onvaluechange: "&",
		                listdisable: "&",
						listrequired: "&",
						listinvalid : "&"
						//objectRef: '=objectRef'
		            },
		            templateUrl: 'app/common/directives/listValues.tpl.html',
		            /**
		             * Description
		             * @method controller
		             * @param {} $scope
		             * @param {} $http
		             * @param {} restResource
		             * @return 
		             */
		            controller: function ($scope, $http, restResource) {
		                /**
		                 * Description
		                 * @method getListOfValues
		                 * @param {} setName
		                 * @return CallExpression
		                 */
		                $scope.getListOfValues = function (setName) {
		                    return $http.get('/rest/value/' + setName + '/valueList');
		                };
		            },
		            /**
		             * Description
		             * @method link
		             * @param {} scope
		             * @param {} elem
		             * @param {} attr
		             * @return 
		             */
		            link: function (scope, elem, attr) {
		                //load the data, or check if it's loaded and apply it.

		                scope.getListOfValues(attr.setname).then(function (result) {
		                    //success! set your scope values
		                	scope.dataValues = result.data;
		                    if(scope.metamodel !== null && scope.metamodel !== undefined){
		                        for(var i=0;i<scope.dataValues.length;i++){
		                            if(angular.equals(scope.metamodel.id,scope.dataValues[i].id)){
		                                scope.metamodel = scope.dataValues[i];
		                            }
		                        }
		                    } else {
		                        scope.metamodel = null;
		                     }
		                }, function () {
		                    scope.dataValues = 'ERROR: failed to load data.';
		                });
		                
		            }
			    };
			});
		
		return moduleName;
	});
	
}(define));
