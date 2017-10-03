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
        var sort = $("#sort").val();
        $.ajax({
            url: '/admin/sortAdd',
            type: 'POST',
            data: {'sort': sort},
            error: function (result) {
                console.log('请求失败');
            },
            success: function (result) {
                if (result.success) {
                    var sotrlist_tbody = $(".sotrlist");
                    var _length = sotrlist_tbody.find("tr").length;
                    var tmpl = '<tr><td>' + _length + 1 + '</td><td>' + result.data.name + '</td></tr>';
                    sotrlist_tbody.append(tmpl);
                }
            }
        })
    })
});