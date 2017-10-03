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