var express = require('express');
var router = express.Router();
//引入数据库包
var db = require("./db.js");
var fs = require("fs");
var upload = require('./fileuploads');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('admin/index', { title: '控制台'});
});
//分类添加
router.get('/songlist', function(req, res, next) {
    var $datas;
    db.query('select * from music',function (err,rows) {
        console.log(rows);
        if(err){
            $datas=[];
        }else{
            $datas=rows;
        }
        res.render('admin/songlist', { title: '列表',datas:$datas});
    })
});
//文件上传服务
router.get('/upload', function(req, res, next) {
    res.render('admin/upload', { title: '文件上传' });
});
//分类添加
router.get('/sort', function(req, res, next) {
    var $datas;
    db.query('select * from sort',function (err,rows) {
        console.log(rows);
        if(err){
            $datas=[];
        }else{
            $datas=rows;
        }
        res.render('admin/sort', { title: '分类添加',datas:$datas});
    })
});
/*标签添加*/
router.get('/label', function(req, res, next) {
    db.query('select * from labels',function (err,rows) {
        console.log(rows);
        if(err){
            $datas=[];
        }else{
            $datas=rows;
        }
        res.render('admin/label', { title: '标签添加' ,datas:$datas});
    })
});
/*分类添加ajax*/
router.post('/sortAdd',function (req,res,next) {
    var sort=req.body.sort;
    db.query("INSERT INTO sort (name) VALUES('"+sort+"')", function (err, rows) {
        if(err){
            var returnData={
                success:false,
                data:[
                    {
                        msg:'添加失败'
                    }
                ]
            }
        }else {
            var returnData={
                success:true,
                data:{
                    name:sort
                }
            }
        }
        res.send(returnData);
    });
})
/*标签添加ajax*/
router.post('/labelAdd',function (req,res,next) {
    var label=req.body.label;
    db.query("INSERT INTO labels (name) VALUES('"+label+"')", function (err, rows) {
        if(err){
            var returnData={
                success:false,
                data:[
                    {
                        msg:'添加失败'
                    }
                ]
            }
        }else {
            var returnData={
                success:true,
                data:{
                    name:label
                }
            }
        }
        res.send(returnData);
    });
})
/*信息上传*/
var cpUpload = upload.fields([{ name: 'music_song', maxCount: 1 }, { name: 'music_lrc', maxCount: 1 }, { name: 'music_img', maxCount: 1 }])
router.post('/file_upload',cpUpload,function (req, res,next) {
    var uploadData=req.files;
    var songname=req.body.songname;
    var sort=req.body.sort;
    var rank=req.body.rank;
    var songster=req.body.songster;
    var returnData={};
    if (req.files) {
        var song_path=req.files.music_song[0].path.split("music")[1];
        var lrc_path=req.files.music_lrc[0].path.split("music")[1];
        var img_path=req.files.music_img[0].path.split("music")[1];
        db.query("INSERT INTO music (name,sort,rank,songster,song_path,lrc_path,img_path) VALUES('"+songname+"','"+sort+"','"+rank+"','"+songster+"','"+song_path+"','"+lrc_path+"','"+img_path+"')", function (err, rows) {
            if(err){
                returnData={
                    success:false,
                    data:[
                        {
                            msg:'添加失败'
                        }
                    ]
                }
            }else {
                returnData={
                    success:true,
                    data:{
                        data:uploadData,
                        msg:'添加成功'
                    }
                }
            }
            res.send(returnData);
        });
    }else{
        returnData = {
            success: false,
            data: {
                msg: '文件上传失败'
            }
        }
        res.send(returnData);
    }
})
/*登录*/
router.get('/login', function(req, res, next) {
    res.render('admin/login', { title: '登录'});
});
router.post('/ajaxlogin',function (req,res,next) {
    var user=req.body.user;
    var pass=req.body.pass;
    console.log('select * form userinfo where name=xiaoxiao  and pass=123456');
    // db.query('select * form userinfo where (name="'+user+'"  and  pass="'+pass+'")', function (err, row) {
    db.query('select  form userinfo where name=xiaoxiao  and pass=123456', function (err, row) {
        if(err){
            res.send({success:false});
        }else {
            res.send({success:true});
        }
    })
})
module.exports = router;


