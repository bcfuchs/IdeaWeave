angular.module('cri.hackpad',[])

.directive('hackpad',function($window,$sce,$document,$http,$templateCache,Config,NoteLab,$rootScope){
        return {
            restrict : 'EA',
            scope : {
                curentUser : '=',
                padId : '='
            },
            templateUrl : 'modules/hackpad/templates/hackpad.tpl.html',

            link : function(scope,element){
//                $http.get(Config.apiServer+'/hackpad/embed/'+NoteLab.data.hackPadId,{
//                    params : {
//                        email : $rootScope.currentUser.email,
//                        name :$rootScope.currentUser.username
//                    }
//                }).success(function(lol){
//                    scope.data = lol;
//                    $templateCache.put('test.html', lol);
//                    scope.display = true;
//
//                    console.log(lol)
//                }).error(function(err){
//                    console.log(err)
//                });

//                $http.get(Config.apiServer+'/hackpad/auth').success(function(data) {
                    var a = document.createElement('a');
//                    console.log(data)
//                    var httpMethod = 'GET',
//                        url = 'https://ideaweave.hackpad.com/ep/api/embed-pad',
//                        parameters = {
//                            oauth_consumer_key: data.consumer.oauth_consumer_key,
//                            oauth_signature_method: 'HMAC-SHA1',
//                            oauth_version: '1.0'
//                        },
//                        consumerSecret = data.consumer.oauth_consumer_secret;
//
//                    var oauthSign = oauthSignature.generate(httpMethod, url, parameters, consumerSecret);

                    scope.url = $sce.trustAsResourceUrl("https://ideaweave.hackpad.com/ep/api/embed-pad?padId="+scope.padId)
//                        +'&email='+$rootScope.currentUser.email+'&name='+$rootScope.currentUser.username+'&oauth_signature='+oauthSign);
                    a.href = scope.url;
                    console.log(a.protocol + '//' + a.host)
                    var origin = a.protocol + '//' + a.host;
                    scope.frameId = "hackpad-" + scope.padId;
                    $window.addEventListener("message", function(event) {
                        if (event.origin == origin) {
                            var args = event.data.split(":");

                            // 3rd party cookies workaround
                            if (args[0] == "hackpad" && args[1] == "getcookie") {
                                // go to hackpad.com to establish a cookie, then come back here
                                var contURL = decodeURIComponent(args[2]);
                                $document.location = contURL + "&contUrl=" + encodeURIComponent($document.location);
                            }

                            console.log('ddff')
                            // height adjustment
                            if (args.length == 3 && args[0] ==  scope.frameId && args[1] == "height") {
                                var height = Number(args[2]) + 60; // 60 is non-ace elements offset
                                var hp = element[0].parentElement;
                                console.log(hp,height)

                                if (hp && height > 550) {
                                    hp.style.height = height + "px";
                                }
                            }
                        }
                    }, false);
//                }).error(function(err){
//
//                })

            }
        }
    })