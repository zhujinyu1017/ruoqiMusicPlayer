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
                    msg:'添加成功'
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
                    msg:'添加成功'
                }
            }
        }
        res.send(returnData);
    });
})
/*歌曲信息添加ajax*/
router.post('/songAdd',function (req,res,next) {
    var songname=req.body.songname;
    var sort=req.body.sort;
    var rank=req.body.rank;
    var singer=req.body.singer;
    var updatetime=req.body.updatetime;
    console.log("INSERT INTO music (name,sort,rank,singer,updatetime) VALUES('"+songname+"','"+sort+"','"+rank+"','"+singer+"','"+updatetime+"')");
    db.query("INSERT INTO music (name,sort,rank,singer,updatetime) VALUES('aa','bb','5','dd','2017-09-07')", function (err, rows) {
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
                    msg:'添加成功'
                }
            }
        }
        res.send(returnData);
    });
})
router.post('/file_upload',upload.single('music_img'),function (req, res) {
    if (req.file) {
        res.send('文件上传成功')
        console.log(req.file);
        console.log(req.body);
    }
})
module.exports = router;