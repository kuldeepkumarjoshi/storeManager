(function(define){
	"use strict";
	
	define([], function() {
		var EvaluationSchemeResource = function (restResource, $http, $interpolate) {
			var EvaluationScheme = restResource('/rest/evaluationScheme/');

			EvaluationScheme.getTreeStructure = function (successcb, errorcb) {
		        var httpPromise = $http.get('/rest/evaluationScheme/component/sub-component/data');
		        return EvaluationScheme.httpPromise(httpPromise, successcb, errorcb);
		    };
		    EvaluationScheme.getAppliedToClassSubjects = function(schemeId, successcb, errorcb) {
		        var httpPromise = $http.get("/rest/evaluationScheme/" + schemeId + "/class/subjects/data");
		        return EvaluationScheme.httpPromise(httpPromise, successcb, errorcb);
		    };
		    EvaluationScheme.getGradingScales = function (successcb, errorcb) {
		        var httpPromise = $http.get('/rest/evaluationScheme/grading-scale/listValues');
		        return EvaluationScheme.httpPromise(httpPromise, successcb, errorcb, false);
		    };
		    EvaluationScheme.saveResult = function (resultObj, successcb, errorcb) {
		        var httpPromise = $http.post('/rest/evaluationScheme/result', resultObj);
		        return EvaluationScheme.httpPromise(httpPromise, successcb, errorcb, false);
		    };
		    EvaluationScheme.updateResult = function (resultId, resultObj, successcb, errorcb) {
		        var httpPromise = $http.post('/rest/evaluationScheme/result/'+resultId+'/update', resultObj);
		        return EvaluationScheme.httpPromise(httpPromise, successcb, errorcb, false);
		    };
		    EvaluationScheme.getClassesAndSubjects = function (successcb, errorcb) {
		        var httpPromise = $http.get('/rest/evaluationScheme/level/class-subjects/data');
		        return EvaluationScheme.httpPromise(httpPromise, successcb, errorcb, false);
		    };
		    EvaluationScheme.exportScheme = function (schemeIdList, successcb, errorcb) {
		        var httpPromise = $http.post('/rest/evaluationScheme/getschemexml',schemeIdList);
		        return EvaluationScheme.httpPromise(httpPromise, successcb, errorcb, false);
		    };
		    EvaluationScheme.importScheme = function (file, successcb, errorcb) {
		        var httpPromise = $http.post('/rest/evaluationScheme/import', file);
		        return EvaluationScheme.httpPromise(httpPromise, successcb, errorcb, false);
		    };
		    EvaluationScheme.getDecimalPlaceListValues = function (successcb, errorcb) {
		        var httpPromise = $http.get('/rest/value/DecimalPlaces/valueList');
		        return EvaluationScheme.httpPromise(httpPromise, successcb, errorcb, false);
		    };
		    EvaluationScheme.generateESReport = function(schemeId,successcb,errorcb){
		        var httpPromise = $http.get("/rest/evaluationScheme/"+schemeId+"/download");
		        return EvaluationScheme.httpPromise(httpPromise,successcb,errorcb,false);
		    };
		    return EvaluationScheme;
		};
    	return ['restResource', '$http', '$interpolate', EvaluationSchemeResource ];
	});
}(define));
