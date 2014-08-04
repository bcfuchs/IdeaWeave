angular.module('cri.header',[])

    .controller('HeaderCtrl',['$scope','loggedUser', 'users','$state','Notification','SearchBar', '$materialSidenav','$timeout','$window',function($scope,loggedUser, users,$state,Notification,SearchBar,$materialSidenav,$timeout,$window){
        $scope.user = users;
        $scope.me = loggedUser.profile;

        $timeout(function(){
            var rightNav;
            $scope.toggleRight = function(template) {
                if(template){
                    switch(template){
                        case 'login':
                            $scope.sideNavTemplateUrl = 'modules/account/templates/signin.tpl.html';
                            break;
                        case 'menu':
                            $scope.sideNavTemplateUrl = 'modules/header/templates/menu.tpl.html';
                            $scope.me = loggedUser.profile;
                            break;
                        case 'notif':
                            $scope.sideNavTemplateUrl = 'modules/header/templates/notifications.tpl.html';
                            if($scope.me.profile){
                                users.getActivity($scope.me.profile.id,5).then(function(data){
                                    $scope.activities = data;
                                }).catch(function(err){
                                    console.log(err);
                                })
                            }
                            break;
                    }
                }

                rightNav.toggle();
            };
            rightNav = $materialSidenav('right');

            $scope.$on('side:close-right',function(){
                rightNav.toggle();
            });
            $scope.signout =function(){
                users.logout().then(function(){
                    rightNav.toggle();
                    $state.go('home');
                })
            };

        },500);
        $scope.goTo = function(result){
            console.log('ffffffffff',result)
            if(result.username){
                console.log(result)
                $state.go('profile',{ uid : result.id })
            }else if(result.container){
                $state.go('project',{ pid : result.accessUrl })
            }else{
                $state.go('challenge',{ pid : result.accessUrl })
            }
            console.log(result)
        };
        $scope.refreshSearchBar = function(search) {
            if(search.length >=  2 ){
                SearchBar.refresh(search).then(function(result){
                    $scope.searchResult = result;
                }).catch(function(err){
                    Notification.display(err.message);
                })
            }
        };

        $scope.goTo = function(result){
            if(result.username){
                $state.go('profile',{ uid : result.id })
            }else if(result.container){
                $state.go('project',{ pid : result.accessUrl })
            }else{
                $state.go('challenge',{ pid : result.accessUrl })
            }
        };


        $window.socket.on('activities:create',function(data){
            console.log('activities create',data)
            if(data.owner == $scope.me.profile.id){
                $scope.$apply(function(){
                    $scope.newNotif = true;
                })
            }
        });
    }])
