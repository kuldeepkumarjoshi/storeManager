(function(define){
	"use strict";
	
	define([], function() {
		var EvaluationStageDataResource = function (restResource, $http, $interpolate) {
			var EvaluationStageData = restResource('/rest/academicYear/');

		    /*AcademicYearStructureData.getTreeStructure = function(successcb,errorcb){
		     var httpPromise = $http.get('/rest/academicyear/term/stage/data');
		     return Academicyeardata.httpPromise(httpPromise, successcb, errorcb);
		     }
		     */
		    
		    /**
		     * Description
		     * @method getLevelData
		     * @param {} aysId
		     * @param {} successcb
		     * @param {} errorcb
		     * @return CallExpression
		     */
		    EvaluationStageData.getLevelData = function (ayId,aysId,termId,stageId,successcb, errorcb) {
		        var httpPromise = $http.get($interpolate('/rest/ay/{{ayId}}/ays/{{aysId}}/term/{{termId}}/stage/{{stageId}}/levelData')({ayId: ayId,aysId: aysId,termId:termId,stageId: stageId}));
		        return EvaluationStageData.httpPromise(httpPromise, successcb, errorcb,false);
		    };
		    
		    EvaluationStageData.getByTermAndStageId = function (ayId,aysId,termId,stageId,successcb, errorcb){
		         var httpPromise = $http.get($interpolate('/rest/ay/{{ayId}}/ays/{{aysId}}/term/{{termId}}/stage/{{stageId}}/levelTermStageInfo')({ayId: ayId,aysId: aysId,termId:termId,stageId: stageId}));
		         return EvaluationStageData.httpPromise(httpPromise, successcb, errorcb,false);
		    };
		    
		    EvaluationStageData.createLevelTermStageInfo = function (levelTermStageInfoObj,successcb, errorcb) {
		        var httpPromise = $http.post('/rest/ays/term/stage/createLevelTermStageInfo', levelTermStageInfoObj);
		        return EvaluationStageData.httpPromise(httpPromise, successcb, errorcb, false);
		    };
		    
		    EvaluationStageData.deleteLevelTermStageInfo = function(levelTermStageInfoId,successcb, errorcb){
		        var httpPromise = $http.get($interpolate('/rest/ays/term/stage/levelTermStageInfo/{{levelTermStageInfoId}}/delete')({levelTermStageInfoId: levelTermStageInfoId}));
		        return EvaluationStageData.httpPromise(httpPromise, successcb, errorcb, false);
		    };
		    
		    EvaluationStageData.updateLevelTermStageInfo = function (levelTermStageInfoObj,successcb, errorcb) {
		        var httpPromise = $http.post('/rest/ays/term/stage/updateLevelTermStageInfo', levelTermStageInfoObj);
		        return EvaluationStageData.httpPromise(httpPromise, successcb, errorcb, false);
		    };
		    
		    EvaluationStageData.turnOnPublishFlag = function(aysId,termId,stageId,levelId,successcb, errorcb){
		       var httpPromise = $http.get($interpolate('/rest/ays/{{aysId}}/term/{{termId}}/stage/{{stageId}}/level/{{levelId}}/setPublishResultFlag')({aysId: aysId,termId:termId,stageId: stageId,levelId: levelId}));
		       return EvaluationStageData.httpPromise(httpPromise, successcb, errorcb, false);
		    };
		    
		    
		    EvaluationStageData.turnOffPublishFlag = function(aysId,termId,stageId,levelId,successcb, errorcb){
		        var httpPromise = $http.get($interpolate('/rest/ays/{{aysId}}/term/{{termId}}/stage/{{stageId}}/level/{{levelId}}/setPublishResultFlagOff')({aysId: aysId,termId:termId,stageId: stageId,levelId: levelId}));
		        return EvaluationStageData.httpPromise(httpPromise, successcb, errorcb, false);
		     };
		    
		     EvaluationStageData.turnOffPublishFlagLevelTermStageInfo = function(levelTermStageInfoId,successcb, errorcb){
		         var httpPromise = $http.get($interpolate('/rest/ays/term/stage/levelTermStageInfo/{{levelTermStageInfoId}}/setPublishResultFlagOff')({levelTermStageInfoId: levelTermStageInfoId}));
		         return EvaluationStageData.httpPromise(httpPromise, successcb, errorcb, false);
		      };
		    return EvaluationStageData;
		};
    	return ['restResource', '$http', '$interpolate', EvaluationStageDataResource ];
	});
}(define));
