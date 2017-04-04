(function(define) {
	"use strict";

	define([], function() {

		var RequesterManager = function(RequesterService,$http,i18nNotifications) {
			var deleteBtn='<a ng-click="grid.appScope.deleteConfirmation(row)" style="cursor:pointer;margin-left:2%" tooltip-placement="auto" tooltip="Delete" tooltip-append-to-body="true" data-toggle="modal" data-target="#deleteRequesterModel" ><i class="fa fa-trash-o fa-lg text-danger"></i></a>';
			var editBtn='<a ng-click="grid.appScope.editPage(row)" style="cursor:pointer;margin-left:2%" tooltip-placement="auto" tooltip="Edit" tooltip-append-to-body="true"><i class="fa fa-pencil-square-o fa-lg text-info"></i></a>';
			var isAdmin=true;
			var data={
					 isAdmin:true,
					 saveRequester:function(userVO){
								$http.post('/rest/user/insert',userVO)
								.success(function(res){
									alert("success::"+res);
								})
								.error(function(){
									alert("error::"+res);
								});
							},
					deleteRequester:function(userGridData,obj){
									RequesterService.deleteRequester(obj,function(response){
										i18nNotifications.removeAll();
										i18nNotifications.pushForCurrentRoute('user.delete.success', 'success', {}, {});
										var deleteIndex=userGridData.indexOf(deleteRow);
										userGridData.splice(deleteIndex, 1);
									},function(error){
										console.log(error);
									});
							},
					gridOptions : {
							multiSelect : false,
							enableCellEditOnFocus : true,
							data : 'userGridData',
							columnDefs : [
									{
										name: 's.no',
										cellTemplate: '<div align="center" style="padding-top: 6%;" class="ngCellText">{{grid.renderContainers.body.visibleRowCache.indexOf(row) +1}}</div>',
										enableSorting : false,
										width:60
									},
									{
										field : 'firstName',
										enableCellEdit: true,
										width:300,
										cellTemplate:'<div class="" style="padding-left: 2%;">'+" {{row.entity.firstName}} "+'</div>'
									},
									{
										field : 'email',
										enableCellEdit: true,
									},
									{
										field : 'role',
										enableCellEdit: true, 
									},
									{
										field : 'dob',
										type: 'date',
										enableCellEdit: true, 
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
		
		

		return [ 'RequesterService','$http','i18nNotifications',RequesterManager  ];
	});
}(define));