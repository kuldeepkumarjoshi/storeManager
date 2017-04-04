(function(define) {
	"use strict";
	define(	[],	function() {
		var moduleName = 'directives.slider';
		angular.module(moduleName, [])
		.directive('slider', function() {
					return {
						   restrict:'AE',
						   replace: true,
						   scope : {    images: '='    },
						   link: function(scope, elem, attrs) {
							   var max=5;
							   var min=0;
							   scope.selectedIndex=2;
							   scope.setIndex=function(index){
								   scope.selectedIndex=index;
								   scope.selectedImage= scope.rail[scope.selectedIndex];
							   }
							   scope.selectedImage= scope.images[min+2];
								  scope.currentIndex = 0;
								  scope.rail=[];
								  scope.$watch('images', function() {
									
									  for(var i=0;i<6;i++){
										  if(scope.images[i] !=null){
											  scope.rail.push(scope.images[i]);
										  }
									  }
									  scope.selectedImage= scope.images[scope.selectedIndex];
								  });
								 
								  scope.next = function() {
									  if(min==scope.images.length - 1){
										  min=0;
									  }else{
										  min++;
									  }
									 
									  if(max<scope.images.length - 1 ){
										  max++; 
										 
									  }else if(max==scope.images.length - 1){
										  max=0;
									  }
								    scope.rail.splice(0,1);
								    scope.rail.push(scope.images[max]);
									scope.selectedImage= scope.rail[scope.selectedIndex];
								  };
								  scope.prev = function() {
									
									  if(max==0){
										  max=scope.images.length - 1;
									  }else{
										  max--;
									  }
									  if(min>0){
										  min--; 
										 
									  }else if(min==0){
										  min=scope.images.length - 1;
										  max=min-6;
									  }
								    scope.rail.splice(5,1);
								    scope.rail.unshift(scope.images[min]);
									scope.selectedImage= scope.rail[scope.selectedIndex];
								  };
								  
							  },
						templateUrl: 'app/common/templates/slider.html'
					}
				});
				return moduleName;
			});

}(define));
