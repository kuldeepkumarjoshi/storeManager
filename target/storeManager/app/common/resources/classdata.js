angular.module('resources.classdata', ['restResource']);
angular.module('resources.classdata').factory('ClassData', ['restResource', '$http', '$interpolate', function (restResource, $http, $interpolate) {
    var ClassData = restResource('/rest/cstRelation/');
   
    /*ClassData.getClassesByLevelId = function (classId,successcb, errorcb) {
        var httpPromise = $http.get($interpolate('/rest/cstRelation/ays/level/class/{{classId}}/classes')({levelId: levelId}));
        return  ClassData.httpPromise(httpPromise, successcb, errorcb,false);
    };*/
    
   return ClassData;
}]);