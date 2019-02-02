$(document).ready(function () {
    $("#dd").hover(function () {
        $("#load").slideToggle("fast");
    });

    $("#load").mouseleave(function () {
        $("#load").css('display', 'none');
    });

    var cookie = $.cookie('token');
});

(function ($) {
    //扩展方法获取url参数
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
})(jQuery);

