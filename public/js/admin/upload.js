/**
 * Created by zhujinyu on 2017/10/3.
 */
require.config({
    paths: {
        "zepto": "../lib/zepto",
    },
    shim:{
        'base':{
            exports:'base',
            deps:['zepto']
        }
    }
});
require(['base'], function (base){
    $("#btn-submit").on('click', function () {
        var formdata = new FormData("fileUpload");
        console.log(formdata);
        $.ajax({
            url: '/admin/file_upload',
            type: 'POST',
            data: formdata,
            // async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (result) {
                if (result.success) {
                    console.log(result)
                } else {
                    console.log("上传失败");
                }
            },
            error: function () {
                console.log("上传失败");
            }
        });
    })
});