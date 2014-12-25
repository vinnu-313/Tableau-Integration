'use strict';

angular.module('tabApp.services', ['xml']).factory('TableauService', ['x2js', '$http', function(x2js, $http){
       return {
         doLogin : function(param){
             console.info(x2js.json2xml(param));
             return $http({
                 url : 'http://uiatab.glassbeam.com:8000/api/2.0/auth/signin',
                 method : 'POST',
                 data : x2js.json2xml(param)
             });
         }
       };
}]);