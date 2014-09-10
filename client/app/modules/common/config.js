angular.module('cri.common',[])
.constant('Config',{
        apiServer : "http://" + window.location.hostname + ":5011",
        socketUrl : "ideastorm.io",
        tinymceOptions : {
            height : '500px',
            resize :false,
            plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime template media table contextmenu paste textcolor "
            ],
            toolbar: "template styleselect fontselect fontsizeselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist | link image | forecolor backcolor fullscreen",
            image_advtab: true
        },
        paginateChallenge : 10,
        paginateProject : 10,
        activityLimit : 40
    });