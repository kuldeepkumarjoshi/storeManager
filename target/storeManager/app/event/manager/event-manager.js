(function(define) {
	"use strict";

	define([], function() {

		var EventManager = function($q,$interval,EventService,$http,i18nNotifications) {
			var deleteBtn='<a ng-click="grid.appScope.deleteConfirmation(row)" style="cursor:pointer;margin-left:2%" uib-tooltip-placement="auto" uib-tooltip="Delete" uib-tooltip-append-to-body="true"><i class="fa fa-trash-o fa-lg text-danger"></i></a>';
			var editBtn='<a ng-click="grid.appScope.editPage(row)" style="cursor:pointer;margin-left:2%" uib-tooltip-placement="auto" uib-tooltip="Edit" uib-tooltip-append-to-body="true"><i class="fa fa-pencil-square-o fa-lg text-info"></i></a>';
			var isAdmin=true;
			 var fakeI18n = function( title ){
				    var deferred = $q.defer();
				    $interval( function() {
				      deferred.resolve( 'col: ' + title );
				    }, 1000, 1);
				    return deferred.promise;
				  };
			var data={
					 isValidEvent:function(event,alert){
					
						if(!_.isEmpty(event)){
							if(_.isEmpty(event.title)){
								alert.type="danger";
								alert.msg="Please enter title.";
								return false;
							}else if(event.fromDate==null || event.fromDate==undefined){
								alert.type="danger";
								alert.msg="Please enter from date.";
								return false;
							}else if(event.toDate==null || event.toDate==undefined){
								alert.type="danger";
								alert.msg="Please enter to date.";
								return false;
							}else{
								return true;
							}
						}else{
							alert.type="danger";
							alert.msg="Please fill. Required field marked with *";
							return false;
						}
					 },
					 isAdmin:true,
					 saveEvent:function(path,eventVO,gridData){
								$http.post(path,eventVO)
								.success(function(res){
									if(eventVO.id==null || event.id== undefined){
										gridData.push(res.resultVO);
									}
									
									alert("success::"+res);
								})
								.error(function(res){
									alert("error::"+res);
								});
							},
					deleteEvent:function(eventGridData,obj,msg,deleteRow){
									EventService.deleteEvent(obj,function(response){
										var deleteIndex=eventGridData.indexOf(deleteRow);
										eventGridData.splice(deleteIndex, 1);
									},function(error){
										console.log(error);
									});
							},
					addToList:function(item,index,destList,sourceList){
								destList.unshift(item);
								sourceList.splice(index,1);
							},
					addAllToList:function (destination,source){
								$.each(source,function(){
									destination.push(this);
								});
							},
					transferAll:function(destination,source){
								var temp=angular.copy(source);
								this.addAllToList(destination,temp);
								destination=temp;
								source.splice(0,source.length);
							},
					setAddRemoveBtn	:function (source,dest,scope){
								if(!_.isEmpty(source)){
									scope.isForward=true;
								}else{
									scope.isForward=false;
								}
								if(!_.isEmpty(dest)){
									scope.isReverse=true;
								}else{
									scope.isReverse=false;
								}
							},
					getEventUserList:function(listData,uiList){
						var eventUsers=[];
									var filterData=_.filter(listData,function(item){
										var found=false;
										$.each(uiList,function(k,v){
											if(v.id==item.userId){
												found=true;
												return true;
											}
										});
										if(found){
											return true;
										}
									});
									eventUsers=filterData;
								return eventUsers;
							},
					loadList:function(ListData,destList){
								$.each(ListData,function(){
									destList.push({id:this.userId,primary:this.userName,secondry:this.role});
								});
							},
					merginList:function(list1,list2){
								$.each(list2,function(){
									list1.push(this);
								})
							},
					setTableHeight:function(gridData){
								 var rowHeight = 30; // your row height
							       var headerHeight = 50; // your header height
							       var dataLen=10;
							       if(gridData !=null){
							    	   dataLen= gridData.length;
							       }
							       return {
							          height: ( dataLen* rowHeight + headerHeight) + "px"
							       };
							},
					gridOptions : {
							multiSelect : false,
							enableCellEditOnFocus : false,
							 exporterMenuCsv: false,
							 enableGridMenu: true,
							 gridMenuTitleFilter: fakeI18n,
							data : 'eventGridData',
							
							columnDefs : [
									{
										name: 's.no',
										cellTemplate: '<div align="center" style="padding-top: 6%;" class="ngCellText">{{grid.renderContainers.body.visibleRowCache.indexOf(row) +1}}</div>',
										enableSorting : false,
										enableCellEdit: false,
										width:60
									},
									{
										name : 'title',
										enableCellEdit: false,
										width:300
									},
									{
										field : 'fromDate',
										type: 'date',
										enableCellEdit: false,
										cellFilter: 'date:"dd-MMM-yyyy"'
									},
									{
										field : 'toDate',
										type: 'date',
										enableCellEdit: false,
										cellFilter: 'date:"dd-MMM-yyyy"'
									},
									{
										field:'  ',
										displayName:'  ',
										name:' ',
										enableCellEdit: false,
										enableSorting : false,
										visible : isAdmin,
										cellTemplate:'<div class="" style="padding-top: 1%;">'+editBtn+deleteBtn+'</div>'
									}
									],

						}
				};
			return data;
			};

		return ['$q','$interval', 'EventService','$http','i18nNotifications',EventManager  ];
	});
}(define));