(function(define) {
	"use strict";

	define(	[],	function() {

				var ContactUsCtrl = function($scope,$http, $location,ContactUsService,i18nNotifications) {

					$http({method:'GET',url:'./dataFile/contacts.json'})
					.success(function(response){
						$scope.contacts=response.contacts;
					})
					.error(function(response){
						i18nNotifications.removeAll();

					});

					function createMailVO(){
						var mail={};
						/*mail.name=$scope.customer.name;
						mail.phone=$scope.customer.phone;
						mail.email=$scope.customer.email;
						mail.subject=$scope.customer.subject;
						mail.message=$scope.customer.message;*/
						mail.name="kuldepp";
					
						mail.email='kuldeep.joshi@metacube.com';
						mail.subject="hi";
						mail.message="hi";
						mail.receiverMails="kkuldeepjoshi5@gmail.com";
						mail.to="kkuldeepjoshi5@gmail.com";
						return mail;
					}
					$scope.test=function(){

						$http.get('/rest/event/getAll')
						.success(function(res){
							alert(res);
						})
						.error(function(res){
							alert(res);
						});
					}
					$scope.sendMail=function(){
						var mailVO=createMailVO();
						$http.post('/rest/contactUs/sendMail')
						.success(function(res){
							alert(res);
						})
						.error(function(res){
							alert(res);
						});
			/*			ContactUsService.sendMail(mailVO,
						function(response){
								i18nNotifications.removeAll();
								i18nNotifications.pushForCurrentRoute('mail.send.success', 'success', {}, {});
						},
						function(){
							i18nNotifications.removeAll();
							i18nNotifications.pushForCurrentRoute('mail.send.error', 'error', {}, {});
						});*/
					}
				};
				return [ '$scope','$http', '$location', 'ContactUsService','i18nNotifications', ContactUsCtrl ];
			});

}(define));