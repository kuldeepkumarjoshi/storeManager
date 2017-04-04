(function(define){
	"use strict";
	
	define([], function() {
		
		var RestResource = function ($http, $q) {

			  /**
			   * Description
			   * @method MongolabResourceFactory
			   * @param {} restUrl
			   * @param {} restParams
			   * @return Resource
			   */
			  function MongolabResourceFactory(restUrl,restParams) {

			    var url = restUrl;
			    var defaultParams = restParams;

			    /**
			     * Description
			     * @method thenFactoryMethod
			     * @param {} httpPromise
			     * @param {} successcb
			     * @param {} errorcb
			     * @param {} isArray
			     * @return CallExpression
			     */
			    var thenFactoryMethod = function (httpPromise, successcb, errorcb, isArray) {
			      var scb = successcb || angular.noop;
			      var ecb = errorcb || angular.noop;

			      return httpPromise.then(function (response) {
			        var result;
			        if (isArray) {
			          result = [];
			          for (var i = 0; i < response.data.length; i++) {
			            result.push(new Resource(response.data[i]));
			          }
			        } else {
			          //MongoLab has rather peculiar way of reporting not-found items, I would expect 404 HTTP response status...
			          if (response.data === " null "){
			            return $q.reject({
			              code:'resource.notfound'
			              //collection:collectionName
			            });
			          } else {
			            result = new Resource(response.data);
			          }
			        }
			        scb(result, response.status, response.headers, response.config);
			        return result;
			      }, function (response) {
			        ecb(undefined, response.status, response.headers, response.config);
			        return undefined;
			      });
			    };

			    /**
			     * Description
			     * @method Resource
			     * @param {} data
			     * @return 
			     */
			    var Resource = function (data) {
			      angular.extend(this, data);
			    };

			    /**
			     * Description
			     * @method all
			     * @param {} cb
			     * @param {} errorcb
			     * @return CallExpression
			     */
			    Resource.all = function (cb, errorcb) {
			      return Resource.query({}, cb, errorcb);
			    };

			    /**
			     * Description
			     * @method httpPromise
			     * @param {} httpPromise
			     * @param {} successcb
			     * @param {} errorcb
			     * @param {} isArray
			     * @return CallExpression
			     */
			    Resource.httpPromise = function (httpPromise, successcb, errorcb, isArray) {
			        if(isArray === undefined || isArray == null) {
			            isArray = true;
			        }
			        return thenFactoryMethod(httpPromise, successcb, errorcb, isArray);
			    };

			    /**
			     * Description
			     * @method query
			     * @param {} queryJson
			     * @param {} successcb
			     * @param {} errorcb
			     * @return CallExpression
			     */
			    Resource.query = function (queryJson, successcb, errorcb) {
			      var params = angular.isObject(queryJson) ? {q:JSON.stringify(queryJson)} : {};
			      var httpPromise = $http.get(url, {params:angular.extend({}, defaultParams, params)});
			      return thenFactoryMethod(httpPromise, successcb, errorcb, true);
			    };

			    /**
			     * Description
			     * @method getById
			     * @param {} prependurl
			     * @param {} appendurl
			     * @param {} id
			     * @param {} successcb
			     * @param {} errorcb
                 * @param {} isArray  : to convert object into array.
			     * @return CallExpression
			     */
			    Resource.getById = function (prependurl,appendurl,id, successcb, errorcb, isArray) {
			        var rest_url = '';
			        if(prependurl !== '') {
			            rest_url = url + prependurl + '/' + id + appendurl;
			        } else {
			            rest_url = url + id + appendurl;
			        }
			        var httpPromise = $http.get(rest_url, {params:defaultParams});
			        return thenFactoryMethod(httpPromise, successcb, errorcb, isArray);
			    };   

			    /**
			     * Description
			     * @method getByIds
			     * @param {} ids
			     * @param {} successcb
			     * @param {} errorcb
			     * @return CallExpression
			     */
			    Resource.getByIds = function (ids, successcb, errorcb) {
			      var qin = [];
			      angular.forEach(ids, function (id) {
			         qin.push({$oid: id});
			      });
			      return Resource.query({_id:{$in:qin}}, successcb, errorcb);
			    };

			    //instance methods
			    
			    /**
			     * Description
			     * @method $id
			     * @return 
			     */
			    Resource.prototype.$id = function () {
			      if (this._id && this._id.$oid) {
			        return this._id.$oid;
			      }
			    };

			      /**
			       * Description
			       * @method $save
			       * @param {} prependurl
			       * @param {} appendurl
			       * @param {} data
			       * @param {} successcb
			       * @param {} errorcb
			       * @return CallExpression
			       */
			      Resource.prototype.$save = function (prependurl, appendurl, data, successcb, errorcb) {
			      var httpPromise = $http.post(url + prependurl + appendurl, data, {params:defaultParams});
			      return thenFactoryMethod(httpPromise, successcb, errorcb);
			    };

			    /**
			     * Description
			     * @method $update
			     * @param {} prependurl
			     * @param {} appendurl
			     * @param {} id
			     * @param {} data
			     * @param {} successcb
			     * @param {} errorcb
			     * @return CallExpression
			     */
			    Resource.prototype.$update = function (prependurl, appendurl, id, data, successcb, errorcb) {
			      var httpPromise = $http.put(url + prependurl + "/" + id + appendurl, data, {params:defaultParams});
			      return thenFactoryMethod(httpPromise, successcb, errorcb);
			    };

			    /**
			     * Description
			     * @method $remove
			     * @param {} prependurl
			     * @param {} appendurl
			     * @param {} id
			     * @param {} successcb
			     * @param {} errorcb
			     * @return CallExpression
			     */
			    Resource.prototype.$remove = function (prependurl, appendurl, id, successcb, errorcb) {
			      var httpPromise = $http['delete'](url + prependurl + "/" + id + appendurl, {params:defaultParams});
			      return thenFactoryMethod(httpPromise, successcb, errorcb);
			    };

			    /**
			     * Description
			     * @method $saveOrUpdate
			     * @param {} savecb
			     * @param {} updatecb
			     * @param {} errorSavecb
			     * @param {} errorUpdatecb
			     * @return 
			     */
			    Resource.prototype.$saveOrUpdate = function (savecb, updatecb, errorSavecb, errorUpdatecb) {
			      if (this.$id()) {
			        return this.$update(updatecb, errorUpdatecb);
			      } else {
			        return this.$save(savecb, errorSavecb);
			      }
			    };

			    return Resource;
			  }
			  return MongolabResourceFactory;
			};
			
		return ['$http', '$q', RestResource ];
	});
	
}(define));