/**
 * Created by zhujinyu on 2017/10/5.
 */
var cookie = new Object();
//读取cookies
cookie.getCookie = function (name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return (arr[2]);
    }
    else {
        return null;
    }
}
cookie.setCookie = function (name, value, expiredays) {
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie=name+ "=" + escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString()+ "; path=/");
}
cookie.delCookie = function (name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var currentVal=getCookie(name);
    if(currentVal!=null){
        document.cookie= name + "="+currentVal+";expires="+exp.toGMTString()+ "; path=/";
    }
}
