var express = require('express');
var router = express.Router();
var url = require('url');
var fs = require("fs");
var db = require("./db.js");
var session = require('express-session');
var cookieParser = require('cookie-parser');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('front/index', { title: '首页','nav_title':'若栖音乐'});
});
/* GET test page. */
router.get('/test', function(req, res, next) {
    res.render('front/test', { title: '首页','nav_title':'若栖音乐'});
});
/*歌单*/
/* 本地音乐列表页 */
router.get('/cardlist', function (req, res, next) {
    db.query('select * from songlist', function (err, rows) {
        if (!err) {
            var list=[];
            var $datas=JSON.parse(JSON.stringify(rows));
            var i=0;
          var t=setInterval(function () {
              if(i<rows.length){
                  var arr=rows[i].content.toString().split('，');
                  var conditionArr=[];
                  for (var j=0;j<arr.length;j++){
                      conditionArr.push('id='+arr[j]);
                  }
                  var condition=conditionArr.join(' or ');
                  db.query('select * from music where ('+condition+')', function (err, rows) {
                      var song = new Object();
                      song.list = $datas[i];
                      if (err) {
                          song.list.songlist = [];
                      } else {
                          song.list.songlist = JSON.parse(JSON.stringify(rows));
                      }
                      list.push(song);
                  })
                  i++;
              }else {
                  clearInterval(t);
              }
          },1)
            console.log(list);
            res.render('front/cardlist', {title: '歌单',nav_title:'歌单', datas: list});
        }else{
            res.render('front/cardlist', {title: '歌单',nav_title:'歌单', datas: []});
        }
    })
});
/* 本地音乐列表页 */
router.get('/locallist', function (req, res, next) {
    var arg = url.parse(req.url, true).query;
    var islocal=arg.islocal;
    var title=islocal==1?'本地音乐':'乐库';
    db.query('select * from music where islocal=' + islocal, function (err, rows) {
        if (!err) {
            var $datas=rows;
            var conditionArr=[];
            for (var i=0;i<rows.length;i++){
                var condition_item='id='+rows[i].singerid;
                conditionArr.push(condition_item);
            }
            condition=conditionArr.join(' or ');
            db.query('select * from singer where ('+condition+')', function (err, rows) {
                if (err) {
                    var  $data=[]
                }else {
                    var  $data=rows;
                }
                res.render('front/locallist', {title: title,nav_title:title, datas: $datas,data:$data,islocal:islocal});
            })
        }else{
            res.render('front/locallist', {title: title,nav_title:title, datas: [],data:[],islocal:islocal});
        }
    })
});
/* 本地音乐列表页 */
router.get('/list', function (req, res, next) {
    var arg = url.parse(req.url, true).query;
    db.query('select * from music where singerid='+arg.singerid, function (err, rows) {
        if (err) {
            res.render('front/list', {title: '音乐列表',nav_title:'本地音乐', datas: []});
        }else {
           var  $datas=rows;
            var condition='id='+rows[0].sort;
            db.query('select * from sort where ('+condition+')', function (err, rows) {
                if (err) {
                    $datas[0].sortname='';
                }else {
                    $datas[0].sortname=rows[0].name;
                }
                res.render('front/list', {title: '音乐列表',nav_title:'本地音乐', datas: $datas});
            })
        }
    })
});
/* 音乐详情页 */
router.get('/file', function(req, res, next) {
    var arg = url.parse(req.url, true).query;
    if(arg.id){
       var condition="id="+arg.id;
    }
    if(arg.singerid){
        var condition="singerid="+arg.singerid;
    }
    db.query('select * from music where ('+condition+')', function (err, rows) {
        if (err) {
            var  $datas=[]
        }else {
            var  $datas=rows;

        }
        res.render('front/file', {title: $datas[0].name||'音乐',nav_title:$datas[0].name||'音乐', datas: $datas});
    })
});
/*搜索*/
router.post('/search',function (req, res, next) {
    var search=req.body.search;
    var type=req.body.type;
    switch (type){
        case 'song':
            var queryCmd='select * from music where name like  "%'+search+'%"';
            break;
        case 'singer':
            var queryCmd='select * from singer where name like  "%'+search+'%"';
            break;
    }
    db.query(queryCmd, function (err, rows) {
        if(err){
            var returnData={
                success:false,
                data:[]
            }
        }else{
            var returnData={
                success:true,
                data:rows
            }
        }
        res.send(returnData);
    })
})
/*登录*/
router.get('/login', function(req, res, next) {
    res.render('front/login', { title: '登录'});
});
/*注册*/
router.get('/register', function(req, res, next) {
    res.render('front/register', { title: '注册'});
});
module.exports = router;
