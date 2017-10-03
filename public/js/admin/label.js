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
        var label = $("#label").val();
        $.ajax({
            url: '/admin/labelAdd',
            type: 'POST',
            data: {'label': label},
            error: function (result) {
                console.log('请求失败');
            },
            success: function (result) {
                if (result.success) {
                    console.log('请求成功');
                    var sotrlist_tbody = $("#list");
                    var _num = sotrlist_tbody.find("tr").length+1;
                    var tmpl = '<tr><td>' + parseInt(_num)+ '</td><td>' + result.data.name + '</td></tr>';
                    sotrlist_tbody.append(tmpl);
                }
            }
        })
    })
});