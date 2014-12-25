'use strict';

angular.module('tabApp.controllers', ['tabApp.services']).controller("TableauController", ['$scope', 'TableauService', function ($scope, TableauService) {
        $scope.appName = "Tableau Integration";

        $scope.init = function () {
            console.info("In init");
            var conf = {
                tsRequest: {
                    credentials: {
                        name: "ashwin.mridul",
                        password: "ashwin13#",
                        site: {
                            contentUrl: ""
                        }
                    }
                }
            };
            TableauService.doLogin(conf).then(function (response) {
                console.info(response.data);
            }, function (response) {
                console.info(response);
            });
        };
        $scope.init();
    }]);