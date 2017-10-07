/**
 * Created by zhujinyu on 2017/10/3.
 */
$(".inner .inner-item").on('mousedown', function () {
    var _this = $(this);
    var _inner = _this.parents(".inner");
    console.log(_this.height());
    if (_inner.height() == 40) {
        _inner.css("height", "auto");
        _inner.find(".item-type").removeClass("slidebar-rotate-r").addClass("slidebar-rotate");
    } else {
        _inner.css("height", "40px");
        _inner.find(".item-type").removeClass("slidebar-rotate").addClass("slidebar-rotate-r");
    }
})
$(".slidebar-fold").on('click', function () {
    var _this = $(this);
    var _target = _this.parents(".sidebar");
    var _w = _target.width();
    if (_w > 50) {
        _this.parents(".sidebar").width("50px");
    } else {
        _this.parents(".sidebar").width("180px");
    }
})
/*退出*/
$(".signout").on('click',function () {
    console.log(222);
    delCookie('islogin');
    delCookie('user');
    if(!getCookie("islogin")){
        location.href="/admin/login";
    }
})
//读取cookies
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return (arr[2]);
    }
    else {
        return null;
    }
}
function setCookie(name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString() + "; path=/");
}
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

