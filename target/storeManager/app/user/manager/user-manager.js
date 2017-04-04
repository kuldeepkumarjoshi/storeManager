(function(define) {
	"use strict";

	define([], function() {

		var UserManager = function($q,$interval,UserService,$http,i18nNotifications) {
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
					 isValidUser:function(user,alert){
					
						if(!_.isEmpty(user)){
							if(_.isEmpty(user.title)){
								alert.type="danger";
								alert.msg="Please enter title.";
								return false;
							}else if(_.isEmpty(user.fromDate)){
								alert.type="danger";
								alert.msg="Please enter from date.";
								return false;
							}else if(_.isEmpty(user.toDate)){
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
					 saveUser:function(path,userVO,gridData){
								$http.post(path,userVO)
								.success(function(res){
									if(userVO.id==null || user.id== undefined){
										gridData.push(res.resultVO);
									}
									
									alert("success::"+res);
								})
								.error(function(){
									alert("error::"+res);
								});
							},
					deleteUser:function(userGridData,obj,msg,deleteRow){
									UserService.deleteUser(obj,function(response){
										var deleteIndex=userGridData.indexOf(deleteRow);
										userGridData.splice(deleteIndex, 1);
									},function(error){
										console.log(error);
									});
							},
					setTableHeight:function(gridData){
								 var rowHeight = 30; // your row height
							       var headerHeight = 50; // your header height
							       var dataLen=10;
							       if(gridData!=null){
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
											displayName: 'Name',
											enableCellEdit: true,
											width:300,
											cellTemplate:'<div class="" style="padding-left: 2%;">'+" {{row.entity.firstName }}  {{ row.entity.lastName }} "+'</div>'
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

		return ['$q','$interval', 'UserService','$http','i18nNotifications',UserManager  ];
	});
}(define));