var express = require('express');
var router = express.Router();
var url = require('url')
var fs = require("fs");
var db = require("./db.js");
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
                  console.log(condition);
                  // var ss='SELECT   *    FROM   music   LEFT JOIN   songlist   ON   id=t2.lv_id  '
                  db.query('select * from music where ('+condition+')', function (err, rows) {
                      var data=JSON.parse(JSON.stringify(rows));
                      if (err) {
                          $datas[i]=[];
                      }else {
                          $datas[i]['songlist']=data;
                      }
                      console.log($datas);
                  })
                  i++;
              }else {
                  clearInterval(t);
              }
          },1)
            // console.log($datas);
            res.render('front/cardlist', {title: '歌单',nav_title:'歌单', datas: $datas});
        }else{
            res.render('front/cardlist', {title: '歌单',nav_title:'歌单', datas: []});
        }
    })
});
/* 本地音乐列表页 */
router.get('/locallist', function (req, res, next) {
    var arg = url.parse(req.url, true).query;
    var islocal=arg.islocal;
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
                res.render('front/locallist', {title: '音乐列表',nav_title:'本地音乐', datas: $datas,data:$data});
            })
        }else{
            res.render('front/locallist', {title: '音乐列表',nav_title:'本地音乐', datas: [],data:[]});
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
module.exports = router;
