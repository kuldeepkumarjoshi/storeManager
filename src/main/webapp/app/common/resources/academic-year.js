angular.module('resources.academic-year', ['restResource']);
angular.module('resources.academic-year').factory('Academicyear', ['restResource', '$http', '$interpolate', function (restResource, $http, $interpolate) {
    var Academicyear = restResource('/rest/academicYears/');

    /**
     * Description
     * @method getTreeStructure
     * @param {} successcb
     * @param {} errorcb
     * @return CallExpression
     */
    Academicyear.getTreeStructure = function (successcb, errorcb) {
        var httpPromise = $http.get('/rest/academicyear/term/stage/data');
        return Academicyear.httpPromise(httpPromise, successcb, errorcb);
    };

    /**
     * Description
     * @method updateAcademicYear
     * @param {} data
     * @param {} ayId
     * @param {} successcb
     * @param {} errorcb
     * @return CallExpression
     */
    Academicyear.updateAcademicYear = function (data, ayId, successcb, errorcb) {
        var httpPromise = $http.post($interpolate('/rest/academicYear/academicYearData/update/{{ayId}}')({ayId: ayId}), data);
        return Academicyear.httpPromise(httpPromise, successcb, errorcb, false);
    };
    
    /**
     * Description
     * @method generateReport
     * @param {} ayId
     * @param {} successcb
     * @param {} errorcb
     * @return CallExpression
     */
    Academicyear.generateReport = function(ayId,successcb,errorcb){
        var httpPromise = $http.post($interpolate('/rest/academicYears/{{ayId}}/download')({ayId : ayId}));
        return Academicyear.httpPromise(httpPromise,successcb,errorcb,false);
    };
    return Academicyear;
}]);