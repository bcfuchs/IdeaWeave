angular.module('cri.project')
    .controller('ProjectSettingCtrl',['$scope','project','users','Project','$q',function($scope,project,users,Project,$q){
        $scope.user = users;
        $scope.project = project[0];
        $q.all([
            Project.fetchUrls($scope.project._id),
            Project.fetchFiles($scope.project._id)
        ]).then(function(data){
            $scope.files = data[1];
            $scope.urls = data[0];
        }).catch(function(err){
            console.log(err);
        });
    }])
    .controller('ProjectEditCtrl',['$scope','$stateParams','Project','$state','Notification','Config','$materialDialog','$materialSidenav','Gmap',function ($scope,$stateParams,Project,$state,Notification,Config,$materialDialog,$materialSidenav,Gmap) {

        var leftNav;
        $scope.toggle = function(){
            leftNav.toggle();
        };

        $scope.$on('showAdmin',function(){
            leftNav = $materialSidenav('left');
            leftNav.toggle();
        });

        $scope.options = {
            height: 200,
            focus: true
        };

        $scope.refreshAddresses = function(address) {
            Gmap.getAdress(address).then(function(adresses){
                $scope.addresses = adresses;
            })
        };

        $scope.popUpPoster = function($event){
            $materialDialog({
                templateUrl : 'modules/challengeSettings/templates/modal/challenge-crop-poster-modal.tpl.html',
                escapeToClose : false,
                clickOutsideToClose : false,
                locals : {
                    project : $scope.project
                },
                controller : ['$scope','$hideDialog','project',function($scope,$hideDialog,project){
                    $scope.imageCropResult = null;
                    $scope.$watch('imageCropResult',function(dataUri,e){
                        if(dataUri){
                            var newProject= {
                                poster : dataUri
                            };
                            Project.update(project._id,newProject).then(function(data){
                                Notification.display('Updated successfully');
                            }).catch(function(err){
                                Notification.display(err.message);
                            }).finally(function(){
                                $hideDialog();
                            });
                        }
                    });

                    $scope.cancel = function(){
                        $hideDialog();
                    }
                }]

            })
        };

        $scope.popUpBanner = function(){
            $materialDialog({
                templateUrl : 'modules/challengeSettings/templates/modal/challenge-crop-banner-modal.tpl.html',
                escapeToClose : false,
                clickOutsideToClose : false,
                locals : {
                    project : $scope.project
                },
                controller : ['$scope','$hideDialog','project',function($scope,$hideDialog,project){
                    $scope.imageCropResult = null;
                    $scope.$watch('imageCropResult',function(dataUri,e){
                        if(dataUri){
                            var newProject = {
                                banner : dataUri
                            };
                            Project.update(project._id,newProject).then(function(data){
                                Notification.display('Updated successfully');
                            }).catch(function(err){
                                Notification.display(err.message);
                            }).finally(function(){
                                $hideDialog();
                            });
                        }
                    });

                    $scope.cancel = function(){
                        $hideDialog();
                    }
                }]

            })
        };
        $scope.popUpEdit = function(){
            $materialDialog({
                templateUrl : 'modules/challengeSettings/templates/modal/challenge-edit-modal.tpl.html',
                locals : {
                    project : $scope.project
                },
                controller : ['$scope','$hideDialog','project','Config',function($scope,$hideDialog,project,Config){
                    $scope.tinymceOption = Config.tinymceOptions;
                    $scope.newProject = {};
                    $scope.newProject.home = project.home;
                    $scope.update = function(newProject){
                        $scope.isLoading = true;
                        Project.update(project._id,newProject).then(function(data){
                            Notification.display('Updated successfully');
                        }).catch(function(err){
                            Notification.display(err.message);
                        }).finally(function(){
                            $scope.isLoading = false;
                            $hideDialog();
                        });
                    };
                    $scope.cancel = function(){
                        $hideDialog();
                    }
                }]

            })
        };

        $scope.popUpRemove = function(){
            $materialDialog({
                templateUrl : 'modules/challengeSettings/templates/modal/challenge-remove-modal.tpl.html',
                locals : {
                    project : $scope.project
                },
                controller : ['$scope','$hideDialog','project',function($scope,$hideDialog,project){

                    $scope.delete = function(test){
                        if(test.title == project.title){
                            Project.remove(project._id).then(function(){
                                Notification.display(challenge.title+' succesly removed')
                            }).catch(function(err){
                                Notification.display('error, the challenge is not removed')
                            }).finally(function(){
                                $hideDialog();
                            });
                        }
                    };
                    $scope.cancel = function(){
                        $hideDialog();
                    }
                }]

            })
        };


//        $scope.project=project;

        //Update project
        $scope.updateProject=function($event,project) {
            $event.preventDefault();
            Project.update($scope.project._id,project).then(function (result) {
                Notification.display('Update Success!');
            }).catch(function (err) {
                Notification.display(err.message);
            })
        };
    }])
    .controller('ProjectMediaCtrl',['$scope', 'Notification','Files','Url','Config',function ($scope, Notification,Files,Url,Config) {
        $scope.removeFile = function(file){
            Files.remove(file.id).then(function(){
                Notification.display('file remove succesfully');
                $scope.files.splice($scope.files.indexOf(file),1);
            }).catch(function(err){
                Notification.display(err.message);
            })
        };

        angular.forEach($scope.files,function(file,index){
            $scope.files[index].url = Config.apiServer+'/fileUpload/topic/'+file.projectUrl+'/'+file.filename
        });


        $scope.updateUrl = function(url){
            Url.update(url).then(function(data){
                Notification.display('url updated succesfully');
            }).catch(function(err){
                Notification.display('update fail');
            })
        };
    }])


    .controller('ProjectTeamCtrl',['$scope','Project','Notification','$materialDialog',function ($scope,Project,Notification,$materialDialog) {

        $scope.inviteModal = function(e){
            $materialDialog({
                templateUrl : 'modules/project/admin/templates/modal/inviteModal.tpl.html',
                event : e,
                controller : ['$scope','$hideDialog',function($scope,$hideDialog){
                    $scope.invite={};
                    $scope.sendInvite=function(){
                        $scope.invite.pid=$scope.project._id;
                        Project.sendInvite($scope.invite).then(function(result){
                            Notification.display('invitation send successfully');
                            $scope.invite.email="";
                        }).catch(function(err){
                            Notification.display('Failed,Please try again later.');
                        })
                    };
                    $scope.cancel = function(){
                        $hideDialog();
                    }
                }]
            })
        };

        $scope.ban=function(user){
            Project.banMember($scope.project._id,{member : user._id}).then(function(result){
                Notification.display('Successfully removed');
                $scope.project.members.splice($scope.projects.members.indexOf(user._id),1);
            }).catch(function(err){
                Notification.display('Remove failed, please try again later');
            });
        };

        Project.getApply({container:$scope.project._id}).then(function(applyteams){
            $scope.applyteams=applyteams;
        }).catch(function(err){
            console.log(err);
        });

        $scope.finish=function($index,accepted){
            Project.finishApply({status:true,accepted : accepted},  $scope.applyteams[$index]._id).then(function(data){
                $scope.applyteams[$index].status=true;
            }).catch(function(err){
                Notification.display(err.message);
            })
        };

        $scope.fail = function($index){
            $scope.finish($index,false);
        };

        $scope.addToTeam=function(userId,$index){
            Project.addToTeam($scope.project._id,{userId : userId}).then(function(member){
                $scope.project.members.push(member);
                $scope.finish($index,true);
                Notification.display('Successfully added');
            }).catch(function(err){
                Notification.display(err.message);
            })
        }
    }])



