var express = require('express');
var router = express.Router();
//引入数据库包
var db = require("./db.js");
var fs = require("fs");
var upload = require('./fileuploads');

//文件上传服务
router.get('/upload', function(req, res, next) {
    res.render('admin/upload', { title: '文件上传' });
});
router.post('/file_upload',upload.single('music_img'),function (req, res) {
    if (req.file) {
        res.send('文件上传成功')
        console.log(req.file);
        console.log(req.body);
    }
})
module.exports = router;