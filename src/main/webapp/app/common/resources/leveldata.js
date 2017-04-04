(function(define){
	"use strict";
	
	define([], function() {
    	var LevelDataResource = function (restResource, $http, $interpolate) {
    		var LevelData = restResource('/rest/cstRelation/');
    	    
    		   /* LevelData.getLevelByLevelId = function (levelId,successcb, errorcb) {
    		        var httpPromise = $http.get($interpolate('/rest/cstRelation/ays/{{levelId}}/level')({levelId: levelId}));
    		        return  CSTdata.httpPromise(httpPromise, successcb, errorcb,false);
    		   };*/
    		   
    		    LevelData.getClassesByLevelId = function (levelId,successcb, errorcb) {
    		        var httpPromise = $http.get($interpolate('/rest/cstRelation/ays/{{levelId}}/classes')({levelId: levelId}));
    		        return  LevelData.httpPromise(httpPromise, successcb, errorcb,false);
    		    };
    		    LevelData.getAssociatedSubjectsByClassId = function(classId, schemeId, successcb, errorcb) {
    		         var httpPromise = $http.get('/rest/cstRelation/scheme/'+schemeId+'/class/'+classId+'/subjects');
    		         return  LevelData.httpPromise(httpPromise, successcb, errorcb, false);
    		    };
    		    LevelData.getRemainingLevelInAYS = function (aysId,successcb, errorcb) {
    		        var httpPromise = $http.get($interpolate('/rest/cstRelation/ays/{{aysId}}/remaininglevel')({aysId: aysId}));
    		        return  LevelData.httpPromise(httpPromise, successcb, errorcb,false);
    		    };
    		    
    		    LevelData.createLevel = function (levelRow,successcb, errorcb) {
    		        var httpPromise = $http.post('/rest/cstRelation/ays/level/create', levelRow);
    		        return LevelData.httpPromise(httpPromise, successcb, errorcb, false);
    		    };
    		    
    		    LevelData.getCstDataByLevelId = function (levelId,successcb, errorcb) {
    		        var httpPromise = $http.get($interpolate('/rest/cstRelation/ays/level/{{levelId}}/cstListGrid')({levelId: levelId}));
    		        return  LevelData.httpPromise(httpPromise, successcb, errorcb,false);
    		    };
    		    LevelData.getLevelNameByLevelId = function(levelId,successcb, errorcb) {
    		        var httpPromise = $http.get($interpolate('/rest/cstRelation/level/{{levelId}}/get-name')({levelId: levelId}));
    		        return  LevelData.httpPromise(httpPromise, successcb, errorcb,false);
    		    };
    		    LevelData.getAysNameByAysId = function (aysId, successcb, errorcb) {
    		        var httpPromise = $http.get($interpolate('/rest/cstRelation/ays/{{aysId}}/get-name')({aysId: aysId}));
    		        return  LevelData.httpPromise(httpPromise, successcb, errorcb,false);
    		   };
    		   return LevelData;
    	};
	return ['restResource', '$http', '$interpolate', LevelDataResource ];
	});
}(define));
