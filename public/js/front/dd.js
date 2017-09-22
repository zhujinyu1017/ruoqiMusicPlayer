/**
 * Created by zhujinyu on 2017/9/21.
 */
var view = {
    name: "YZF",
    company: "来人"
};
var ss=Mustache.render("{{name}}-{{company}}", view)
console.log(ss)