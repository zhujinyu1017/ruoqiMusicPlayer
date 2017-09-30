/**
 * Created by zhujinyu on 2017/9/26.
 */
function uploads(field_name,continuation) {
    // var file = document.getElementById(field_name);
    // console.log(field_name);
    // var formData = new FormData();
    // formData.append(field_name,file.files[0]);
    console.log(formData);
    $.ajax({
        url: '/admin/file_upload',
        type: 'POST',
        data: formData,
        // async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function(result){
            try {
                if (result.success){
                    var song_path=result.data.path.split("music")[1];
                    returnresult={
                        path:song_path,
                        success:true
                    };
                    $("#"+field_name+'_file').val(song_path);
                    continuation(null, returnresult); // pass 'null' for error
                }
                else{
                    throw new Error("上传失败");
                }

            } catch(e) {
                continuation(e, null);
            }
        },
        error: function(){
            throw new Error("上传失败");
        }
    });
}
