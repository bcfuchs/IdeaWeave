angular.module('cri.files',[])
.service('Files',['$q','$http','Config',function($q,$http,Config){
        return {
            fetch: function (param) {
                var defered = $q.defer();
                $http.get(Config.apiServer + '/upload', {
                    params: param
                }).success(function (data) {
                    defered.resolve(data);
                }).error(function (err) {
                    defered.reject(err);
                });
                return defered.promise;
            },
            getPoster: function (file) {
                if (file.type.indexOf('image') > -1) {
                    file.class = 'fa-file-picture-o';
                    return;
                }
                if (file.type.indexOf('video') > -1) {
                    file.class = "fa-file-movie-o";
                    return;
                }
                if (file.type.indexOf('audio') > -1) {
                    file.class = "fa-file-sound-o";
                    return;
                }

                if (file.type.indexOf('javascript') > -1 || file.type.indexOf('php') > -1 || file.type.indexOf('java') > -1) {
                    file.class = "fa-file-code-o";
                    return;
                }

                switch (file.type) {
                    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                        file.class = 'fa-file-excel-o';
                        break;
                    case 'application/msword':
                        file.class = 'fa-file-word-o';
                        break;
                    case 'application/pdf':
                        file.class = "fa-file-pdf-o";
                        break;
                    case 'application/vnd.ms-powerpoint':
                        file.class = "fa-file-powerpoint-o";
                        break;
                    case 'application/zip':
                        file.class = "fa-file-archive-o";
                        break;
                    case 'application/rar':
                        file.class = 'fa-file-archive-o';
                        break;
                    case 'application/x-gzip':
                        file.class = 'fa-file-archive-o';
                        break;
                    default :
                        file.class = '';
                        break;

                }
            },
            isImage: function (file) {
                if (file.type.indexOf('image') > -1) {
                    return true;
                } else {
                    return false;
                }
            },
            isVideo: function (file) {
                if (file.type.indexOf('video') > -1) {
                    return true;
                } else {
                    return false;
                }
            },
            isPdf: function (file) {
                if (file.type.indexOf('pdf') > -1) {
                    return true;
                } else {
                    return false;
                }
            },
            isOfficeDoc : function(file){
                var ext = file.name.split('.');
                if(ext[ext.length-1] == 'xlsx' || ext[ext.length-1] == 'docx' || ext[ext.length-1] == 'pptx'){
                    return true;
                }else{
                    return false;
                }
            },
            getDataUrl: function (file) {
                var defered = $q.defer();
                var fileReader = new FileReader();
                fileReader.onload = function (e) {
                    defered.resolve(e.target.result);
                };
                fileReader.readAsDataURL(file);
                return defered.promise;
            },
            remove: function (fileId) {
                var defered = $q.defer();
                $http.delete(Config.apiServer + '/upload/' + fileId).success(function (data) {
                    defered.resolve(data);
                }).catch(function (err) {
                    defered.reject(err);
                });
                return defered.promise;
            }
        };
    }]);