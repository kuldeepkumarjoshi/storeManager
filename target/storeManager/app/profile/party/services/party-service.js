(function(define) {
	"use strict";

	define([], function() {

		var PartyService = function($resource, $interpolate) {
			var data = $resource('/rest/Party/:operation',{
				operation:"@operation"
			}, 
			{
				getPartyForGrid:{
					method : 'GET',
					params : {
						operation : 'data.do'
					}
				},
				getPartyForEdit:{
					method : 'GET',
					params : {
						operation : 'beforeEdit'
					}
				},
				getPartyForProfile:{
					method : 'GET',
					params : {
						operation : 'showDetail.do'
					}
				},
				deleteParty:{
					method:'DELETE',
					params:{
						operation:'delete'
					}
				},
				saveParty:{
					method:'POST',
					params:{
						operation:'save'
					}
				}
			});

			return data;
		};

		return [ '$resource', '$interpolate', PartyService ];
	});
}(define));