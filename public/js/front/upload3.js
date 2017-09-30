/**
 * Created by zhujinyu on 2017/9/26.
 */
function uploads(field_name,continuation) {
    var file = document.getElementById(field_name)
    var formData = new FormData();
    formData.append(field_name,file.files[0]);
    $.ajax({
        url: '/admin/file_upload',
        type: 'POST',
        data: formData,
        // async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function(data){
            try {
                if (true)
                    throw new Error("woops!");
                else
                    continuation(null, data); // pass 'null' for error
            } catch(e) {
                continuation(e, null);
            }
        }
    });
}
