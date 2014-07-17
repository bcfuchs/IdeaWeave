angular.module('cri.common')
.factory('Recommend',['$q','$http','CONFIG',function($q,$http,CONFIG){
        var service = {
            fetchUser : function(userId){
                var defered = $q.defer();
                $http.get(CONFIG.apiServer+'/recommendations/user/'+userId)
                    .success(function(data){
                        console.log('rec user',data)
                        defered.resolve(data);
                    })
                    .error(function(err){
                        defered.reject(err);
                    })
                return defered.promise;
            },
            fetchFriendsUser : function(userId){
                var defered = $q.defer();
                $http.get(CONFIG.apiServer+'/recommendations/friend/'+userId)
                    .success(function(data){
                        defered.resolve(data);
                    })
                    .error(function(err){
                        defered.reject(err);
                    })
                return defered.promise;
            },
            fetchAll : function(userId){
                var defered = $q.defer();
                $q.all([
                    $http.get(CONFIG.apiServer+'/recommendations/project/'+userId),
                    $http.get(CONFIG.apiServer+'/recommendations/challenge/'+userId)
                ]).then(function(data){
                    var response = {
                        projects : data[0],
                        challenges : data[1]
                    };
                    defered.resolve(response);
                }).catch(function(err){
                    defered.reject(err);
                });
                return defered.promise;
            },
            fetchProject : function(userId){
                var defered = $q.defer();
                $http.get(CONFIG.apiServer+'/recommendations/project/'+userId)
                    .success(function(data){
                        defered.resolve(data);
                    })
                    .error(function(err){
                        defered.reject(err);
                    })
                return defered.promise;
            },
            fetchChallenge : function(userId){
                var defered = $q.defer();
                $http.get(CONFIG.apiServer+'/recommendations/challenge/'+userId)
                    .success(function(data){
                        defered.resolve(data);
                    })
                    .error(function(err){
                        defered.reject(err);
                    })
                return defered.promise;
            }
        }
        return service;
    }])