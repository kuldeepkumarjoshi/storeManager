angular.module('resources.cstdata', ['restResource']);
angular.module('resources.cstdata').factory('CSTdata', ['restResource', '$http', '$interpolate', function (restResource, $http, $interpolate) {
    var CSTdata = restResource('/rest/cstRelation/');

    CSTdata.getAYStructures = function (successcb, errorcb) {
        var httpPromise = $http.get('/rest/academicyearstructure/level/class/data');
        return Reportdata.httpPromise(httpPromise, successcb, errorcb);
    };
    
    /**
     * Description
     * @method getTreeStructure
     * @param {} successcb
     * @param {} errorcb
     * @return CallExpression
     */
    CSTdata.getTreeStructure = function (successcb, errorcb) {
        var httpPromise = $http.get('/rest/academicyearstructure/level/class/data');
        return CSTdata.httpPromise(httpPromise, successcb, errorcb);
    };
    
    CSTdata.addSubject = function (successcb, errorcb,classKey,subjectKey) {
        var httpPromise = $http.get('/rest/cstRelation/addSubject?classId='+classKey.id+'&subjectId='+subjectKey.id);
        return CSTdata.httpPromise(httpPromise, successcb, errorcb);
    };
    
    CSTdata.removeSubject = function (successcb, errorcb,classKey,subjectKey) {
        var httpPromise = $http.get('/rest/cstRelation/removeSubject?classId='+classKey.id+'&subjectId='+subjectKey.id);
        return CSTdata.httpPromise(httpPromise, successcb, errorcb);
    };
    
    return CSTdata;
   
}]);
