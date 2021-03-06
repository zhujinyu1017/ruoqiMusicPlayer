var express = require('express');
var app=express();
var router = express.Router();
//引入数据库包
var db = require("./db.js");
var fs = require("fs");
var upload = require('./fileuploads');

var session = require('express-session');
var cookieParser = require('cookie-parser');

app.use(cookieParser());
/*判断是否登录*/
function isLogin(req) {
    if(req.cookies.islogin) {
        return req.cookies.user;
    }
}
/* GET home page. */
router.get('/', function(req, res, next) {
    var user=isLogin(req);
    res.render('admin/index', { title: '控制台',user:user});
});
//分类添加
router.get('/songlist', function(req, res, next) {
    var user=isLogin(req);
    var $datas;
    db.query('select * from music',function (err,rows) {
        console.log(rows);
        if(err){
            $datas=[];
        }else{
            $datas=rows;
        }
        res.render('admin/songlist', { title: '列表',datas:$datas,user:user});
    })
});
//文件上传服务
router.get('/upload', function(req, res, next) {
    var user=isLogin(req);
    res.render('admin/upload', { title: '文件上传',user:user });
});
//分类添加
router.get('/sort', function(req, res, next) {
    var user=isLogin(req);
    var $datas;
    db.query('select * from sort',function (err,rows) {
        console.log(rows);
        if(err){
            $datas=[];
        }else{
            $datas=rows;
        }
        res.render('admin/sort', { title: '分类添加',datas:$datas,user:user});
    })
});
/*标签添加*/
router.get('/label', function(req, res, next) {
    var user=isLogin(req);
    db.query('select * from labels',function (err,rows) {
        if(err){
            $datas=[];
        }else{
            $datas=rows;
        }
        res.render('admin/label', { title: '标签添加' ,datas:$datas,user:user});
    })
});
/*分类添加ajax*/
router.post('/sortAdd',function (req,res,next) {
    var user=isLogin(req);
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
    db.query("select * from userinfo where name='"+user+"' and pass='"+pass+"'", function (err, row) {
        console.log(row.length)
        if(err){
            res.send({success:false});
        }else {
            if(row.length == 1){
                res.send({success:true,data:{user:user}});
            }else{
                res.send({success:false});
            }
        }
    })
})
/*注册*/
router.get('/register', function(req, res, next) {
    res.render('admin/register', { title: '注册'});
});
router.post('/ajaxregister',function (req,res,next) {
    var user=req.body.user;
    var pass=req.body.pass;
    db.query("select * from userinfo where name='"+user+"'", function (err, row) {
        if(err){
            res.send({success:false,data:{msg:"请求错误1"}});
        }else {
            if(row.length > 0){
                res.send({success:false,data:{msg:"该用户名已被注册"}});
            }else{
                db.query("INSERT INTO userinfo (name,pass) VALUES('"+user+"','"+pass+"')", function (err, row) {
                    if(err){
                        res.send({success:false,data:{msg:"请求错误2"}});
                    }else {
                        res.send({success:true,data:{msg:"注册成功"}});
                    }
                })
            }
        }
    })
})
module.exports = router;


