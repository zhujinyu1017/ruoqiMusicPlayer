/**
 * Created by zhujinyu on 2017/9/21.
 */
function contentSet(typeid,contentID,result) {
    var tpl = $('#'+typeid).html();
    Mustache.parse(tpl);
    var rendered = Mustache.render(tpl, result);
    console.log(rendered);
    $("#"+contentID+" ul").appendTo(rendered);
    console.log('模板');
}
$(".content").on('click','#search',function () {
    var search=document.getElementById('searchContent').value;
    var type=$(".tab-link.active").attr("data-type");
    $.ajax({
        url:'/search',
        data:{search:search,type:type},
        type: 'get',
        success:function (err,result) {
            console.log('请求成功');
            // if(type=='song'){
            //     // contentSet(demo_songlist,tab1,result.data);
            //     location.href='list?id='+result.data.id
            // }else{
            //     contentSet(demo_singerlist,tab2,result.data);
            // }
        },
        error:function () {
            console.log('请求失败');
            // if(type=='song'){
            //     contentSet(demo_songlist,'您搜索的内容不存在');
            // }else{
            //     contentSet(demo_singerlist,'您搜索的内容不存在');
            // }
        }
    })
})