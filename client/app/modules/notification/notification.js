angular.module('cri.common')
.factory('Notification',['$window','$mdToast',function($window,$mdToast){
        var service = {
            authorize : function(){

            },
            display : function(message){
                $mdToast.show({
                    controller: ['$scope','$hideToast',function($scope, $hideToast) {
                        $scope.message = message;
                        $scope.closeToast = function() {
                            $hideToast();
                        };
                    }],
                    templateUrl: 'modules/notification/templates/toast.tpl.html',
                    duration: 5000,
                    position: 'top left'
                });
            },
            displaySocketNotif : function(notif){
                $mdToast.show({
                    controller: ['$scope','$hideToast','$q','NoteLab',function($scope, $hideToast,$q,NoteLab) {
                        $scope.notif = notif;

                        switch(notif.type){
                            case 'url':
                                q.all([
                                    NoteLab.fetchUrl({ _id : notif.entity }),
                                    NoteLab.fetchNote({ _id : notif.container })
                                ]).then(function(data){
                                    $scope.notif.entity = data[0][0];
                                    $scope.notif.container = data[1][0];
                                });
                                break;
                        }

                        $scope.closeToast = function() {
                            $hideToast();
                        };
                    }],
                    templateUrl: 'modules/notification/templates/socketToast.tpl.html',
                    duration: 50000,
                    position: 'top right'
                });
            }
        };
        return service;
    }]);