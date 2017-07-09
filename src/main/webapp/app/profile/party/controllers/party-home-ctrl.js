(function(define) {
	"use strict";

	define(
			[],
			function() {

				var PartyHomeCtrl = function($scope,$http, $location, $state, $rootScope, i18nNotifications) {

					$scope.postData=function(){
						$http.post('/eventManagement/dataFile/contacts.json',{
							params:{
								name:"kuldeep"
							}
						})
						.success(function(response){
							console.log(response);
						})
						.error(function(response){
							console.log(response);
						});

						$scope.createPage=function(){

							$location.path('/party/create');

						};
						$scope.pagingOptions = {
						        pageSizes: [40,50,70],
						        pageSize: 50,
						        currentPage: 1
					    };
						$scope.setPagingData = function(data, pageSize, page){
					        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
					        $scope.pagingData = pagedData;
					        $scope.pageGap= pageSize*(page-1)+1;
					        if (!$scope.$$phase) {
					            $scope.$apply();
					        }
					    };
					    $scope.setPagingData(masterData, $scope.pagingOptions.pageSize,$scope.pagingOptions.currentPage);
					    $scope.$watch('pagingOptions', function (newVal, oldVal) {
					    	if(newVal.pageSize !== oldVal.pageSize){
					    		$scope.pagingOptions.currentPage=1;
					    	}
					        if (newVal !== oldVal || newVal.currentPage !== oldVal.currentPage) {
					          $scope.setPagingData(masterData,$scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
					        }
					    }, true);

					    $scope.$watch('filterOptions', function (newVal, oldVal) {
					        if (newVal !== oldVal) {
					            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
					        }
					    }, true);



					    var editBtn='<a  ng-click="editPage(row)" tooltip-placement="auto" tooltip="Edit" tooltip-append-to-body="true" style="margin-left:4px;"><i class="fa fa-pencil-square-o fa-lg text-info" style="margin-top:3px;"></i></a>';
						var deleteBtn='<a ng-click="setDeleteRow(row)"  tooltip-placement="auto" tooltip="Delete" tooltip-append-to-body="true" data-toggle="modal" data-target="#deleteModel" style="margin-left:8px;"><i class="fa fa-trash-o fa-lg text-danger"></i></a>';
						$scope.locationGridOptions = {
								multiSelect : false,
								data : 'pagingData',
								enableColumnResize:true,
								enablePaging: true,
								showFooter: true,
						        totalServerItems: 'totalServerItems',
						        pagingOptions: $scope.pagingOptions,
								sortInfo:{fields:['locationName'],directions:['asc']},
								columnDefs : [
										{
											field : 'id',
											visible : false
										},
										{
											field: '',
											displayName: 'S. No.',
											cellTemplate: '<div align="center" class="ngCellText">{{row.rowIndex + pageGap}}</div>',
											sortable : false,
											width : '6%'
										},
										{
											field : 'locationName',
											displayName : 'Name',
										},
										{
											field : 'categoryValue',
											displayName : 'Category'

										},
										{
											field : 'locationDescription',
											displayName : 'Description'

										},
										{
											field : 'active',
											displayName : 'Active',
											cellTemplate:'<div class="ngCellText"><div ng-show="row.entity.active">Y</div><div ng-hide="row.entity.active">N</div></div>'
										},
										{
											field:'',
											cellTemplate:'<div><div  style="margin:1.5% 0 0 1%;"> ' + editBtn + deleteBtn +  '</div></div>'
										}
										],

							};

						function checkEmptyGrid(){
							if(_.isEmpty($scope.locationData) || $scope.locationData==null){
								$scope.isGridDataEmpty=true;
								$scope.isNotFound=true;
							}else{
								$scope.isGridDataEmpty=false;
								$scope.isNotFound=false;
							}
						}
						$scope.setDeleteRow=function(row){
							$scope.deleteRow=row.entity;
						}
						$scope.editPage = function(row){
							var locationId =row.entity.id;
							$location.path('/location/edit').search({id:locationId});
						}
						$scope.deleteLocation=function(){
							var	obj={
									id:$scope.deleteRow.id,
								};
							LocationService.deleteLocation(obj, function(data){
									i18nNotifications.removeAll();
									i18nNotifications.pushForCurrentRoute('location.delete.success', 'success', {}, {});
									var deleteIndex=$scope.locationData.indexOf($scope.deleteRow);
									$scope.locationData.splice(deleteIndex, 1);
									 $scope.totalServerItems= $scope.totalServerItems-1;
									 $scope.setPagingData($scope.locationData,$scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
							});
						};
						$scope.changeChoice=function(choice){
							if(choice=='active'){

								$scope.onlyActive=true;
								   angular.forEach($scope.locationData, function(item){
										   if(item.active){
											   $scope.onlyActiveData.push(item);
										   }
							          })
								$scope.totalServerItems= $scope.onlyActiveData.length;
								$scope.pagingOptions.currentPage=1;
								masterData=$scope.onlyActiveData;
								 $scope.setPagingData($scope.onlyActiveData,$scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
							}else{
								$scope.onlyActiveData=[];
								$scope.onlyActive=false;
								$scope.totalServerItems= $scope.locationData.length;
								$scope.pagingOptions.currentPage=1;
								masterData=$scope.locationData;
								 $scope.setPagingData($scope.locationData,$scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
							}
						};


					}
				};
				return [ '$scope','$http', '$location', '$state', '$rootScope', 'i18nNotifications', PartyHomeCtrl ];
			});

}(define));