(function(define){
	"use strict";
	
	define(['common/header/header-ctrl'], function(HeaderCtrl) {
		
		var moduleName = "header";
        
        angular.module( moduleName, [ 'chieffancypants.loadingBar', 'ngAnimate' ] )
            .controller( "HeaderCtrl", HeaderCtrl );
        
        return moduleName;
		
	});
	
}(define));