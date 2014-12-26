'use strict';

angular.module('tabApp.controllers', ['tabApp.services']).controller("TableauController", ['x2js', '$scope', 'TableauService', function (x2js, $scope, TableauService) {
        $scope.appName = "Tableau Integration";

        $scope.init = function () {
            var conf = {
                tsRequest: {
                    credentials: {
                        _name: "ashwin.mridul",
                        _password: "ashwin13#",
                        site: {
                            _contentUrl: ""
                        }
                    }
                }
            };
            TableauService.doLogin(x2js.json2xml_str(conf)).then(function (response) {
                var res = x2js.xml_str2json(response.data);
                var token = res['tsResponse']['credentials']['_token'];
                var placeholderDiv = document.getElementById('placeHolder');
                var url = 'http://uiatab.glassbeam.com:8000/datasources';
                var options = {
                    hideHeaders: true,
                    hideTabs: true,
                    width: "800px",
                    height: "700px"
                };
                var viz = new tableauSoftware.Viz(placeholderDiv, url, options);
            }, function (response) {
                console.error(response);
            });
        };
        $scope.init();
    }]).controller('NewUserController', ['x2js', '$scope', 'TableauService', function (x2js, $scope, TableauService) {
        $scope.loadPage = function () {
            var conf = {
                tsRequest: {
                    credentials: {
                        _name: "ashwin.mridul",
                        _password: "ashwin13#",
                        site: {
                            _contentUrl: ""
                        }
                    }
                }
            };
            TableauService.doLogin(x2js.json2xml_str(conf)).then(function (response) {
                var token = x2js.xml_str2json(response.data)['tsResponse']['credentials']['_token'];
//                conf = {
//                    tsRequest: {
//                        user:{
//                            _name:$scope.username,
//                            _role:"Viewer",
//                            _publish:"true",
//                            _contentAdmin:"false",
//                            _suppressGettingStarted:"false"
//                        }
//                    }
//                };
                conf = {
                    tsRequest: {
                        site: {
                            _name: $scope.username,
                            _contentUrl: $scope.username,
                            _disableSubscriptions: "false"
                        }
                    }
                };
//                TableauService.addUser(x2js.json2xml_str(conf), token).then(function (response) {
                TableauService.addSite(x2js.json2xml_str(conf), token).then(function (response) {
                    conf = {
                        tsRequest: {
                            user: {
                                _name: $scope.username,
                                _role: "Viewer",
                                _publish: "true",
                                _contentAdmin: "false",
                                _suppressGettingStarted: "false"
                            }
                        }
                    };
                    var site_id  =x2js.xml_str2json(response.data)['tsResponse']['site']['_id'];
                    TableauService.addUser(x2js.json2xml_str(conf), token, site_id).then(function (response) {
                        console.log(x2js.xml_str2json(response.data));
                    }, function(response){
                        console.error(response)
                    });
                }, function (response) {
                    console.error(response);
                });
            }, function (response) {
                console.error(response);
            });

        };
    }]);