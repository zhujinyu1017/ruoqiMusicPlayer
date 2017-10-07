/**
 * Created by Administrator on 2017/10/8.
 */
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