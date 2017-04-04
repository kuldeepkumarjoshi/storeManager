(function(define) {
	'use restrict';

	define([],function() {

				var PartyCreateEditCtrl = function($scope,$http,$upload,$party,partyCreateEditData,i18nNotifications, PartyService) {

					partyCreateEditData.valueList.sort(function (a, b) {
			        	   if (a.text > b.text) {
				        	     return 1;
				        	   }
				        	   if (a.text < b.text) {
				        	     return -1;
				        	   }
				        	   // a must be equal to b
				        	   return 0;
				        });
					$scope.extraData=partyCreateEditData;
					$scope.party={};

					if($scope.operation=='edit'){

						$scope.isEdit=true;

						$scope.party=	$scope.extraData.party;
						$scope.extraData.division={};
						if( $scope.party.partyType !=null){
							$.each($scope.extraData.partyTypes, function(){
								if($scope.party.partyType==this.value){
									$scope.party.partyType=this;
								}
							});
						}
						if($scope.party.divisionId!=null || $scope.party.divisionId!=undefined){
							$scope.extraData.division.id=$scope.party.divisionId;
							$scope.extraData.division.text=$scope.party.divisionName;
							$scope.getPartyGroup();
						}

						if($scope.extraData.syllabusId!=null && !_.isEmpty($scope.extraData.syllabusId)){
							$scope.extraData.blobFileName=$scope.extraData.syllabusName;
						}


					}
					else{
						$scope.isEdit=false;
						$scope.party.active=true;
					}

					$scope.cancel = function() {
						$party.path('/party');
					};


					function validation(party){
						if(party !== undefined){
							if(party.partyName == null || party.partyName.trim()=="" ){
								i18nNotifications.removeAll();
								i18nNotifications.pushForCurrentRoute('party.name.error', 'warning', {}, {});
								return false;
							}else if($scope.extraData.category==null && angular.isUndefined($scope.extraData.category)){
								i18nNotifications.removeAll();
								i18nNotifications.pushForCurrentRoute('party.category.error', 'warning', {}, {});
								return false;
							}else{
								return true;
							}
						}else{
							i18nNotifications.removeAll();
							i18nNotifications.pushForCurrentRoute('party.requiredField.error', 'warning', {}, {});
							return false
						}

					}

					$scope.saveParty = function() {

						if(!validation($scope.party)){
							return false;
						}
						var partyVO=createPartyVO();
						console.log(partyVO);
						PartyService.saveParty(partyVO,
						function(response){
							i18nNotifications.removeAll();
							i18nNotifications.pushForCurrentRoute('party.save.success', 'success', {}, {});
							$party.path('/party');
						},function(error){
							console.log(error);
						});

					};

					function createPartyVO(){
						var partyVO=angular.copy($scope.party);
						if($scope.extraData.category!=null && angular.isDefined($scope.extraData.category)){
							partyVO.categoryId=$scope.extraData.category.id;
							partyVO.categoryValue=$scope.extraData.category.text;
						}
						return partyVO;
					}
				};
				return [ '$scope','$http','$upload','$party', 'partyCreateEditData','i18nNotifications', 'PartyService', PartyCreateEditCtrl ];
		});

}(define));