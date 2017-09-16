var express = require('express');
var router = express.Router();
//引入数据库包
var db = require("./db.js");
var fs = require("fs");
var upload = require('./fileuploads');

/**
 * 查询列表页
 */
router.get('/', function (req, res, next) {
    db.query('select * from userinfo', function (err, rows) {
        if (err) {
            res.render('users', {title: 'Express', datas: []});  // this renders "views/users.html"
        } else {
            res.render('users', {title: 'Express', datas: rows});
        }
    })
});
/**
 * 新增页面跳转
 */

router.get('/add', function (req, res) {
    res.render('add');
});
router.post('/add', function (req, res) {
    var name = req.body.name;
    var age = req.body.age;
    db.query("insert into userinfo(name,age) values('" + name + "'," + age + ")", function (err, rows) {
        if (err) {
            res.end('新增失败：' + err);
        } else {
            res.redirect('/users');
        }
    })
});

/**
 * 删
 */
router.get('/del/:id', function (req, res) {
    var id = req.params.id;
    db.query("delete from userinfo where id=" + id, function (err, rows) {
        if (err) {
            res.end('删除失败：' + err)
        } else {
            res.redirect('/users')
        }
    });
});
/**
 * 修改
 */
router.get('/toUpdate/:id', function (req, res) {
    var id = req.params.id;
    db.query("select * from userinfo where id=" + id, function (err, rows) {
        if (err) {
            res.end('修改页面跳转失败：' + err);
        } else {
            res.render("update", {datas: rows});       //直接跳转
        }
    });
});
router.post('/update', function (req, res) {
    var id = req.body.id;
    var name = req.body.name;
    var age = req.body.age;
    db.query("update userinfo set name='" + name + "',age='" + age + "' where id=" + id, function (err, rows) {
        if (err) {
            res.end('修改失败：' + err);
        } else {
            res.redirect('/users');
        }
    });
});
/**
 * 查询
 */
router.post('/search', function (req, res) {
    var name = req.body.s_name;
    var age = req.body.s_age;

    var sql = "select * from userinfo";

    if (name) {
        sql += " and name='" + name + "' ";
    }

    if (age) {
        sql += " and age=" + age + " ";
    }
    sql = sql.replace("and","where");
    db.query(sql, function (err, rows) {
        if (err) {
            res.end("查询失败：", err)
        } else {
            res.render("users", {title: 'Express', datas: rows, s_name: name, s_age: age});
        }
    });
});

/*上传*/
//文件上传服务
router.get('/upload', function(req, res, next) {
    res.render('admin/upload', { title: '文件上传' });
});
router.post('/file_upload',upload.single('avatar'),function (req, res) {
    if (req.file) {
        res.send('文件上传成功')
        console.log(req.file);
        console.log(req.body);
    }
})
module.exports = router;