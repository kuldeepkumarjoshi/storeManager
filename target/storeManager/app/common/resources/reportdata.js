angular.module('resources.reportdata', ['restResource']);
angular.module('resources.reportdata').factory('Reportdata', ['restResource', '$http', '$interpolate', function (restResource, $http, $interpolate) {
    var Reportdata = restResource('/rest/report/');

    /**
     * Description
     * @method getAYStructures
     * @param {} successcb
     * @param {} errorcb
     * @return CallExpression
     */
    Reportdata.getAYStructures = function (successcb, errorcb) {
        var httpPromise = $http.get('/rest/academicyearstructure/level/class/data');
        return Reportdata.httpPromise(httpPromise, successcb, errorcb);
    };

    /**
     * Description
     * @method getCompletedMileStonesData
     * @param {} aysId
     * @param {} levelId
     * @param {} classId
     * @param {} successcb
     * @param {} errorcb
     * @return CallExpression
     */
    Reportdata.getCompletedMileStonesData = function (aysId, levelId, classId, successcb, errorcb) {
        var httpPromise = $http.get($interpolate('/rest/ays/{{aysId}}/level/{{levelId}}/class/{{classId}}/completedMileStone/data')({aysId: aysId, levelId: levelId, classId: classId}));
        return Reportdata.httpPromise(httpPromise, successcb, errorcb);
    };

    /**
     * Description
     * @method getScholasticReport
     * @param {} reportModel
     * @param {} successcb
     * @param {} errorcb
     * @return CallExpression
     */
    Reportdata.getScholasticReport = function (reportModel, successcb, errorcb) {
        var httpPromise = $http.post('/rest/report/scholastic/show', reportModel);
        return Reportdata.httpPromise(httpPromise, successcb, errorcb, false);
    };

    /**
     * Description
     * @method mailScholasticReport
     * @param {} reportModel
     * @param {} successcb
     * @param {} errorcb
     * @return CallExpression
     */
    Reportdata.mailScholasticReport = function (reportModel, successcb, errorcb) {
        var httpPromise = $http.post('/rest/report/scholastic/mail', reportModel);
        return Reportdata.httpPromise(httpPromise, successcb, errorcb, false);
    };

    /**
     * Description
     * @method getTemplate
     * @param {} aysId
     * @param {} levelId
     * @param {} classId
     * @param {} successcb
     * @param {} errorcb
     * @return CallExpression
     */
    Reportdata.getTemplate = function (aysId, levelId, classId, successcb, errorcb) {
        var httpPromise = $http.get($interpolate('/rest/ays/{{aysId}}/level/{{levelId}}/class/{{classId}}/template/data')({aysId: aysId, levelId: levelId, classId: classId}));
        return Reportdata.httpPromise(httpPromise, successcb, errorcb);
    };


    /**
     * Description
     * @method getCoscholasticReport
     * @param {} reportModel
     * @param {} successcb
     * @param {} errorcb
     * @return CallExpression
     */
    Reportdata.getCoscholasticReport = function (reportModel, successcb, errorcb) {
        var httpPromise = $http.post('/rest/report/coscholastic/show', reportModel);
        return Reportdata.httpPromise(httpPromise, successcb, errorcb, false);
    };

    /**
     * Description
     * @method mailCoscholasticReport
     * @param {} reportModel
     * @param {} successcb
     * @param {} errorcb
     * @return CallExpression
     */
    Reportdata.mailCoscholasticReport = function (reportModel, successcb, errorcb) {
        var httpPromise = $http.post('/rest/report/coscholastic/mail', reportModel);
        return Reportdata.httpPromise(httpPromise, successcb, errorcb, false);
    };

    /**
     * Description
     * @method getSubjectList
     * @param {} aysId
     * @param {} levelId
     * @param {} classId
     * @param {} subjectType
     * @param {} successcb
     * @param {} errorcb
     * @return CallExpression
     */
    Reportdata.getSubjectList = function (aysId, levelId, classId, subjectType, successcb, errorcb) {
        var httpPromise = $http.get($interpolate('/rest/ays/{{aysId}}/level/{{levelId}}/class/{{classId}}/subjects/{{subjectType}}/data')({aysId: aysId, levelId: levelId, classId: classId, subjectType: subjectType}));
        return Reportdata.httpPromise(httpPromise, successcb, errorcb);
    };


    /**
     * Description
     * @method generateReportCard
     * @param {} reportCardModel
     * @param {} successcb
     * @param {} errorcb
     * @return CallExpression
     */
    Reportdata.generateReportCard = function (reportCardModel, successcb, errorcb) {
        var httpPromise = $http.post('/rest/report/report-data/generate', reportCardModel);
        return Reportdata.httpPromise(httpPromise, successcb, errorcb, false);
    };

    /**
     * Description
     * @method getStudentDataAccordingToMileStone
     * @param {} reportCardModel
     * @param {} successcb
     * @param {} errorcb
     * @return CallExpression
     */
    Reportdata.getStudentDataAccordingToMileStone = function (reportCardModel, successcb, errorcb) {
        var httpPromise = $http.post('/rest/report/report-data/getStudentData', reportCardModel);
        return Reportdata.httpPromise(httpPromise, successcb, errorcb);
    };

    /**
     * Description
     * @method downloadCoscholasticReport
     * @param {} reportModel
     * @param {} successcb
     * @param {} errorcb
     * @return CallExpression
     */
    Reportdata.downloadCoscholasticReport = function (reportModel, successcb, errorcb) {
        var httpPromise = $http.post('/rest/report/coscholastic/download', reportModel);
        return Reportdata.httpPromise(httpPromise, successcb, errorcb, false);
    };

    /**
     * Description
     * @method downloadScholasticReport
     * @param {} reportModel
     * @param {} successcb
     * @param {} errorcb
     * @return CallExpression
     */
    Reportdata.downloadScholasticReport = function (reportModel, successcb, errorcb) {
        var httpPromise = $http.post('/rest/report/scholastic/download', reportModel);
        return Reportdata.httpPromise(httpPromise, successcb, errorcb, false);
    };

    /**
     * Description
     * @method getFilteredMilestone
     * @param {} aysId
     * @param {} levelId
     * @param {} classId
     * @param {} successcb
     * @param {} errorcb
     * @return CallExpression
     */
    Reportdata.getFilteredMilestone = function (aysId, levelId, classId, successcb, errorcb) {
        var httpPromise = $http.get($interpolate('/rest/ays/{{aysId}}/level/{{levelId}}/class/{{classId}}/filteredMileStone/data')({aysId: aysId, levelId: levelId, classId: classId}));
        return Reportdata.httpPromise(httpPromise, successcb, errorcb);
    };

    /**
     * Description
     * @method generateClassPerformanceReport
     * @param {} classPerformanceModel
     * @param {} successcb
     * @param {} errorcb
     * @return CallExpression
     */
    Reportdata.generateClassPerformanceReport = function (classPerformanceModel, successcb, errorcb) {
        var httpPromise = $http.post('/rest/report/classPerformanceReport/generate', classPerformanceModel);
        return Reportdata.httpPromise(httpPromise, successcb, errorcb, false);
    };

    /**
     * Description
     * @method generateStudentPerformanceReport
     * @param {} studentPerformanceModel
     * @param {} successcb
     * @param {} errorcb
     * @return CallExpression
     */
    Reportdata.generateStudentPerformanceReport = function (studentPerformanceModel, successcb, errorcb) {
        var httpPromise = $http.post('/rest/report/studentPerformanceReport/generate', studentPerformanceModel);
        return Reportdata.httpPromise(httpPromise, successcb, errorcb);
    };

    /**
     * Description
     * @method generateSubjectPerformanceReport
     * @param {} subjectPerformanceModel
     * @param {} successcb
     * @param {} errorcb
     * @return CallExpression
     */
    Reportdata.generateSubjectPerformanceReport = function (subjectPerformanceModel, successcb, errorcb) {
        var httpPromise = $http.post('/rest/report/subjectPerformanceReport/generate', subjectPerformanceModel);
        return Reportdata.httpPromise(httpPromise, successcb, errorcb, false);
    };

    /**
     * Description
     * @method getGradingScaleSteps
     * @param {} modelToGetGradingScaleSteps
     * @param {} successcb
     * @param {} errorcb
     * @return CallExpression
     */
    Reportdata.getGradingScaleSteps = function (modelToGetGradingScaleSteps, successcb, errorcb) {
        var httpPromise = $http.post('/rest/report/getGradingScaleSteps/data', modelToGetGradingScaleSteps);
        return Reportdata.httpPromise(httpPromise, successcb, errorcb);
    };

    return Reportdata;

}]);
