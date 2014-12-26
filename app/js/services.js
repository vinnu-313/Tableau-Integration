'use strict';

angular.module('tabApp.services', ['xml']).factory('TableauService', ['$http', function($http){
       return {
         doLogin : function(param){
//             console.info(x2js.xml_str2json('<tsRequest><credentials name="admin-username" password="admin-password" ><site contentUrl="target-site-content-URL" /></credentials></tsRequest>'));
//             console.info(x2js.json2xml_str(param));
             return $http({
                 url : 'http://uiatab.glassbeam.com:8000/api/2.0/auth/signin',
                 method : 'POST',
                 data : param
             });
         }, 
         addSite : function(param, token){
             return $http({
                url : 'http://uiatab.glassbeam.com:8000/api/2.0/sites',
                method : 'POST',
                headers : {
                    "X-Tableau-Auth" : token
                },
                data : param
             });
         }, 
         addUser : function(param, token, site_id){
             return $http({
                url : 'http://uiatab.glassbeam.com:8000/api/2.0/sites/'+site_id+'/users/',
                method : 'POST',
                headers : {
                    "X-Tableau-Auth" : token
                },
                data : param
             });
         }
       };
}]);