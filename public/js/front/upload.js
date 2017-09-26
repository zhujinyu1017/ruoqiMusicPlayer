/**
 * Created by zhujinyu on 2017/9/26.
 */
function uploads(field_name,callback) {
    var file = document.getElementById(field_name)
    var formData = new FormData();
    formData.append(field_name,file.files[0]);
    debugger
    var returnresult;
    $.ajax({
        url: '/admin/file_upload',
        type: 'POST',
        data: formData,
        // async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function(result){
            if(result.success){
                var song_path=result.data.path.split("music")[1];
                returnresult={
                    path:song_path,
                    success:true
                };
                $("#"+field_name+'_file').val(song_path);
            }else{
                console.log(result.data.msg);
                returnresult={
                    success:false,
                    msg:result.data.msg
                };
            }
            callback=function(returnresult){
                console.log(returnresult);
            };
        },
        error: function(){
            returnresult={
                success:false,
                msg:'请求失败'
            };
            callback=function(returnresult){
                console.log(returnresult);
            };
        }
    });
}
